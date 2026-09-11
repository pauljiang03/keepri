# Website validation

September 11, 2026 — Virio layout/motion reproduction.

Passed:

- `npm run typecheck`.
- Targeted Oxlint across every authored app/component/motion file, the modified tabs primitive and static checker; no diagnostics.
- Production Vinext build: one route prerendered, zero skipped.
- `npm run check:static`: 35 local asset/anchor references, required status/consent content, required licenses, expected navigation destinations, no retired artwork, no personal/install/release claims, and no-JavaScript/reduced-motion/session fallback markers.
- Read-only independent content/accessibility review. Fixed industry-link tab selection, vertical-tab orientation, menu Escape focus return and stale back-to-top fragments.

Global starter lint also scans pre-existing unused UI components and generated `docs/` files; it is not a clean project-wide gate. The modified source passes the targeted check above. No new tests duplicate the animation implementation; browser observations and source measurements are documented in MOTION-VERIFICATION.md.

The public GitHub Pages `docs/` output was not regenerated or published. The private preview uses the production static export. Browser verification and its interruption are recorded precisely in MOTION-VERIFICATION.md; final end-to-end visual acceptance is still pending.
