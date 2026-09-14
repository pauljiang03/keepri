# KeepRI website

KeepRI: Keep Reasoning Independently. A static React/Vinext website about independent judgment, learning through competition, and human learning data for AI research.

The current design has three sections: opening and hero, philosophies, and industry. A timed constellation cover peels diagonally away to reveal a split hero, stable headline, and pointer-responsive 3D orbital instrument. Global leaderboards, significant prizes, and human learning data are central to the vision and explicitly marked in development.

## Develop and validate

Requires Node 22.13+ and npm.

```sh
npm ci
npm run dev
npm run typecheck
npm run test:opening
npm run build
npm run check:static
```

Production output is `dist/client`. Content lives in `app/page.tsx`, `components/hero.tsx`, and `components/story-panels.tsx`. The hero artwork is in `components/hero-visual.tsx`; styling is in `app/globals.css`. `lib/opening-motion.ts` controls the opening and scrolling; `components/page-motion.tsx` controls the philosophy heading entrance and motion preferences.

## Preview and publication

The publication destination is [pauljiang03.github.io/keepri](https://pauljiang03.github.io/keepri/). GitHub Pages serves `main` / `docs`. `npm run prepare:pages` checks types, builds for `/keepri`, validates the output, and stages `docs/`. Commit and push the source and staged output to publish, then verify the Pages build and public assets.

The earlier `chatgpt.site` URL was a private review preview. Publish future revisions to GitHub Pages unless the owner requests another destination.

## Content and behavior

KeepRI addresses the need for people to assess evidence, evaluate AI recommendations, and take responsibility for decisions. The planned business licenses separately consented human learning data and commissioned collections for AI training and evaluation. Research revenue would support free access, new challenges, and significant prizes.

Public status is closed beta. Global leaderboards, tournaments, funded cash-prize events, and research programs are in development. Research enrollment is inactive. Free play and future prize eligibility remain independent of research participation. The website has no signup, analytics, installation, or data-upload endpoint.

The intro plays automatically on every load or reload, including URLs with section hashes. Its 3.8-second sequence ends with a diagonal paper peel. Scrolling or swiping accelerates the peel; Skip intro and Escape dismiss it. The fixed cover is hidden permanently after completion, with no scroll region to return to. Section hashes resolve after the intro. The header wordmark and Back to top stay within the main page.

Reduced motion shows a brief, still opening instead of a peel. All viewport heights use the same one-way lifecycle, with the hero in natural document flow. Preference changes do not replay the intro. The underlying page is inert until the cover closes, and keyboard focus moves out of the cover when needed. A no-JavaScript page remains readable; a bootstrap timeout restores access if hydration never starts.

The larger orbital SVG uses perspective projection, seven rotating meridians, three depth-scaled moving points and damped pointer input. It stops offscreen, in hidden tabs, during the intro, under reduced motion and when paused from the footer. Philosophy and industry sections have progressive entrance motion and active-section navigation. Desktop philosophy tabs become swipe cards on smaller screens; industry content remains directly visible.

Use concise, professional copy without em dashes. Do not restore game screenshots, personal biographies/contact details, invented results, or active prize offers.

See [DESIGN.md](DESIGN.md), [MOTION-VERIFICATION.md](MOTION-VERIFICATION.md), and [ASSET-PROVENANCE.md](ASSET-PROVENANCE.md). Virio informed earlier motion research; the current owner direction supersedes the literal reproduction and earlier `.tastemaker/` layout restrictions.
