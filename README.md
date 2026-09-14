# KeepRI website

The current peel lifts a horizontal fold from the bottom edge to the top. Only the constellation spins; intro text stays stationary and fades in as whole words.

KeepRI: Keep Reasoning Independently. A static React/Vinext website about independent judgment, learning through competition, and human learning data for AI research.

The current design has three sections: opening and hero, philosophies, and industry. A two-gesture cover waits on the KeepRI mark: the first swipe spins and spells the name, and a second swipe peels into the main page, revealing a split hero and a diagram of the planned business model. The dot-free wordmark emphasizes RI with an open corner frame. Global leaderboards, significant prizes, and human learning data are central to the vision and explicitly marked in development.

## Develop and validate

Requires Node 22.13+ and npm.

```sh
npm ci
npm run dev
npm run typecheck
npm run test:opening
npm run test:simulation
npm run build
npm run check:static
```

Production output is `dist/client`. Content lives in `app/page.tsx`, `components/hero.tsx`, and `components/story-panels.tsx`. The hero artwork is in `components/hero-visual.tsx`; styling is in `app/globals.css`. `lib/opening-motion.ts` controls the opening and scrolling; `components/page-motion.tsx` controls the philosophy heading entrance and motion preferences.

## Preview and publication

The publication destination is [pauljiang03.github.io/keepri](https://pauljiang03.github.io/keepri/). GitHub Pages serves `main` / `docs`. `npm run prepare:pages` checks types, builds for `/keepri`, validates the output, and stages `docs/`. Commit and push the source and staged output to publish, then verify the Pages build and public assets.

The earlier `chatgpt.site` URL was a private review preview. Publish future revisions to GitHub Pages unless the owner requests another destination.

## Content and behavior

KeepRI addresses the need for people to assess evidence, evaluate AI recommendations, and take responsibility for decisions. The planned business licenses separately consented human learning data and commissioned collections for AI training and evaluation. Research revenue would support free access, new challenges, and significant prizes.

Public status is closed beta. Global leaderboards, tournaments, funded cash-prize events, and research programs are in development. Research enrollment is inactive. Free practice requires no research participation. Cash-prize entry would require explicit agreement to research collection and commercial use before competing. The website has no signup, analytics, installation, or data-upload endpoint.

The intro appears on every load or reload, including URLs with section hashes. It starts paused on the KeepRI mark with a Swipe to spin cue. The first downward wheel gesture, upward swipe, cue click or entry key spins the constellation, then fades in the three words. The wordmark and phrase stay stationary, with fixed font sizes and no stretching, perspective or character transforms. The completed phrase holds with a Peel to enter cue; a second gesture starts the 1.65-second peel. Continued touch movement, trackpad momentum, held keys and inputs during the animation cannot skip the second step. Skip intro and Escape dismiss immediately. The cover stays hidden after completion, with no scroll region to return to. Section hashes resolve after entry.

Reduced motion preserves both input steps: the first displays the completed phrase immediately, and the second enters the page. Preference and visibility changes never initiate the first step. Main content stays inert until entry; no-JavaScript content remains readable.

The main visual is a responsive HTML/CSS flowchart. Free play branches into competition (per-game leaderboards, tournaments, verified prizes, and returning players) and research from prize play (explicit prize-entry agreement, quality-checked learning records, and organizational purchases). An outside return line connects research revenue to free access, new games and prizes. The headline is top-anchored so expanding the funding disclosure cannot move it. A native disclosure explains customer-directed game design, research deliverables, initial funding, sponsorship and operating costs. All diagram content is available without JavaScript. The probability simulation is retired from the page; its standalone math module and tests remain as historical source.

The existing main headline, dot-free RI wordmark, original philosophy and industry wording, and visitor-controlled intro remain intact. Mathematical sources and third-party notices are documented in `ASSET-PROVENANCE.md`. The build collects license/notice files from the installed runtime packages into the published `licenses/runtime-notices.txt`.

Use concise, professional copy without em dashes. Do not restore game screenshots, personal biographies/contact details, invented results, or active prize offers.

See [DESIGN.md](DESIGN.md), [MOTION-VERIFICATION.md](MOTION-VERIFICATION.md), and [ASSET-PROVENANCE.md](ASSET-PROVENANCE.md). Virio informed earlier motion research; the current owner direction supersedes the literal reproduction and earlier `.tastemaker/` layout restrictions.
