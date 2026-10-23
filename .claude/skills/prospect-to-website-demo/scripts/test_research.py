"""Synthetic contract/release tests; no claim of real-business or browser evaluation."""
import copy
import subprocess
import sys
import unittest

import test_assessment as qa
from check_publication import check_release
from validate_research import fingerprint, validate_bundle
from assess_demo import load_json, SKILL


class ResearchTests(unittest.TestCase):
    def setUp(self):
        self.qa = qa.AssessmentTests('test_supported_review_scores_90')
        self.qa.setUp()
        self.addCleanup(self.qa.doCleanups)
        self.folder, self.policy = self.qa.folder, self.qa.policy
        (self.folder / 'source.txt').write_text('Synthetic source evidence, not a real business.', encoding='utf-8')
        source = {'id': 'source', 'url': 'https://example.com/menu', 'accessedAt': '2026-10-21', 'locator': 'page 1',
                  'summary': 'Synthetic source fixture used only for validation.', 'evidencePath': 'source.txt', 'fingerprint': fingerprint(self.folder / 'source.txt')}
        self.bundle = {'schemaVersion': 2,
                       'profile': {'prospectId': self.qa.review['prospectId'], 'name': 'Synthetic cafe', 'branch': None, 'sources': [source],
                                   'facts': [{'id': 'address', 'field': 'address', 'value': 'Synthetic address', 'sourceIds': ['source'],
                                              'checkedAt': '2026-10-21', 'status': 'verified', 'used': True, 'limitation': ''}]},
                       'offerings': {'items': []}, 'assets': {'items': []}, 'pagePlan': self.qa.plan()}
        self.bundle['profile']['facts'].append({'id': 'business-name', 'field': 'name', 'value': 'Synthetic cafe', 'sourceIds': ['source'],
                                                'checkedAt': '2026-10-21', 'status': 'verified', 'used': True, 'limitation': ''})
        self.bundle['pagePlan'].update(primaryGoal='Find products and contact the business', media=[], selectedCandidate='a',
                                      candidates=[{'id': 'a', 'layoutSignature': copy.deepcopy(self.qa.review['layoutSignature']), 'rationale': 'Synthetic chosen plan for this contract test.'},
                                                  {'id': 'b', 'layoutSignature': copy.deepcopy(self.qa.history[0]['signature']), 'rationale': 'Synthetic alternate plan for this contract test.'}])
        self.bundle['pagePlan']['visualIdentity'] = {
            'confidence': 'medium', 'retained': ['Synthetic brand detail retained for contract testing.'], 'adapted': [],
            'avoidedDefaults': ['Synthetic decision recorded for testing, not a real design.'],
            'observations': [{'aspect': aspect, 'sourceId': 'source', 'evidencePath': 'fixture-1280.png',
                              'observation': 'Synthetic source observation for validator testing only.',
                              'translation': 'Synthetic design decision for validator testing only.'}
                             for aspect in ('palette', 'typography', 'composition', 'imagery', 'graphicLanguage')]}
        self.set_items(12)
        check = {'status': 'pass', 'observed': 'Synthetic reviewed evidence for publication tests only.', 'checkedAt': '2026-10-21', 'evidencePaths': ['source.txt']}
        self.release = {'prospectId': self.qa.review['prospectId'], 'target': 'protected-preview',
                        'checks': {key: copy.deepcopy(check) for key in ('factAccuracy', 'assetInventory', 'previewAccess', 'demoDisclosure', 'liveAccess')},
                        'authorization': {'deploy': False, 'shareLink': False, 'outreach': False, 'instructions': ''},
                        'researchSha256': 'a' * 64, 'reviewSha256': 'b' * 64}

    def set_items(self, count, kind='product'):
        self.bundle['offerings']['items'] = [
            {'id': f'item-{n}', 'name': f'Synthetic {kind} {n}', 'kind': kind, 'category': 'A' if n % 2 else 'B', 'description': '',
             'sourceIds': ['source'], 'status': 'verified', 'price': {'amount': 10000, 'currency': 'IDR', 'checkedAt': '2026-10-21', 'sourceIds': ['source']},
             'promo': None, 'variants': [], 'imageId': None} for n in range(count)]

    def add_asset(self, rights='cleared'):
        (self.folder / 'product.png').write_bytes(qa.png(320, 320))
        asset = {'id': 'photo', 'kind': 'image', 'subject': 'Synthetic product zero', 'sourceIds': ['source'], 'productIds': ['item-0'],
                 'sectionIds': ['main'], 'authenticity': 'verified', 'rightsStatus': rights, 'rightsEvidence': ['source.txt'], 'attribution': '',
                 'deliveryMethod': 'file', 'runtimePath': 'product.png', 'embedUrl': None, 'width': 320, 'height': 320}
        self.bundle['assets']['items'] = [asset]
        self.bundle['offerings']['items'][0]['imageId'] = 'photo'
        self.bundle['pagePlan']['media'] = [{'assetId': 'photo', 'productId': 'item-0', 'sectionId': 'main'}]

    def result(self):
        return validate_bundle(self.bundle, self.folder, self.policy)

    def release_result(self):
        return check_release(self.bundle, self.folder, self.release, self.qa.review, self.folder, self.qa.history, self.policy, 'a' * 64, 'b' * 64)

    def test_schema_is_valid_and_contract_cases_pass(self):
        for count, kind in ((12, 'product'), (5, 'service'), (71, 'product')):
            with self.subTest(count=count, kind=kind):
                self.set_items(count, kind)
                if kind == 'service':
                    for key in ('categoryFilter', 'search', 'stickyToolbar', 'loadMore', 'productDialog'):
                        self.bundle['pagePlan']['features'][key] = False
                    self.bundle['pagePlan']['sections'][0]['features'] = [key for key, value in self.bundle['pagePlan']['features'].items() if value]
                else:
                    self.bundle['pagePlan']['features'] = self.qa.plan()['features']
                    self.bundle['pagePlan']['sections'] = self.qa.plan()['sections']
                self.assertEqual(self.result()['status'], 'research_valid')

    def test_schema_vocabulary_matches_policy(self):
        schema = load_json(SKILL / 'schemas/research.schema.json')
        signature = schema['$defs']['signature']['properties']
        self.assertEqual({key: value['enum'] for key, value in signature.items()}, self.policy['layoutValues'])
        self.assertEqual(set(schema['$defs']['features']['properties']), set(self.policy['featureChecks']))

    def test_unfilled_templates_cannot_pass(self):
        bundle = load_json(SKILL / 'assets/research-bundle.template.json')
        self.assertEqual(validate_bundle(bundle, self.folder, self.policy)['status'], 'invalid_research')
        self.release = load_json(SKILL / 'assets/publication.template.json')
        self.assertEqual(self.release_result()['status'], 'invalid_publication_review')

    def test_unverified_product_image_is_rejected(self):
        self.add_asset()
        self.bundle['assets']['items'][0]['authenticity'] = 'illustration'
        self.assertEqual(self.result()['status'], 'invalid_research')

    def test_missing_product_source_rejected(self):
        self.bundle['offerings']['items'][0]['sourceIds'] = []
        self.assertEqual(self.result()['status'], 'invalid_research')

    def test_visual_identity_is_required(self):
        del self.bundle['pagePlan']['visualIdentity']
        self.assertEqual(self.result()['status'], 'invalid_research')

    def test_visual_identity_needs_every_aspect(self):
        self.bundle['pagePlan']['visualIdentity']['observations'][-1]['aspect'] = 'palette'
        self.assertEqual(self.result()['status'], 'invalid_research')

    def test_visual_identity_needs_a_real_source_reference(self):
        self.bundle['pagePlan']['visualIdentity']['observations'][0]['sourceId'] = 'invented-source'
        self.assertEqual(self.result()['status'], 'invalid_research')

    def test_visual_identity_cannot_use_text_as_visual_evidence(self):
        self.bundle['pagePlan']['visualIdentity']['observations'][0]['evidencePath'] = 'source.txt'
        self.assertEqual(self.result()['status'], 'invalid_research')

    def test_empty_facts_cannot_validate_identity_or_release(self):
        self.bundle['profile']['facts'] = []
        self.assertEqual(self.result()['status'], 'invalid_research')
        self.assertEqual(self.release_result()['publicRelease'], 'blocked')

    def test_unsupported_business_name_blocks_research_and_release(self):
        self.bundle['profile']['name'] = 'Unsupported replacement business'
        self.assertEqual(self.result()['status'], 'invalid_research')
        self.assertEqual(self.release_result()['publicRelease'], 'blocked')

    def test_identity_fact_must_be_verified_used_and_sourced(self):
        fact = self.bundle['profile']['facts'][-1]
        original = copy.deepcopy(fact)
        for change in ({'status': 'unverified'}, {'used': False}, {'sourceIds': []}, {'sourceIds': ['missing-source']}):
            with self.subTest(change=change):
                fact.update(change)
                self.assertEqual(self.result()['status'], 'invalid_research')
                fact.clear()
                fact.update(copy.deepcopy(original))

    def test_legacy_fact_statuses_are_rejected(self):
        for status in ('unconfirmed', 'outdated'):
            with self.subTest(status=status):
                self.bundle['profile']['facts'][0]['status'] = status
                self.assertEqual(self.result()['status'], 'invalid_research')

    def test_branch_when_present_needs_matching_verified_fact(self):
        self.bundle['profile']['branch'] = 'Synthetic north branch'
        self.assertEqual(self.result()['status'], 'invalid_research')
        fact = copy.deepcopy(self.bundle['profile']['facts'][-1])
        fact.update(id='business-branch', field='branch', value='Other branch')
        self.bundle['profile']['facts'].append(fact)
        self.assertEqual(self.result()['status'], 'invalid_research')
        fact['value'] = self.bundle['profile']['branch']
        self.assertEqual(self.result()['status'], 'research_valid')

    def test_unknown_source_rejected(self):
        self.bundle['offerings']['items'][0]['sourceIds'] = ['invented']
        self.assertEqual(self.result()['status'], 'invalid_research')

    def test_source_fingerprint_change_rejected(self):
        (self.folder / 'source.txt').write_text('Altered evidence.', encoding='utf-8')
        self.assertEqual(self.result()['status'], 'invalid_research')

    def test_price_date_and_promo_source_required(self):
        item = self.bundle['offerings']['items'][0]
        item['price']['checkedAt'] = None
        self.assertEqual(self.result()['status'], 'invalid_research')
        item['price']['checkedAt'] = '2026-10-21'
        item['promo'] = {'description': 'Synthetic promo', 'checkedAt': 'not-a-date', 'sourceIds': ['source']}
        self.assertEqual(self.result()['status'], 'invalid_research')

    def test_wrong_sku_photo_rejected(self):
        self.add_asset()
        self.bundle['offerings']['items'][1]['imageId'] = 'photo'
        self.assertEqual(self.result()['status'], 'invalid_research')

    def test_wrong_section_photo_rejected(self):
        self.add_asset()
        self.bundle['assets']['items'][0]['sectionIds'] = []
        self.assertEqual(self.result()['status'], 'invalid_research')

    def test_missing_photo_stays_null(self):
        self.assertIsNone(self.bundle['offerings']['items'][0]['imageId'])
        self.assertEqual(self.result()['status'], 'research_valid')

    def test_duplicate_product_rejected(self):
        self.bundle['offerings']['items'].append(copy.deepcopy(self.bundle['offerings']['items'][0]))
        self.assertEqual(self.result()['status'], 'invalid_research')

    def test_nonmeaningful_category_filter_rejected(self):
        for item in self.bundle['offerings']['items']:
            item['category'] = None
        self.assertEqual(self.result()['status'], 'invalid_research')

    def test_asset_path_traversal_rejected(self):
        self.add_asset()
        self.bundle['assets']['items'][0]['runtimePath'] = '../outside.png'
        self.assertEqual(self.result()['status'], 'invalid_research')

    def test_pending_rights_allow_local_but_block_release(self):
        self.add_asset('pending')
        self.assertEqual(self.result()['status'], 'research_valid')
        self.assertEqual(self.release_result()['localQA'], 'passed')
        self.assertEqual(self.release_result()['publicRelease'], 'blocked')

    def test_embedded_only_cannot_be_downloaded(self):
        self.add_asset('embed_only')
        self.assertEqual(self.release_result()['assetRights'], 'pending_or_restricted')
        asset = self.bundle['assets']['items'][0]
        asset.update(deliveryMethod='embed', runtimePath=None, embedUrl='https://example.com/embed')
        self.assertEqual(self.release_result()['assetRights'], 'passed')

    def test_conflicting_used_fact_blocks_release(self):
        self.bundle['profile']['facts'][0]['status'] = 'conflicting'
        self.assertEqual(self.release_result()['researchAccuracy'], 'pending_or_invalid')
        self.bundle['profile']['facts'][0]['used'] = False
        self.assertEqual(self.release_result()['researchAccuracy'], 'passed')

    def test_clearance_does_not_authorize_actions(self):
        result = self.release_result()
        self.assertEqual(result['publicRelease'], 'ready')
        self.assertEqual(result['deploy'], 'not_authorized')
        self.assertEqual(result['outreach'], 'not_authorized')

    def test_deploy_can_pass_before_live_share_check(self):
        self.release['authorization'].update(deploy=True, shareLink=True, instructions='Deploy this demo and share the URL in this chat.')
        self.release['checks']['liveAccess']['status'] = 'pending'
        result = self.release_result()
        self.assertEqual(result['deploy'], 'ready')
        self.assertEqual(result['shareLink'], 'blocked')

    def test_disclosure_access_and_inventory_must_pass(self):
        for key in ('demoDisclosure', 'previewAccess', 'assetInventory'):
            with self.subTest(key=key):
                self.release['checks'][key]['status'] = 'pending'
                self.assertEqual(self.release_result()['publicRelease'], 'blocked')
                self.release['checks'][key]['status'] = 'pass'

    def test_evidence_and_fingerprints_cannot_be_omitted(self):
        self.release['researchSha256'] = 'c' * 64
        self.assertEqual(self.release_result()['publicRelease'], 'blocked')
        self.release['researchSha256'] = 'a' * 64
        self.release['checks']['previewAccess']['evidencePaths'] = ['missing.txt']
        self.assertEqual(self.release_result()['publicRelease'], 'blocked')

    def test_local_or_publication_major_issue_blocks_release(self):
        for scope in ('local', 'publication'):
            self.qa.review['unresolved'] = [{'scope': scope, 'severity': 'major', 'description': 'Synthetic unresolved issue.'}]
            self.assertEqual(self.release_result()['publicRelease'], 'blocked')

    def test_cli_validates_research_and_release(self):
        import json
        paths = {name: self.folder / f'{name}.json' for name in ('bundle', 'review', 'release')}
        paths['bundle'].write_text(json.dumps(self.bundle), encoding='utf-8')
        paths['review'].write_text(json.dumps(self.qa.review), encoding='utf-8')
        self.release.update(researchSha256=fingerprint(paths['bundle']), reviewSha256=fingerprint(paths['review']))
        paths['release'].write_text(json.dumps(self.release), encoding='utf-8')
        for args in ([str(SKILL / 'scripts/validate_research.py'), str(paths['bundle'])],
                     [str(SKILL / 'scripts/check_publication.py'), str(paths['bundle']), '--review', str(paths['review']), '--release', str(paths['release']), '--history', str(SKILL / 'assets/layout-history.seed.json')]):
            result = subprocess.run([sys.executable] + args, capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        paths['bundle'].write_text('{"schemaVersion":2}', encoding='utf-8')
        result = subprocess.run([sys.executable, str(SKILL / 'scripts/validate_research.py'), str(paths['bundle'])], capture_output=True, text=True)
        self.assertEqual(result.returncode, 2)


if __name__ == '__main__':
    unittest.main()
