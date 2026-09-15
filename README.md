# KeepRI website

KeepRI: Keep Reasoning Independently. A static React/Vinext website about independent judgment, learning through competition, and human learning data for AI research.

The intro starts with a scattered field of logic terms. A wheel gesture, upward swipe, cue click or entry key gathers Keep, Reasoning and Independently into the centered phrase over 1.31 seconds. The surrounding words follow staggered curved paths inward. The phrase holds for 0.4 seconds, then the original curled edge peels upward in 720ms. The words translate at their natural size; they never stretch or spin. Reload replays the cover; entering removes it as a backward destination. Skip and Escape enter immediately, and reduced motion makes navigation immediate.

The publication has 13 viewport-sized pages: the main headline and workflow, two funding pages, six philosophies, three Industry pages and the vision. The original philosophy and Industry prose is retained across these pages. Every page fits its viewport without an internal scroller. There is no bottom bar or Next/Previous control. Wheel gestures, vertical or horizontal swipes, arrow keys and Page Up/Down turn pages; the header jumps to the main chapters. Touch swipes need only 22px of movement and wheel gestures 20px. One wheel burst owns one turn, so momentum cannot skip several pages. A reverse gesture during a turn is remembered and plays as soon as the current turn completes.

The main headline is vertically centered beside its compact, bordered workflow on desktop. Narrow layouts stack the headline and diagram within the same viewport. Supporting funding text has its own bordered pages. Arrows occupy separate layout rows. Main pages curl upward from the bottom along a bowed horizontal crease, revealing a shaded paper underside. Swipe up to go forward and down to go back. Backward navigation reverses the curl. The intro retains its bottom-up peel; both transitions take 720ms. Text is never individually scaled, stretched or spun.

## Develop and validate

Requires Node 22.13+ and npm.

```sh
npm ci
npm run dev
npm run typecheck
npm run test:opening
npm run prepare:pages
npm run test:book
```

`components/book-pages.tsx` holds the static page content and diagram. `components/hero.tsx` holds the cover, masthead and motion preference. Styling is in `app/globals.css`; `lib/page-turn.ts` supplies the intro peel and book crease geometry, while `lib/opening-motion.ts` and `lib/book-motion.ts` own navigation lifecycles.

The production browser test launches an isolated Chrome profile and temporary static server against generated `docs`. No browser automation dependency is installed. `CHROME_PATH` overrides the standard macOS Chrome executable; `BOOK_REVIEW_DIR` controls screenshots/reports, and `BOOK_VIEW` optionally selects comma-separated viewport names. The suite checks every page for text outside the viewport and internal scrolling, along with forward/back turns, input bursts, history, reload, touch and reduced motion.

## Publication

The destination is [pauljiang03.github.io/keepri](https://pauljiang03.github.io/keepri/). GitHub Pages serves `main` / `docs`. `npm run prepare:pages` checks types, builds for `/keepri`, validates the output and stages `docs/`. Commit and push source and generated output together, then verify the deployment and live assets.

## Content and behavior

Public status is closed beta. Global leaderboards, tournaments, funded cash-prize events and research programs are in development. Research enrollment is inactive. Free practice requires no research participation. Cash-prize entry would require explicit agreement to research collection and commercial use before competing. Research revenue would support free access, new games, operations and prizes. The website has no signup, analytics, installation or data-upload endpoint.

Inactive pages remain hidden and inert. History and chapter links navigate the same mounted pages. Reduced motion or Pause motion makes changes immediate. Without JavaScript or when printing, the content is exposed as a normal stacked document. Earlier components retained in source describe retired carousel designs and are not rendered by the current page.
