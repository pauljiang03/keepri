# KeepRI website

KeepRI: Keep Reasoning Independently. A static React/Vinext marketing site adapted from the owner's [Virio reference](https://www.virio.ai/), with KeepRI branding, accurate closed-beta language, and existing product screenshots.

## Develop and validate

Node 22.13+ and npm are required.

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm run check:static
```

The production output is `dist/client`. Content lives in `app/page.tsx`, `components/hero.tsx`, and `components/story-panels.tsx`. Layout is in `app/globals.css`; opening, scrolling and canvas behavior are in `lib/opening-motion.ts` and `lib/particle-field.ts`. `components/page-motion.tsx` owns the lower-page scroll timelines.

## Preview and publication

The private Sites preview uses the existing project in `.openai/hosting.json`. The public [GitHub Pages website](https://pauljiang03.github.io/keepri/) and its previously staged `docs/` output are unchanged by this revision. For a separately authorized public Pages release, `npm run prepare:pages` builds with `/keepri`, checks paths, and stages `docs/`; committing and pushing that output to the public repository publishes it.

This revision replaces the old gesture-gated chapters with the reference's continuous 480vh opening, rotating hero, interactive particle field, draggable marquees, desktop sticky cards, mobile stacked cards, research tabs, philosophy tabs/swipe cards, and curved closing reveal. Reduced motion skips the opening and continuous loops. Session storage avoids replaying the opening on subsequent visits in the same tab. A footer control pauses autonomous motion.

The site has no signup, analytics, research enrollment, installation or data-upload endpoint. Closed beta is current; expanded competition, tournaments, funded cash prizes and research remain in development. Research requires separate participant consent and does not affect free play or future prize eligibility. Personal biographies and direct personal contact details remain excluded.

See [DESIGN.md](DESIGN.md), [MOTION-VERIFICATION.md](MOTION-VERIFICATION.md), and [ASSET-PROVENANCE.md](ASSET-PROVENANCE.md). Earlier visual constraints in `.tastemaker/` describe the previous revision; the current explicit reproduction request supersedes those layout/motion restrictions.
