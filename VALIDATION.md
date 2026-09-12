# Website validation

September 11, 2026 — three-section website and original KeepRI opening.

Passed:

- `npm run prepare:pages`: type checking, production Vinext build (one static route), static validation and staging into `docs/` for `/keepri/`.
- Static validation:29 local asset/anchor references, client asset-prefix resolution, required licenses and status/consent language, all navigation destinations, no retired game screenshots or removed slogans, no personal/install/release claims, and no-JavaScript/reduced-motion/session markers.
- Targeted Oxlint across authored app, hero, philosophy/industry, motion, tabs primitive, static checker and config. No diagnostics. `git diff --check` clean.
- Independent read-only content and implementation review; corrected invisible intro keyboard focus and removed forced scroll correction.
- Native Safari: desktop1440×900 constellation/reveal/hero sequence; mobile390×844 constellation/reveal/hero; desktop philosophy panel layout; narrow320px philosophy layout; standalone390px industry section. Zero document overflow at320/390/1440; no game image elements. Mobile philosophy cards report equal content/client heights.
- Live hero motion: headline2804/2802/2805ms intervals and marquee50px/s. See MOTION-VERIFICATION.md for normalized scroll checkpoints and evidence limits.

The QA wrapper lives outside the repository and is not published. Physical touch hardware, screen-reader testing and frame-rate profiling were not performed. Existing unused starter UI and generated files are excluded from targeted lint.

GitHub Pages serves `main` / `docs`. Publication verification checks the Pages build commit and the public HTML/assets after the source and staged output are pushed.
