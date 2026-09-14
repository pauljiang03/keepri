# KeepRI website

KeepRI: Keep Reasoning Independently. A static React/Vinext website about independent judgment, learning through competition, and human learning data for AI research.

The current design has three sections: opening and hero, philosophies, and industry. A constellation cover waits for the visitor to peel it away, revealing a split hero and an interactive reasoning instrument. The dot-free wordmark emphasizes RI with an open corner frame. Global leaderboards, significant prizes, and human learning data are central to the vision and explicitly marked in development.

## Develop and validate

Requires Node 22.13+ and npm.

```sh
npm ci
npm run dev
npm run typecheck
npm run test:opening
npm run test:reasoning
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

The intro appears on every load or reload, including URLs with section hashes. Its constellation animates, then waits. Only a click on Peel to enter, a downward scroll, an upward swipe, or the entry keyboard controls starts the 1.65-second peel. Skip intro and Escape dismiss it. The fixed cover stays hidden after completion, with no scroll region to return to. Section hashes resolve after entry. The header wordmark and Back to top stay within the main page.

Reduced motion shows a still opening that also waits for the visitor. Preference or visibility changes do not start the peel. The page remains inert until entry, and focus leaves the cover when needed. No-JavaScript content remains readable; a bootstrap timeout restores access if hydration never starts.

The orbital graphic is a local rule-discovery exercise. Visitors test three whole numbers against a hidden increasing-order rule, compare three candidate explanations, and select a rule. Contradicting evidence dims and freezes the corresponding orbits. Recent results and corrective feedback support further attempts. No test data leaves the page or persists after reload. This is an illustrative website exercise, not a beta enrollment or research collection.

The orbital frame loop stops offscreen, in hidden tabs, during the intro, under reduced motion and when paused. Desktop philosophy tabs become swipe cards on smaller screens; industry content remains directly visible. Philosophy and industry wording is restored to the September 11 version. The main headline is “Independent thought. In the age of AI.” The duplicated expansion above it has been removed.

Use concise, professional copy without em dashes. Do not restore game screenshots, personal biographies/contact details, invented results, or active prize offers.

See [DESIGN.md](DESIGN.md), [MOTION-VERIFICATION.md](MOTION-VERIFICATION.md), and [ASSET-PROVENANCE.md](ASSET-PROVENANCE.md). Virio informed earlier motion research; the current owner direction supersedes the literal reproduction and earlier `.tastemaker/` layout restrictions.
