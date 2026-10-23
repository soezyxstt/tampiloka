"""Synthetic fixtures test the assessor, never claim a real website passed QA."""
import copy
import json
from pathlib import Path
import struct
import subprocess
import sys
import tempfile
import unittest
import zlib

from assess_demo import SKILL, evaluate, load_json


def png(width, height):
    def chunk(kind, data):
        return struct.pack(">I", len(data)) + kind + data + struct.pack(">I", zlib.crc32(kind + data) & 0xffffffff)
    rows = (b"\0" + b"\xff\xff\xff" * width) * height
    return b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0)) + chunk(b"IDAT", zlib.compress(rows)) + chunk(b"IEND", b"")


class AssessmentTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.folder = Path(self.tmp.name)
        self.policy = load_json(SKILL / "references/assessment-policy.json")
        self.history = load_json(SKILL / "assets/layout-history.seed.json")
        evidence = {}
        for width in (320, 390, 768, 1280):
            file = f"fixture-{width}.png"
            (self.folder / file).write_bytes(png(width, 800))
            evidence[str(width)] = {"kind": "screenshot", "path": file, "summary": "Synthetic screenshot fixture for assessor unit tests only.", "viewport": {"width": width, "height": 800}}
        (self.folder / 'visual-review.md').write_text('Synthetic visual review fixture, not a real design evaluation.', encoding='utf-8')
        evidence['visual-review'] = {'kind': 'review', 'path': 'visual-review.md', 'summary': 'Synthetic reviewer observation for a validator test.'}
        evidence['brand-source'] = {'kind': 'source', 'path': 'fixture-1280.png', 'summary': 'Synthetic brand source fixture, not a real brand sample.'}
        record = {"status": "pass", "observed": "Synthetic observed result for an assessor unit test.", "evidence": ["1280"]}
        self.review = {
            "prospectId": "synthetic-cafe", "reviewId": "unit-test", "reviewedAt": "2026-10-21", "reviewer": "unit-test", "scope": "local",
            "features": {key: True for key in self.policy["featureChecks"]}, "featureNotes": {}, "evidence": evidence,
            "layoutSignature": {"hero": "split-product", "sequence": "story-to-offer", "catalogue": "photo-rows", "media": "mosaic", "narrative": "product-craft"},
            "gates": {key: copy.deepcopy(record) for key in self.policy["gates"]},
            "checks": {key: copy.deepcopy(record) for key in self.policy["coreChecks"] + sum(self.policy["featureChecks"].values(), [])},
            "ratings": {key: {"rating": 4.5, "observation": "Synthetic rating evidence for unit testing the score computation.", "evidence": ["1280"]} for key in self.policy["dimensions"]},
            "unresolved": [], "pagePlanPath": "page-plan.json",
        }
        self.review["checks"]["filter_scrolled"] = copy.deepcopy(record)
        for check, width in self.policy["renderWidths"].items():
            self.review["checks"][check]["evidence"] = [str(width)]
        for check in self.policy['visualEvidenceKinds']:
            self.review['checks'][check]['evidence'] = ['1280', 'brand-source', 'visual-review']

    def plan(self):
        return {"prospectId": self.review["prospectId"], "features": copy.deepcopy(self.review["features"]),
                "sections": [{"id": "main", "features": [key for key, enabled in self.review["features"].items() if enabled]}],
                "layoutSignature": copy.deepcopy(self.review["layoutSignature"])}

    def result(self, history=None, plan=None):
        return evaluate(self.review, self.folder, self.history if history is None else history, self.policy, self.plan() if plan is None else plan)

    def test_supported_review_scores_90(self):
        report = self.result()
        self.assertEqual(report["status"], "ready_for_local_review")
        self.assertEqual(report["score"], 90)
        self.assertEqual(report["passedChecks"], report["requiredChecks"])

    def test_failed_gate_beats_high_score(self):
        self.review["gates"]["authentic_content"]["status"] = "fail"
        self.assertEqual(self.result()["status"], "needs_revision")

    def test_unknown_check_is_not_pass(self):
        self.review["checks"]["sticky_boundary"]["status"] = "unknown"
        self.assertIn("sticky_boundary", self.result()["failedChecks"])

    def test_visual_checks_require_render_source_and_review_evidence(self):
        for check in self.policy['visualEvidenceKinds']:
            original = self.review['checks'][check]['evidence']
            self.review['checks'][check]['evidence'] = ['1280']
            self.assertIn(check, self.result()['failedChecks'])
            self.review['checks'][check]['evidence'] = original

    def test_missing_evidence_is_invalid(self):
        self.review["evidence"]["320"]["path"] = "missing.png"
        with self.assertRaises(ValueError):
            self.result()

    def test_outside_evidence_is_rejected(self):
        self.review["evidence"]["320"]["path"] = "../outside.png"
        with self.assertRaises(ValueError):
            self.result()

    def test_wrong_viewport_does_not_pass(self):
        self.review["checks"]["mobile_320"]["evidence"] = ["390"]
        self.assertIn("mobile_320", self.result()["failedChecks"])

    def test_header_only_png_is_rejected(self):
        file = self.folder / 'fixture-320.png'
        file.write_bytes(file.read_bytes()[:24])
        with self.assertRaises(ValueError):
            self.result()

    def test_truncated_or_corrupted_png_is_rejected(self):
        file = self.folder / 'fixture-320.png'
        original = file.read_bytes()
        corrupted = bytearray(original)
        corrupted[original.index(b'IDAT') + 4] ^= 1
        for data in (original[:-16], bytes(corrupted)):
            with self.subTest(size=len(data)):
                file.write_bytes(data)
                with self.assertRaises(ValueError):
                    self.result()

    def test_image_pixels_must_match_recorded_viewport(self):
        self.review['evidence']['320']['viewport']['width'] = 390
        with self.assertRaises(ValueError):
            self.result()

    def test_viewport_capture_height_must_match(self):
        (self.folder / 'fixture-320.png').write_bytes(png(320, 1600))
        with self.assertRaises(ValueError):
            self.result()

    def test_explicit_fullpage_capture_is_valid(self):
        (self.folder / 'fixture-320.png').write_bytes(png(320, 1600))
        self.review['evidence']['320']['captureMode'] = 'fullPage'
        self.assertEqual(self.result()['status'], 'ready_for_local_review')

    def test_explicit_device_scale_factor_is_valid(self):
        (self.folder / 'fixture-320.png').write_bytes(png(640, 1600))
        self.review['evidence']['320']['deviceScaleFactor'] = 2
        self.assertEqual(self.result()['status'], 'ready_for_local_review')

    def test_invalid_device_scale_factor_is_rejected(self):
        for scale in (0, True, 1e308):
            with self.subTest(scale=scale):
                self.review['evidence']['320']['deviceScaleFactor'] = scale
                with self.assertRaises(ValueError):
                    self.result()

    def test_unsupported_rating_is_invalid(self):
        self.review["ratings"]["visual"]["evidence"] = ["invented-evidence"]
        self.assertEqual(self.result()["status"], "invalid_review")

    def test_low_critical_dimension_fails(self):
        self.review["ratings"]["brand"]["rating"] = 3.5
        self.assertIn("brand", self.result()["weakDimensions"])

    def test_matching_ids_are_diagnostic_not_visual_failure(self):
        self.review["layoutSignature"] = copy.deepcopy(self.history[0]["signature"])
        self.assertEqual(self.result()["novelty"]["status"], "metadata_overlap")
        self.assertEqual(self.result()["status"], "ready_for_local_review")

    def test_exception_cannot_clear_visual_major_finding(self):
        self.review["layoutSignature"] = copy.deepcopy(self.history[0]["signature"])
        self.review["layoutException"] = "Synthetic constraint explains why another layout is not feasible."
        self.review["unresolved"] = [{"scope": "local", "severity": "major", "description": "Rendered compositions remain indistinguishable despite the exception."}]
        self.assertEqual(self.result()["status"], "needs_revision")

    def test_no_history_cannot_claim_maximum_originality(self):
        self.assertEqual(self.result([])["status"], "invalid_review")
        self.review["ratings"]["originality"]["rating"] = 4
        self.assertEqual(self.result([])["status"], "ready_for_local_review")
        self.assertEqual(self.result([])["novelty"]["status"], "unassessed")

    def test_history_compares_all_six_prospects_and_latest_versions(self):
        history = []
        for number in range(6):
            record = copy.deepcopy(self.history[0])
            record.update(prospectId=f"previous-{number}", name=f"Previous {number}")
            history.append(record)
        latest = copy.deepcopy(history[0])
        latest.update(name="Latest previous zero", signature=copy.deepcopy(self.review["layoutSignature"]))
        current = copy.deepcopy(latest)
        current['prospectId'] = self.review['prospectId']
        report = self.result(history + [latest, current])
        self.assertEqual(report['novelty']['historyRecords'], 8)
        self.assertEqual(report['novelty']['comparedProspects'], 6)
        self.assertEqual(report['novelty']['comparisons'][0]['name'], 'Latest previous zero')
        self.assertEqual(report['novelty']['comparisons'][0]['distance'], 0)

    def test_distinct_metadata_does_not_clear_visual_failure(self):
        self.review['checks']['composition_comparison']['status'] = 'fail'
        report = self.result()
        self.assertEqual(report['novelty']['status'], 'metadata_distinct')
        self.assertEqual(report['status'], 'needs_revision')

    def test_clean_copy_requires_observation_render_and_review(self):
        self.review['checks'].pop('clean_copy')
        self.assertIn('clean_copy', self.result()['failedChecks'])
        self.review['checks']['clean_copy'] = {
            'status': 'pass', 'observed': 'Synthetic copy review observation with required information retained.',
            'evidence': ['1280']}
        self.assertIn('clean_copy', self.result()['failedChecks'])
        self.review['checks']['clean_copy']['evidence'].append('visual-review')
        self.assertEqual(self.result()['status'], 'ready_for_local_review')

    def test_both_clis_require_explicit_history(self):
        for script, arguments in (
            ('assess_demo.py', ['review.json']),
            ('check_publication.py', ['bundle.json', '--review', 'review.json', '--release', 'release.json']),
        ):
            with self.subTest(script=script):
                result = subprocess.run([sys.executable, str(SKILL / 'scripts' / script)] + arguments, capture_output=True, text=True)
                self.assertEqual(result.returncode, 2)
                self.assertIn('--history', result.stderr)

    def test_feature_absence_needs_reason(self):
        self.review["features"]["carousel"] = False
        self.assertEqual(self.result()["status"], "invalid_review")
        self.review["featureNotes"]["carousel"] = "Only two services; a carousel would add unnecessary interaction."
        del self.review["checks"]["carousel_navigation"]
        del self.review["checks"]["cta_row_320"]
        self.assertEqual(self.result()["status"], "ready_for_local_review")

    def test_local_major_issue_blocks(self):
        self.review["unresolved"] = [{"scope": "local", "severity": "major", "description": "Main contact points to the wrong business."}]
        self.assertEqual(self.result()["status"], "needs_revision")

    def test_publication_risk_stays_separate(self):
        self.review["unresolved"] = [{"scope": "publication", "severity": "major", "description": "Photo publication permission is still pending."}]
        report = self.result()
        self.assertEqual(report["status"], "ready_for_local_review")
        self.assertEqual(len(report["unresolved"]), 1)

    def test_scope_does_not_become_release_authorization(self):
        self.review["scope"] = "production"
        with self.assertRaises(ValueError):
            self.result()

    def test_non_finite_json_is_rejected(self):
        path = self.folder / "nonfinite.json"
        for token in ("NaN", "Infinity", "-Infinity"):
            path.write_text('{"value":' + token + '}', encoding="utf-8")
            with self.assertRaises(ValueError):
                load_json(path)

    def test_cli_report_and_evidence_protection(self):
        path = self.folder / "review.json"
        path.write_text(json.dumps(self.review), encoding="utf-8")
        (self.folder / "page-plan.json").write_text(json.dumps(self.plan()), encoding="utf-8")
        output = self.folder / "report.json"
        command = [sys.executable, str(SKILL / "scripts/assess_demo.py"), str(path), "--history", str(SKILL / "assets/layout-history.seed.json"), "--output"]
        result = subprocess.run(command + [str(output)], capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stderr)
        report = load_json(output)
        self.assertEqual(report["status"], "ready_for_local_review")
        self.assertEqual(report["novelty"]["historyPath"], str((SKILL / "assets/layout-history.seed.json").resolve()))
        self.assertEqual(report["novelty"]["comparisons"][0]["name"], self.history[0]["name"])
        evidence = self.folder / "fixture-320.png"
        original = evidence.read_bytes()
        result = subprocess.run(command + [str(evidence)], capture_output=True, text=True)
        self.assertEqual(result.returncode, 2)
        self.assertEqual(evidence.read_bytes(), original)

    def test_compact_catalogue_needs_no_search_sticky_or_pagination(self):
        for key in ("categoryFilter", "search", "stickyToolbar", "loadMore", "productDialog"):
            self.review["features"][key] = False
            self.review["featureNotes"][key] = "Eight products remain readable without this interaction."
            for check in self.policy["featureChecks"][key]:
                del self.review["checks"][check]
        del self.review["checks"]["filter_scrolled"]
        self.assertEqual(self.result()["status"], "ready_for_local_review")

    def test_feature_flags_must_match_plan(self):
        plan = self.plan()
        self.review["features"]["search"] = False
        with self.assertRaises(ValueError):
            self.result(plan=plan)

    def test_feature_flags_must_match_section_inventory(self):
        plan = self.plan()
        plan["sections"][0]["features"].remove("search")
        with self.assertRaises(ValueError):
            self.result(plan=plan)

    def test_feature_dependency_is_required(self):
        self.review["features"]["catalogue"] = False
        with self.assertRaises(ValueError):
            self.result()

    def test_unknown_layout_id_is_rejected(self):
        self.review["layoutSignature"]["hero"] = "unique-new-name"
        with self.assertRaises(ValueError):
            self.result()

    def test_unknown_history_layout_id_is_rejected(self):
        self.history[0]["signature"]["hero"] = "fake-history-name"
        with self.assertRaises(ValueError):
            self.result()


if __name__ == "__main__":
    unittest.main()
