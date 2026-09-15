# KeepRI website

KeepRI: Keep Reasoning Independently. A static React/Vinext website about independent judgment, learning through competition, and human learning data for AI research.

The intro starts with a scattered field of logic terms. A wheel gesture, upward swipe, cue click or entry key gathers Keep, Reasoning and Independently into the centered phrase over 1.31 seconds. The surrounding words follow staggered curved paths inward. The phrase holds for 0.4 seconds, then the phrase moves upward and out. The first page’s words rise into place. The words translate at their natural size; they never stretch or spin. Reload replays the cover; entering removes it as a backward destination. Skip and Escape enter immediately, and reduced motion makes navigation immediate.

The publication has exactly three pages: Main, Philosophy and Industry. Main includes its headline and workflow, research/funding details and vision. Philosophy contains all six principles with their full explanations. Industry includes its research overview, deliverables, learning sequence, participation terms and the final footer. Long chapters use native vertical scrolling when the content exceeds the screen; wheel momentum from reading cannot turn the page at the boundary. A fresh gesture at a chapter edge, left/right arrow keys, the header or the bottom cue changes chapters. Each accepted navigation runs one fixed 520ms transition, with no acceleration or queued replay. Legacy funding/vision links resolve to Main, principle links to Philosophy and research subpage links to Industry.

The main headline is vertically centered beside its compact, bordered workflow on desktop. Funding and vision details sit in bordered cards below. Narrow layouts stack this content for native reading. Arrows occupy separate layout rows. Every page shares the intro’s forest-green background, cream text and gold accents. Swipe up to go forward and down to go back. Words leave in a short stagger, then the new page’s words enter from the opposite side; backward navigation reverses the movement. Each page change takes 520ms. Diagrams and borders fade with the content. There are no page flips, curls or clipping effects. Text is never individually scaled, stretched or spun. Temporary word wrappers are removed after each transition, restoring the original text nodes and their spacing.

## Develop and validate

Requires Node 22.13+ and npm.

```sh
npm ci
npm run dev
npm run typecheck
npm run test:opening
node --test scripts/test-wheel-gesture.mjs
npm run prepare:pages
npm run test:book
```

`components/book-pages.tsx` holds the static page content and diagram. `components/hero.tsx` holds the cover, masthead and motion preference. Styling is in `app/globals.css`; `lib/transition-words.ts` preserves text and spacing while preparing individual word spans, while `lib/opening-motion.ts` and `lib/book-motion.ts` own navigation lifecycles.

The production browser test launches an isolated Chrome profile and temporary static server against generated `docs`. No browser automation dependency is installed. `CHROME_PATH` overrides the standard macOS Chrome executable; `BOOK_REVIEW_DIR` controls screenshots/reports, and `BOOK_VIEW` optionally selects comma-separated viewport names. The suite checks exactly three chapters, reachable content without horizontal clipping, forward/back turns, native reading, momentum at chapter edges, footer reachability, legacy links, input bursts, history, reload, touch and reduced motion.

## Publication

The destination is [pauljiang03.github.io/keepri](https://pauljiang03.github.io/keepri/). GitHub Pages serves `main` / `docs`. `npm run prepare:pages` checks types, builds for `/keepri`, validates the output and stages `docs/`. Commit and push source and generated output together, then verify the deployment and live assets.

## Content and behavior

Public status is closed beta. Global leaderboards, tournaments, funded cash-prize events and research programs are in development. Research enrollment is inactive. Free practice requires no research participation. Cash-prize entry would require explicit agreement to research collection and commercial use before competing. Research revenue would support free access, new games, operations and prizes. The website has no signup, analytics, installation or data-upload endpoint.

Inactive pages remain hidden and inert. History and chapter links navigate the same mounted pages. Reduced motion or Pause motion makes changes immediate. Without JavaScript or when printing, the content is exposed as a normal stacked document. Earlier components retained in source describe retired carousel designs and are not rendered by the current page.
