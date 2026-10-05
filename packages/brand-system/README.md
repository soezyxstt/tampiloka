# Shared brand system

The exported stylesheet is the shared source for both Next.js apps' semantic theme tokens, brand colors, base styles, and responsive `type-*` typography utilities. Each app must load the same Inter and Manrope families, weights, and CSS variable names in its root layout before importing `@tampiloka/brand-system/styles.css`.

App-specific layout, logos, metadata, and decorative styles stay with their app.
