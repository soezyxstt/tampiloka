#!/usr/bin/env python3
"""Check release readiness separately from local quality; never deploy or send messages."""
import argparse
from datetime import date
import json
from pathlib import Path
import sys

from assess_demo import SKILL, evaluate, load_json
from validate_research import fingerprint, local_file, schema_errors, validate_bundle


def check_release(bundle, folder, release, review, review_folder, history, policy, bundle_hash, review_hash):
    errors = schema_errors(release, 'publication.schema.json')
    research = validate_bundle(bundle, folder, policy)
    local = evaluate(review, review_folder, history, policy, bundle['pagePlan']) if research['status'] == 'research_valid' else None
    if errors:
        return {'status': 'invalid_publication_review', 'errors': errors, 'publicRelease': 'blocked'}
    if release['researchSha256'] != bundle_hash or release['reviewSha256'] != review_hash:
        errors.append('Release evidence is bound to different research/review bytes')
    if release['prospectId'] != bundle['profile']['prospectId']:
        errors.append('Release prospect differs from research')
    checks = {}
    for key, record in release['checks'].items():
        valid = record['status'] == 'pass' and date.fromisoformat(record['checkedAt']) <= date.today()
        for path in record['evidencePaths']:
            try:
                local_file(folder, path)
            except ValueError as error:
                errors.append(str(error))
                valid = False
        checks[key] = valid
    auth = release['authorization']
    if any(auth[key] for key in ('deploy', 'shareLink', 'outreach')) and not auth['instructions'].strip():
        errors.append('Authorized actions need the actual user instruction')
    accuracy = research['status'] == 'research_valid' and checks['factAccuracy'] and not research['accuracyIssues']
    rights = research['status'] == 'research_valid' and checks['assetInventory'] and not research['rightsIssues']
    quality = local is not None and local['status'] == 'ready_for_local_review'
    publication_findings = [] if local is None else [item for item in local['unresolved'] if item.get('scope') == 'publication' and item.get('severity') in {'major', 'blocker'}]
    ready = not errors and quality and accuracy and rights and checks['previewAccess'] and checks['demoDisclosure'] and not publication_findings
    deploy = 'ready' if ready and auth['deploy'] else 'not_authorized' if not auth['deploy'] else 'blocked'
    share = 'ready' if ready and checks['liveAccess'] and auth['shareLink'] else 'not_authorized' if not auth['shareLink'] else 'blocked'
    outreach = 'ready_for_explicitly_authorized_action' if ready and checks['liveAccess'] and auth['outreach'] else 'not_authorized' if not auth['outreach'] else 'blocked'
    return {'status': 'release_checks_passed' if ready else 'release_blocked', 'prospectId': release['prospectId'],
            'localQA': 'passed' if quality else 'blocked', 'localComparison': local['novelty'] if local is not None else None, 'researchAccuracy': 'passed' if accuracy else 'pending_or_invalid',
            'assetRights': 'passed' if rights else 'pending_or_restricted', 'publicRelease': 'ready' if ready else 'blocked',
            'deploy': deploy, 'shareLink': share, 'outreach': outreach, 'checks': checks,
            'errors': errors + research['errors'], 'publicationIssues': research['publicationIssues'] + publication_findings,
            'researchSha256': bundle_hash, 'reviewSha256': review_hash,
            'limitations': ['Readiness from recorded evidence only; no deployment, legal clearance, business verification or outreach is performed.']}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('bundle', type=Path)
    parser.add_argument('--review', type=Path, required=True)
    parser.add_argument('--release', type=Path, required=True)
    parser.add_argument('--history', type=Path, required=True)
    args = parser.parse_args()
    try:
        report = check_release(load_json(args.bundle), args.bundle.parent, load_json(args.release), load_json(args.review), args.review.parent,
                               load_json(args.history), load_json(SKILL / 'references/assessment-policy.json'), fingerprint(args.bundle), fingerprint(args.review))
        report["historyPath"] = str(args.history.resolve())
    except (OSError, ValueError, TypeError, KeyError, AttributeError) as error:
        report = {'status': 'invalid_publication_review', 'errors': [str(error)], 'publicRelease': 'blocked'}
    print(json.dumps(report, ensure_ascii=False, indent=2, allow_nan=False))
    return 0 if report['status'] == 'release_checks_passed' else 2 if report['status'] == 'invalid_publication_review' else 1


if __name__ == '__main__':
    sys.exit(main())
