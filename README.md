# KeepRI website

KeepRI: Keep Reasoning Independently. A static React/Vinext marketing site adapted from the owner's [Virio reference](https://www.virio.ai/), with KeepRI branding, accurate closed-beta language, and an original constellation opening.

## Develop and validate

Node 22.13+ and npm are required.

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm run check:static
```

The production output is `dist/client`. Content lives in `app/page.tsx`, `components/hero.tsx`, and `components/story-panels.tsx`. Layout is in `app/globals.css`; opening, scrolling and canvas behavior are in `lib/opening-motion.ts` and `lib/particle-field.ts`. `components/page-motion.tsx` owns the philosophy heading transition.

## Preview and publication

The production destination is [pauljiang03.github.io/keepri](https://pauljiang03.github.io/keepri/). GitHub Pages serves the `docs/` directory on `main`. Use `npm run prepare:pages` to type-check, build with `/keepri`, validate assets/content, and stage `docs/`; commit and push the source and staged output to publish. Verify GitHub's Pages build and the public URL after pushing.

The earlier `chatgpt.site` link was a separate private review preview. GitHub Pages is the owner's requested publication destination; do not publish future revisions to the private preview unless requested.

The site has three main sections: the opening/hero, philosophies, and industry. The intro draws a constellation around the KeepRI wordmark, gathers its points, and opens an olive aperture into the hero. Its scroll region is 280svh on desktop and 240svh on mobile. The rotating headline, particle field, draggable hero marquee, desktop philosophy tabs and mobile swipe cards retain the reference-inspired motion rhythm. Reduced motion skips the opening and continuous loops. Session storage avoids replaying the opening on subsequent visits in the same tab. A footer control pauses autonomous motion.

Game-specific screens, player case studies, the rewards/closing sections and repeated promotional sentences were removed at the owner's request. The industry proposition is directly visible.

The site has no signup, analytics, research enrollment, installation or data-upload endpoint. Closed beta is current; expanded competition, tournaments, funded cash prizes and research remain in development. Research requires separate participant consent and does not affect free play or future prize eligibility. Personal biographies and direct personal contact details remain excluded.

See [DESIGN.md](DESIGN.md), [MOTION-VERIFICATION.md](MOTION-VERIFICATION.md), and [ASSET-PROVENANCE.md](ASSET-PROVENANCE.md). Earlier visual constraints in `.tastemaker/` describe the previous revision; the current owner direction supersedes those earlier layout/motion restrictions.
