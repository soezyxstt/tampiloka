#!/usr/bin/env python3
"""Assess a local demo review from evidence; never deploy or claim visual automation."""
import argparse
import hashlib
import json
import math
from pathlib import Path
import struct
import sys
import warnings

SKILL = Path(__file__).resolve().parents[1]


def screenshot_size(path, record, key):
    try:
        from PIL import Image
    except ImportError as error:
        raise ValueError('Install screenshot validator dependencies: python -m pip install -r scripts/requirements.txt') from error
    try:
        with warnings.catch_warnings():
            warnings.simplefilter('error', Image.DecompressionBombWarning)
            with Image.open(path, formats=['PNG']) as picture:
                picture.verify()
            with Image.open(path, formats=['PNG']) as picture:
                picture.load()
                width, height = picture.size
    except (OSError, ValueError, SyntaxError, Image.DecompressionBombError, Image.DecompressionBombWarning) as error:
        raise ValueError(f'Invalid or incomplete PNG screenshot: {key}') from error
    viewport = record.get('viewport', {})
    scale = record.get('deviceScaleFactor', 1)
    mode = record.get('captureMode', 'viewport')
    if not isinstance(viewport, dict) or not all(type(viewport.get(axis)) is int and viewport[axis] > 0 for axis in ('width', 'height')):
        raise ValueError(f'Screenshot needs a positive viewport: {key}')
    if type(scale) not in (int, float) or not math.isfinite(scale) or scale <= 0 or mode not in ('viewport', 'fullPage'):
        raise ValueError(f'Invalid screenshot scale/capture mode: {key}')
    try:
        expected_width, expected_height = (round(viewport[axis] * scale) for axis in ('width', 'height'))
    except (OverflowError, ValueError) as error:
        raise ValueError(f'Invalid screenshot dimensions: {key}') from error
    if width < 200 or height < 200 or width != expected_width or (height != expected_height if mode == 'viewport' else height < expected_height):
        raise ValueError(f'Screenshot dimensions do not match viewport/scale/capture mode: {key}')
    return {'width': width, 'height': height}


def unique_object(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"Duplicate JSON key: {key}")
        result[key] = value
    return result


def reject_constant(value):
    raise ValueError(f"Non-finite JSON value: {value}")


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8-sig"), object_pairs_hook=unique_object, parse_constant=reject_constant)


def evidence_files(records, folder):
    if not isinstance(records, dict):
        raise ValueError("evidence must be an object")
    verified = {}
    folder = Path(folder).resolve()
    for key, record in records.items():
        if not isinstance(record, dict) or record.get("kind") not in {"screenshot", "log", "dom", "source", "review"}:
            raise ValueError(f"Invalid evidence kind: {key}")
        relative = record.get("path")
        if not isinstance(relative, str) or not relative.strip() or Path(relative).is_absolute():
            raise ValueError(f"Evidence needs a relative path: {key}")
        path = (folder / relative).resolve()
        if not path.is_relative_to(folder) or not path.is_file() or path.stat().st_size == 0:
            raise ValueError(f"Missing/empty/out-of-folder evidence: {key}")
        if not isinstance(record.get("summary"), str) or len(record["summary"].strip()) < 10:
            raise ValueError(f"Evidence needs an observation summary: {key}")
        digest = hashlib.sha256()
        with path.open("rb") as stream:
            header = stream.read(24)
            digest.update(header)
            for chunk in iter(lambda: stream.read(65536), b""):
                digest.update(chunk)
        result = dict(record, sha256=digest.hexdigest())
        if record["kind"] == "screenshot":
            result['imageSize'] = screenshot_size(path, record, key)
        verified[key] = result
    return verified


def references_valid(record, evidence, text_key):
    if not isinstance(record, dict):
        return False
    refs = record.get("evidence")
    text = record.get(text_key)
    return (isinstance(text, str) and len(text.strip()) >= 10
            and isinstance(refs, list) and bool(refs)
            and all(isinstance(key, str) and key in evidence for key in refs))


def validate_features(plan, policy):
    features = plan.get("features", {})
    if not isinstance(features, dict) or set(features) != set(policy["featureChecks"]) or any(type(value) is not bool for value in features.values()):
        raise ValueError("features must declare every policy feature as a boolean")
    for feature, dependencies in policy["featureDependencies"].items():
        if features[feature] and any(not features[key] for key in dependencies):
            raise ValueError(f"Feature dependency missing: {feature}")
    if features["stickyToolbar"] and not (features["categoryFilter"] or features["search"]):
        raise ValueError("Sticky toolbar requires search or category filter")
    sections = plan.get("sections")
    if not isinstance(sections, list) or not sections:
        raise ValueError("Page plan needs actual sections with feature inventories")
    declared = set()
    for section in sections:
        if not isinstance(section, dict) or not section.get("id") or not isinstance(section.get("features"), list):
            raise ValueError("Each section needs id and features")
        declared.update(section["features"])
    if declared != {key for key, enabled in features.items() if enabled}:
        raise ValueError("Feature flags disagree with section inventories")
    return features


def validate_signature(signature, policy):
    if not isinstance(signature, dict) or set(signature) != set(policy["layoutAxes"]):
        raise ValueError("Layout signature needs exactly five canonical axes")
    if any(signature[key] not in choices for key, choices in policy["layoutValues"].items()):
        raise ValueError("Unknown layout ID; use canonical policy choices")


def evaluate(review, folder, history, policy, plan):
    issues, failed_gates, failed_checks = [], [], []
    if not isinstance(review, dict) or review.get("scope") != "local":
        raise ValueError("Review must be an object with scope=local; this is not a release authorization")
    for key in ("prospectId", "reviewId", "reviewedAt", "reviewer"):
        if not isinstance(review.get(key), str) or not review[key].strip():
            issues.append(f"Missing review identity: {key}")
    evidence = evidence_files(review.get("evidence"), folder)
    features = validate_features(plan, policy)
    if review.get("features") != features or plan.get("prospectId") != review.get("prospectId"):
        raise ValueError("Review features/prospect must match page plan")
    for key, enabled in features.items():
        if not enabled and len(str(review.get("featureNotes", {}).get(key, "")).strip()) < 10:
            issues.append(f"Explain feature absence: {key}")

    required = list(policy["coreChecks"])
    for feature, names in policy["featureChecks"].items():
        if features[feature]:
            required.extend(names)
    if features["stickyToolbar"] and (features["categoryFilter"] or features["search"]):
        required.append("filter_scrolled")
    gates, checks = review.get("gates", {}), review.get("checks", {})
    if not isinstance(gates, dict) or not isinstance(checks, dict):
        raise ValueError("gates/checks must be objects")
    for key in policy["gates"]:
        record = gates.get(key, {})
        if not isinstance(record, dict) or record.get("status") != "pass" or not references_valid(record, evidence, "observed"):
            failed_gates.append(key)
    for key in required:
        record = checks.get(key, {})
        if not isinstance(record, dict) or record.get("status") != "pass" or not references_valid(record, evidence, "observed"):
            failed_checks.append(key)
            continue
        width = policy["renderWidths"].get(key)
        if key == "desktop_render":
            sufficient = any(evidence[ref]["kind"] == "screenshot" and evidence[ref]["viewport"]["width"] >= 1024 for ref in record["evidence"])
        elif width:
            sufficient = any(evidence[ref]["kind"] == "screenshot" and evidence[ref]["viewport"]["width"] == width for ref in record["evidence"])
        else:
            sufficient = True
        if not sufficient:
            failed_checks.append(key)
        expected_kinds = policy.get('visualEvidenceKinds', {}).get(key, [])
        if expected_kinds and not set(expected_kinds).issubset({evidence[ref]['kind'] for ref in record['evidence']}):
            if key not in failed_checks:
                failed_checks.append(key)

    ratings = review.get("ratings", {})
    if not isinstance(ratings, dict):
        raise ValueError("ratings must be an object")
    weighted, weak = {}, []
    for key, rule in policy["dimensions"].items():
        record = ratings.get(key, {})
        rating = record.get("rating") if isinstance(record, dict) else None
        if type(rating) not in (int, float) or not math.isfinite(rating) or not 0 <= rating <= 5 or not references_valid(record, evidence, "observation"):
            issues.append(f"Invalid/unsupported rating: {key}")
            continue
        weighted[key] = round(rule["weight"] * rating / 5, 2)
        if rating < max(policy["minimumRating"], policy["criticalMinimums"].get(key, 0)):
            weak.append(key)
    if sum(rule["weight"] for rule in policy["dimensions"].values()) != 100:
        raise ValueError("Policy weights must sum to 100")
    score = round(sum(weighted.values()), 2) if len(weighted) == len(policy["dimensions"]) else None

    signature = review.get("layoutSignature", {})
    axes = policy["layoutAxes"]
    validate_signature(signature, policy)
    if signature != plan.get("layoutSignature"):
        raise ValueError("Review layout must match page plan")
    if not isinstance(history, list):
        raise ValueError("History must be an array in oldest-to-newest order")
    comparisons, seen = [], set()
    for previous in reversed(history):
        if not isinstance(previous, dict) or not previous.get("prospectId") or previous.get("status") not in {"built", "accepted"}:
            raise ValueError("History records need prospectId and built/accepted status")
        if previous["prospectId"] == review.get("prospectId") or previous["prospectId"] in seen:
            continue
        old = previous.get("signature", {})
        validate_signature(old, policy)
        seen.add(previous["prospectId"])
        different = [axis for axis in axes if signature[axis] != old[axis]]
        comparisons.append({"prospectId": previous["prospectId"], "name": previous.get("name", previous["prospectId"]), "distance": len(different), "differentAxes": different})
    novelty = "unassessed" if not comparisons else "metadata_distinct"
    if comparisons and min(item["distance"] for item in comparisons) < policy["layoutReviewDistance"]:
        novelty = "metadata_overlap"
    if not comparisons and isinstance(ratings.get("originality"), dict) and type(ratings["originality"].get("rating")) in (int, float) and ratings["originality"]["rating"] > 4:
        issues.append("Originality above 4 needs an actual comparison")

    unresolved = review.get("unresolved", [])
    if not isinstance(unresolved, list) or any(not isinstance(item, dict) or not item.get("description") for item in unresolved):
        raise ValueError("unresolved must be an array of described findings")
    blockers = [item for item in unresolved if item.get("scope", "local") == "local" and item.get("severity") in {"blocker", "major"}]
    if issues:
        status = "invalid_review"
    elif failed_gates or failed_checks or weak or blockers or score < policy["threshold"]:
        status = "needs_revision"
    else:
        status = "ready_for_local_review"
    return {
        "status": status, "scope": "local", "prospectId": review.get("prospectId"),
        "score": score, "threshold": policy["threshold"], "weightedDimensions": weighted,
        "issues": issues, "failedGates": failed_gates, "failedChecks": failed_checks,
        "weakDimensions": weak, "requiredChecks": len(required), "passedChecks": len(required) - len(failed_checks),
        "novelty": {"status": novelty, "historyRecords": len(history), "comparedProspects": len(comparisons), "comparisons": comparisons},
        "unresolved": unresolved, "evidence": evidence,
        "limitations": ["Evidence files and recorded observations are validated; visual quality and facts require actual review.", "Layout ID distance is diagnostic only; composition and copy require render review.", "This report does not authorize publication, deployment or outreach and does not verify asset licenses."],
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("review", type=Path)
    parser.add_argument("--history", type=Path, required=True, help="Actual workspace history; pass an empty array or seed explicitly when appropriate")
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    try:
        review = load_json(args.review)
        relative = review.get("pagePlanPath")
        if not isinstance(relative, str) or Path(relative).is_absolute():
            raise ValueError("pagePlanPath must be relative and inside the review folder")
        plan_path = (args.review.parent / relative).resolve()
        if not plan_path.is_relative_to(args.review.parent.resolve()):
            raise ValueError("Page plan must stay inside the review folder")
        report = evaluate(review, args.review.parent, load_json(args.history), load_json(SKILL / "references/assessment-policy.json"), load_json(plan_path))
        report["novelty"]["historyPath"] = str(args.history.resolve())
    except (OSError, ValueError, TypeError, KeyError, AttributeError, struct.error) as error:
        report = {"status": "invalid_review", "scope": "local", "issues": [str(error)]}
    payload = json.dumps(report, ensure_ascii=False, indent=2, allow_nan=False) + "\n"
    if args.output:
        protected = {args.review.resolve(), args.history.resolve(), (SKILL / "references/assessment-policy.json").resolve()}
        if 'plan_path' in locals():
            protected.add(plan_path)
        protected.update((args.review.parent / record["path"]).resolve() for record in report.get("evidence", {}).values())
        if args.output.resolve() in protected:
            parser.error("Output cannot overwrite review, history, policy or evidence")
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(payload, encoding="utf-8")
    print(payload, end="")
    return 0 if report["status"] == "ready_for_local_review" else 2 if report["status"] == "invalid_review" else 1


if __name__ == "__main__":
    sys.exit(main())
