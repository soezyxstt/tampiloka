#!/usr/bin/env python3
"""Validate a normalized research bundle and its local evidence, without fetching sources."""
import argparse
from datetime import date
import hashlib
import json
from pathlib import Path
import sys
import warnings

from assess_demo import SKILL, load_json, validate_features, validate_signature


def schema_errors(data, name):
    try:
        from jsonschema import Draft202012Validator, FormatChecker
    except ImportError as error:
        raise ValueError("Install research validator dependencies: python -m pip install -r scripts/requirements.txt") from error
    schema = load_json(SKILL / "schemas" / name)
    Draft202012Validator.check_schema(schema)
    validator = Draft202012Validator(schema, format_checker=FormatChecker())
    return [f"{'/'.join(map(str, error.absolute_path))}: {error.message}" for error in validator.iter_errors(data)]


def local_file(folder, relative):
    folder = Path(folder).resolve()
    if not isinstance(relative, str) or not relative.strip() or Path(relative).is_absolute():
        raise ValueError("Expected a relative local evidence path")
    path = (folder / relative).resolve()
    if not path.is_relative_to(folder) or not path.is_file() or not path.stat().st_size:
        raise ValueError(f"Missing/empty/out-of-folder file: {relative}")
    return path


def fingerprint(path):
    digest = hashlib.sha256()
    with Path(path).open('rb') as stream:
        for chunk in iter(lambda: stream.read(65536), b''):
            digest.update(chunk)
    return digest.hexdigest()


def validate_bundle(bundle, folder, policy):
    errors = schema_errors(bundle, 'research.schema.json')
    if errors:
        return {'status': 'invalid_research', 'errors': errors, 'publicationIssues': [], 'accuracyIssues': [], 'rightsIssues': [], 'files': {}}
    files, accuracy_issues, rights_issues = {}, [], []

    def index(records, kind):
        result = {}
        for record in records:
            if record['id'] in result:
                errors.append(f'Duplicate {kind} ID: {record["id"]}')
            result[record['id']] = record
        return result

    sources = index(bundle['profile']['sources'], 'source')
    products = index(bundle['offerings']['items'], 'offering')
    assets = index(bundle['assets']['items'], 'asset')
    plan = bundle['pagePlan']
    sections = index(plan['sections'], 'section')
    candidates = index(plan['candidates'], 'candidate')
    if plan['prospectId'] != bundle['profile']['prospectId']:
        errors.append('Profile and plan prospect IDs differ')
    if plan['selectedCandidate'] not in candidates or candidates.get(plan['selectedCandidate'], {}).get('layoutSignature') != plan['layoutSignature']:
        errors.append('Selected candidate missing or signature differs')
    try:
        validate_features(plan, policy)
        validate_signature(plan['layoutSignature'], policy)
    except (ValueError, TypeError) as error:
        errors.append(str(error))
    if plan['features']['catalogue'] != bool(products):
        errors.append('Catalogue flag must agree with normalized offerings inventory')
    if plan['features']['catalogue'] != (plan['layoutSignature']['catalogue'] != 'none'):
        errors.append('Catalogue flag and layout signature disagree')
    if plan['features']['categoryFilter'] and len({item['category'] for item in products.values() if item['category']}) < 2:
        errors.append('Category filter needs at least two meaningful categories')

    def track(relative):
        path = local_file(folder, relative)
        files[relative] = fingerprint(path)
        return files[relative]

    def refs(record, label):
        for source in record['sourceIds']:
            if source not in sources:
                errors.append(f'{label}: unknown source {source}')

    def checked(value, label):
        if value is not None and date.fromisoformat(value) > date.today():
            errors.append(f'{label}: checked date is in the future')

    identity = plan['visualIdentity']
    aspects = {item['aspect'] for item in identity['observations']}
    if aspects != {'palette', 'typography', 'composition', 'imagery', 'graphicLanguage'}:
        errors.append('Visual identity must cover all five visual aspects')
    for observation in identity['observations']:
        if observation['sourceId'] not in sources:
            errors.append(f'Visual identity refers to unknown source: {observation["sourceId"]}')
        try:
            from PIL import Image
            path = local_file(folder, observation['evidencePath'])
            with warnings.catch_warnings():
                warnings.simplefilter('error', Image.DecompressionBombWarning)
                with Image.open(path, formats=['PNG', 'JPEG', 'WEBP']) as picture:
                    picture.verify()
                with Image.open(path, formats=['PNG', 'JPEG', 'WEBP']) as picture:
                    picture.load()
            track(observation['evidencePath'])
        except ImportError as error:
            raise ValueError('Install scripts/requirements.txt for visual source validation') from error
        except (OSError, ValueError, SyntaxError, Image.DecompressionBombWarning, Image.DecompressionBombError) as error:
            errors.append(f'Visual identity needs a readable source image: {error}')

    for source in sources.values():
        checked(source['accessedAt'], source['id'])
        try:
            if track(source['evidencePath']) != source['fingerprint']:
                errors.append(f'Source fingerprint mismatch: {source["id"]}')
        except ValueError as error:
            errors.append(str(error))
    for fact in bundle['profile']['facts']:
        refs(fact, fact['id'])
        checked(fact['checkedAt'], fact['id'])
        if fact['used'] and fact['value'] in (None, '', [], {}):
            errors.append(f'Used fact has no value: {fact["id"]}')
        if fact['used'] and fact['status'] != 'verified':
            accuracy_issues.append(f'Used fact is not verified: {fact["id"]}')
    index(bundle['profile']['facts'], 'fact')
    for field in ('name', 'branch'):
        value = bundle['profile'][field]
        if value is not None and not any(
            fact['field'] == field and fact['value'] == value and fact['status'] == 'verified' and fact['used']
            for fact in bundle['profile']['facts']
        ):
            errors.append(f'Profile {field} must match a used, verified identity fact')
    for item in products.values():
        refs(item, item['id'])
        if item['status'] != 'verified':
            accuracy_issues.append(f'Offering is not verified: {item["id"]}')
        index(item['variants'], f'{item["id"]} variant')
        for price in [item['price']] + [variant['price'] for variant in item['variants']]:
            refs(price, item['id'] + ' price')
            checked(price['checkedAt'], item['id'] + ' price')
        if item['promo']:
            refs(item['promo'], item['id'] + ' promo')
            checked(item['promo']['checkedAt'], item['id'] + ' promo')
        if item['imageId'] is not None:
            asset = assets.get(item['imageId'])
            if not asset or item['id'] not in asset['productIds'] or asset['kind'] != 'image':
                errors.append(f'Product image does not match SKU: {item["id"]}')
    used = {mapping['assetId'] for mapping in plan['media']} | {item['imageId'] for item in products.values() if item['imageId']}
    for asset in assets.values():
        refs(asset, asset['id'])
        if set(asset['productIds']) - products.keys() or set(asset['sectionIds']) - sections.keys():
            errors.append(f'Asset points to an unknown product/section: {asset["id"]}')
        if asset['productIds'] and asset['authenticity'] != 'verified':
            errors.append(f'Product media must be verified against its product: {asset["id"]}')
        try:
            for path in asset['rightsEvidence']:
                track(path)
            if asset['id'] in used:
                if asset['deliveryMethod'] == 'file':
                    track(asset['runtimePath'])
                elif not isinstance(asset['embedUrl'], str) or not asset['embedUrl'].startswith('https://'):
                    errors.append(f'Embedded asset needs HTTPS URL: {asset["id"]}')
        except ValueError as error:
            errors.append(str(error))
        if asset['id'] in used:
            if asset['authenticity'] == 'unknown':
                rights_issues.append(f'Asset authenticity pending: {asset["id"]}')
            usable = asset['rightsStatus'] in {'licensed', 'cleared'} or (asset['rightsStatus'] == 'embed_only' and asset['deliveryMethod'] == 'embed')
            if not usable or not asset['rightsEvidence']:
                rights_issues.append(f'Asset rights pending/restricted or evidence missing: {asset["id"]}')
    for mapping in plan['media']:
        asset = assets.get(mapping['assetId'])
        if not asset or mapping['sectionId'] not in sections:
            errors.append(f'Unknown media asset/section: {mapping["assetId"]}')
            continue
        if mapping['sectionId'] not in asset['sectionIds']:
            errors.append(f'Asset not mapped to intended section: {asset["id"]}')
        if mapping['productId'] is not None and mapping['productId'] not in asset['productIds']:
            errors.append(f'Media product mismatch: {asset["id"]}')
        if asset['productIds'] and mapping['productId'] is None:
            errors.append(f'Product photo placement must identify its product: {asset["id"]}')
    return {'status': 'invalid_research' if errors else 'research_valid', 'prospectId': bundle['profile']['prospectId'],
            'errors': errors, 'publicationIssues': accuracy_issues + rights_issues, 'accuracyIssues': accuracy_issues, 'rightsIssues': rights_issues, 'files': files,
            'limitations': ['Checks normalized data, references, files and recorded statuses; does not independently establish truth, rights or visual quality.']}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('bundle', type=Path)
    args = parser.parse_args()
    try:
        report = validate_bundle(load_json(args.bundle), args.bundle.parent, load_json(SKILL / 'references/assessment-policy.json'))
    except (OSError, ValueError, TypeError, KeyError) as error:
        report = {'status': 'invalid_research', 'errors': [str(error)]}
    print(json.dumps(report, ensure_ascii=False, indent=2, allow_nan=False))
    return 0 if report['status'] == 'research_valid' else 2


if __name__ == '__main__':
    sys.exit(main())
