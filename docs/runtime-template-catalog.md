# Runtime template catalog

The public template list belongs to `soezyxstt/tampiloka-templates`. Tampiloka does not keep a second list of demo names, families, modes, URLs, or preview images.

## Data path

1. The template repository produces a public JSON catalog from its registry.
2. `loadTemplateCatalog()` fetches the catalog at request time. The source can be set with the server runtime variable `TEMPLATE_CATALOG_URL`.
3. `/templates` and `/en/templates` render the validated list on the server. They opt out of static page caching.
4. The browser refreshes through `/api/template-catalog` when the page loads, every 60 seconds while visible, and when the tab regains focus.
5. The home page uses the same consumer for one featured preview per family. It does not embed the catalog in the marketing build.

Once these changes are deployed, publishing a new catalog updates the gallery without changing or rebuilding this repository. Changes to the site's code still require its normal deployment.

## Version 1 contract

```ts
{
  schemaVersion: 1,
  updatedAt: string,
  families: [{
    id: string,
    name: { id: string, en: string },
    description?: { id: string, en: string },
    modes?: [{ id: string, name: { id: string, en: string }, description?: { id: string, en: string } }],
    defaultMode?: string
  }],
  entries: [{
    id: string,
    family: string,
    name: { id: string, en: string },
    description: { id: string, en: string },
    url: string,
    imageUrl: string,
    visibility: "public",
    modeUrls?: Record<string, string>,
    featured?: boolean
  }]
}
```

Family names, optional mode controls, preview images and links all come from the manifest. A new family does not need a code change here. Each mode URL is complete; the consumer does not know which demo uses a path, preset or level query parameter.

The parser rejects unsupported versions, malformed localized text, globally duplicated entry IDs, unknown family/mode references, missing URLs for offered modes, and unsafe URLs. Demo, image and source URLs must use HTTPS with no embedded credentials. The parser projects only public entries and the fields the UI needs. Prospect/private entries and source-only fields never reach API responses, server HTML or browser storage.

`demoUrl()` adds `lang=id` or `lang=en` with the URL API. It preserves the selected mode, theme, other query values and hash.

## Failure behavior

A source request times out after six seconds, rejects redirects and caps accepted response size at 1 MB. Source fetches and API responses use `no-store`; the browser does not depend on a build snapshot. API failure returns HTTP 503 with a short retry hint.

The browser saves the latest validated response in optional local storage for at most 24 hours. It uses that response only when an update fails, shows a stale-list message and offers a retry. If there is no recent valid response, it shows an error with a retry. A failed storage read or write does not break the gallery. An image failure leaves a neutral preview placeholder with its demo link intact.

## Checks

- `npm run verify:catalog`: parser, public-only projection, unsafe URLs, future families, new runtime responses, source failures, cache expiry and recovery.
- `npm run verify:templates-browser -- <origin>`: desktop/mobile gallery, shared select styling, filters, locale links, screenshots, no-JavaScript server content, and an intercepted outage followed by a new family arriving on retry.
- `npm run typecheck`, `npm run lint`, and the normal production build.

The browser check reads the actual catalog count; it does not freeze the number of demos. Browser evidence requires a running build and a reachable catalog.

The scoped GitHub workflow runs type generation, typecheck, lint, catalog tests, the web build and the browser suite on pushes and pull requests. It runs the built application locally and checks the gallery against the public HTTPS feed at `https://catalog.tampiloka.site/catalog.v1.json`. Publish the source catalog before starting this workflow. Manual runs can override `catalog_url` when checking another public catalog.

When both repositories are checked out, set `TEMPLATE_CATALOG_CONTRACT_FILE` to the producer's generated `catalog.v1.json` path to run the cross-repository contract test too. CI can omit this optional test without copying the demo list into the marketing repository.
