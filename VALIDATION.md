# Website validation

September 11, 2026 — Virio layout/motion reproduction.

Passed:

- `npm run typecheck`.
- Targeted Oxlint across every authored app/component/motion file, the modified tabs primitive and static checker; no diagnostics.
- Production Vinext build: one route prerendered, zero skipped.
- `npm run check:static`: 35 local asset/anchor references, required status/consent content, required licenses, expected navigation destinations, no retired artwork, no personal/install/release claims, and no-JavaScript/reduced-motion/session fallback markers.
- Read-only independent content/accessibility review. Fixed industry-link tab selection, vertical-tab orientation, menu Escape focus return and stale back-to-top fragments.

Global starter lint also scans pre-existing unused UI components and generated `docs/` files; it is not a clean project-wide gate. The modified source passes the targeted check above. No new tests duplicate the animation implementation; browser observations and source measurements are documented in MOTION-VERIFICATION.md.

The final release uses `npm run prepare:pages`: type checking, the `/keepri/` static export,35 asset/anchor checks plus client-prefix validation, and staging into `docs/`. Changed-source lint passes. GitHub Pages is configured for `main` and `/docs`.

Release follow-up browser checks cover 320px,390px and1440px layout geometry, final desktop/mobile philosophy layouts, product image loading, and a script-disabled desktop closing/static-caption fallback. Final320px/390px competition card client and content heights match, so its content is not clipped. Desktop panels are equal widths and the full thesis sentence fits. See MOTION-VERIFICATION.md for measurements and the precise limits of background-browser snapshots.
