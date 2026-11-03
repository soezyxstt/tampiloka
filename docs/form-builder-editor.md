# Form editor handoff

The editor route is `/admin/forms/[id]/edit`. It fetches the authenticated form API, edits `FormSchema` and renders the shared `FormRenderer` in preview mode. It sends serialized version-checked PATCH requests, keeps the latest unsaved draft in localStorage under `tampiloka-form-draft:<id>`, offers explicit restore/discard after reload, and blocks saving on a 409 until reload. A restore from an older version can replace newer server edits after the user chooses it; the interface warns but does not provide a visual diff. Local recovery is browser-profile storage, so drafts should not contain secrets.

It supports section/question order (drag within the outline or up/down buttons), duplication with fresh IDs, type-specific fields, options, grids, forward routing, undo/redo, preview sizes, slug save, publish/close/reopen and copying the published link. Images use `/api/admin/uploads` start -> direct presigned POST -> complete, and only add an asset ID to the draft after completion. This depends on storage CORS, authorization, and a functioning public asset read route; none was exercised end-to-end in this lane. Upload retry requires selecting the file again.

Known integration and acceptance gaps:

- The shared renderer and backend are in concurrent development; public preview, uploads, save conflicts, publication and lifecycle must be exercised together against isolated resources before release. In particular, confirm previews of unpublished draft images and public asset access; no such route was available when this integration began.
- Changing or deleting a routed question/option/section, or moving a routed target earlier, can leave an invalid routing configuration; the server rejects the save and the operator must fix routing. A guided repair is still needed.
- The public renderer's file input and `allowOther` behavior must be confirmed by its owning lane. Preview is the same renderer and inherits its current capabilities.
- The insert menu is searchable but is a disclosure list rather than the requested Command/Popover. The editor uses native selects and inputs rather than all shared Base UI controls. Browser, touch, responsive, focus, drag-and-drop, and accessibility verification remain pending.
- Recovery protects this editor's explicit back link and browser unload; other app-level client navigation needs an integration check. Upload cancellation and persistence of in-progress uploads across navigation are not implemented.
- The color/background settings are preserved but not yet editable. Schema validation and publishing completeness checks are owned by the core/backend lanes.

Checks run: editor files passed ESLint; `node --experimental-strip-types --test components/admin/form-editor-helpers.test.mjs` passed two tests for reorder and durable duplicate IDs. App-wide TypeScript was blocked by errors in concurrent form-renderer/storage files (see final handoff); no browser, live API, or storage test was run.
