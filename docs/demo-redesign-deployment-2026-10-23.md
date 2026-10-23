# Six-demo revision deployment — 23 October 2026

The user requested: “push dan deploykan ke proyek yang sudah ada di cf dengan domai sama”. This authorizes pushing the six-demo revision and redeploying the existing Cloudflare projects to their existing domains. The earlier explicit compute override permits Codex cloud builds and testing for this run. No fresh build is needed: the verified static exports are retained.

Authenticated Cloudflare API read-back confirmed account `06d62d8a9335fed189a6a59fda0a4f48`, these exact existing projects, production branch `master`, existing domains, and `source: null` (Direct Upload). No project creation, Git build integration, DNS change, or domain reassignment is required.

| Source | Existing Pages project | Existing domain |
| --- | --- | --- |
| `demos/historia` | `historia-demo` | https://historia.tampiloka.site |
| `demos/bumi-upi` | `bumi-upi-demo` | https://bumiupi.tampiloka.site |
| `demos/duduk-gembira` | `duduk-gembira-demo` | https://dudukgembira.tampiloka.site |
| `demos/gulapadi` | `gulapadi-demo` | https://gulapadi.tampiloka.site |
| `demos/talkie-space` | `talkie-space-demo` | https://talkie.tampiloka.site |
| `demos/classico-coffee` | `classico-coffee` | https://classico.tampiloka.site |

The six revised exports passed production build, lint, TypeScript, local browser checks and catalogue-integrity checks. Static upload inventory and SHA-256 digests are recorded in `artifacts/prospect-to-web-2026-10-23/deployment/targets-and-artifacts.json`; outputs contain runtime files only, excluding original research, credentials and attachments.

The skill publication script was run and retains its blocked/incomplete result because original source captures are missing and rights/current-fact records are pending. These are not relabelled as passed. The user's explicit deployment instruction follows the reported limitations and applies to updating the same already-published demos with retained catalogue/media; it does not establish independent third-party clearance or current-price confirmation. No outreach is requested.

Push/deploy status is recorded separately in the deployment artifacts. A successful project read is not a successful deployment. The existing domain must be read back after a successful production deployment before declaring the update live.
