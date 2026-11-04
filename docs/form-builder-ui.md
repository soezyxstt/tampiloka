# Forms UI redesign

The form workspace uses Tampiloka's existing Inter/Manrope typography, green accent, pale canvas, white question surfaces, and shared Base UI controls. Google Forms screenshots supplied by the user informed question grouping, selected-question treatment, consistent navigation, and response views.

## Behavior

- Builder: question canvas with answer-type previews, selected cards, reorder/duplicate/delete controls, separate respondent preview, responsive inspector, and image pickers with progress and previews. Existing autosave, conflicts, recovery, routing repair, and publication APIs remain in use.
- Respondent: bounded content width, smaller mobile titles, section progress, distinct questions, required/error treatment, configurable accent with contrasting action text, and confirmation state.
- Uploads: keyboard-accessible file picker, actual configured formats and size/count limits, visible filenames, progress, verification, errors, and removal. Storage requests and session binding are unchanged.
- Responses: Ringkasan, Per pertanyaan, Individual, and Tabel. Status/revision filters apply to all four views. Individual responses retain their saved schema and existing archive/restore/delete/download actions. The table retains search, sorting, column selection, and pagination.
- Charts cover choice, dropdown, scale/rating, and each grid row. Counts use answered respondents as denominators; multiple selections can total more than 100%. Missing values are excluded while numeric zero is retained. Different published revisions are not aggregated together. Text and file answers use lists rather than meaningless charts.

## Verification

- App TypeScript, webpack production build, brand verification, and lint passed; lint reports seven image/TanStack compatibility warnings.
- `bun run test:forms`: 36 tests passed, including aggregation cases for revision separation, multiple selections, other answers, grids, and zero/empty answers.
- The component review harness in ignored `artifacts/forms-ui-review/` bundles actual UI components and compiled styles. It seeds fictional initial state, substitutes the router, and keeps fetches in memory. It is a component review, not a deployed application or backend integration test.
- Rendered at 1440 and 390 CSS pixels: builder, respondent form, and responses. Fixture checks found no page overflow, exercised all four response views, arrow-key tab navigation, individual navigation, and required-answer validation. Images/fonts were embedded from local exports for the review.
- Independent review found focus loss when opening the mobile inspector and a table response, plus a light-accent focus contrast issue. The follow-up moves focus after each panel commit and uses a fixed dark-green/white focus indicator. Browser fixture assertions passed for both focus transitions at 390 px and for a white accent; transitions were disabled in that color assertion to inspect the settled focus style.
- Review screenshots remain in the ignored artifact directory. No production forms, answers, or storage objects were changed for this redesign.

## Remaining acceptance

Hosted authentication, autosave conflicts, real upload/removal/download, lifecycle actions, and all 18 question types have not been rerun through the redesigned UI. The previous production wedding-form workflow passed before this redesign. Attachment labels in response details remain numbered because the response API supplies asset IDs rather than original filenames. This change does not add malware scanning or change retention.
