# Temura static preview

Static extraction of the existing Sawala and Eunoia invitation previews. The Temura application, login, dashboard, database, and live invitations remain separate at https://temura.tampiloka.site.

Production demo: https://demo-undangan.tampiloka.site/preview/adat-sunda

The source component, preview data, reviewed artwork and typography are copied from `apps/temura`. Links to the design catalog point back to the full Temura application. RSVP here remains the existing local preview interaction.

Build in Novita with `npm ci`, `npm run build`, and `node_modules/.bin/tsc --noEmit`. Return `out/`, inspect it, then upload with Wrangler: `wrangler pages deploy out --project-name temura-demo --branch master`.

No application credentials or server features are required for this package.
