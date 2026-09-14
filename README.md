# KeepRI website

The current peel lifts a horizontal fold from the bottom edge to the top. Only the constellation spins; intro text stays stationary and fades in as whole words.

KeepRI: Keep Reasoning Independently. A static React/Vinext website about independent judgment, learning through competition, and human learning data for AI research.

The current design has three sections: opening and hero, philosophies, and industry. A three-gesture cover waits on the KeepRI mark: first spin, second reveal, third peel, revealing a split hero and a diagram of the planned business model. The dot-free wordmark emphasizes RI with an open corner frame. Global leaderboards, significant prizes, and human learning data are central to the vision and explicitly marked in development.

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

The intro appears paused on every load or reload. The first gesture spins only the surrounding constellation, then waits with Swipe to reveal. The second gesture fades out the constellation and slowly reveals the stationary words over 3.8 seconds, then waits with Peel to enter. The third gesture peels from the bottom upward. Fresh swipes, wheel bursts, cue clicks and non-repeated entry keys advance one stage; inputs during animation and the 400ms settling interval are ignored. A gesture begun during either interval is consumed until a fresh gesture starts. The cue is a button, so it cannot navigate around the intro; hash changes also cannot skip an active stage. Skip and Escape exit immediately. There is no reverse-scroll region to re-enter the completed intro.

Reduced motion preserves all three gestures, settling each chosen animation immediately. Visibility and preference changes never start a waiting stage. The text uses opacity-only fades, fixed font sizes and no transforms. Main content remains inert until entry; no-JavaScript content remains readable.

The main visual is a responsive HTML/CSS flowchart. Free play branches into competition (per-game leaderboards, tournaments, verified prizes, and returning players) and research from prize play (explicit prize-entry agreement, quality-checked learning records, and organizational purchases). An outside return line connects research revenue to free access, new games and prizes. The diagram and explanation are two horizontal carousel panels, with touch dragging, horizontal trackpad gestures, arrow-key navigation and labeled buttons. Both panels share the height of the taller content, so switching never moves the headline or surrounding page. There is no dropdown or vertical scroll area. The explanation covers customer-directed game design, research deliverables, initial funding, sponsorship and operating costs. All diagram content is available without JavaScript. The probability simulation is retired from the page; its standalone math module and tests remain as historical source.

The existing main headline, dot-free RI wordmark, original philosophy and industry wording, and visitor-controlled intro remain intact. Mathematical sources and third-party notices are documented in `ASSET-PROVENANCE.md`. The build collects license/notice files from the installed runtime packages into the published `licenses/runtime-notices.txt`.

Use concise, professional copy without em dashes. Do not restore game screenshots, personal biographies/contact details, invented results, or active prize offers.

See [DESIGN.md](DESIGN.md), [MOTION-VERIFICATION.md](MOTION-VERIFICATION.md), and [ASSET-PROVENANCE.md](ASSET-PROVENANCE.md). Virio informed earlier motion research; the current owner direction supersedes the literal reproduction and earlier `.tastemaker/` layout restrictions.
