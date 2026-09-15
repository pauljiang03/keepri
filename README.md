# KeepRI website

KeepRI: Keep Reasoning Independently. A static React/Vinext website about independent judgment, learning through competition, and human learning data for AI research.

The site opens on the KeepRI name, reveals its meaning, and peels upward into three book pages: KeepRI, Philosophies, and Industry. Previous/Next buttons, left/right arrow keys and horizontal touch swipes turn the pages in either direction. Long content scrolls vertically within each page. The dot-free wordmark emphasizes RI with an open corner frame. Global leaderboards, significant prizes, and human learning data are central to the vision and explicitly marked in development.

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

Production output is `dist/client`. Content lives in `app/page.tsx`, `components/hero.tsx`, and `components/story-panels.tsx`. The hero artwork is in `components/hero-visual.tsx`; styling is in `app/globals.css`. `lib/opening-motion.ts` controls the cover; `lib/book-motion.ts` controls page turns, history, focus, gesture ownership and motion preferences. `components/page-motion.tsx` installs and cleans up both.

## Preview and publication

The publication destination is [pauljiang03.github.io/keepri](https://pauljiang03.github.io/keepri/). GitHub Pages serves `main` / `docs`. `npm run prepare:pages` checks types, builds for `/keepri`, validates the output, and stages `docs/`. Commit and push the source and staged output to publish, then verify the Pages build and public assets.

The earlier `chatgpt.site` URL was a private review preview. Publish future revisions to GitHub Pages unless the owner requests another destination.

## Content and behavior

KeepRI addresses the need for people to assess evidence, evaluate AI recommendations, and take responsibility for decisions. The planned business licenses separately consented human learning data and commissioned collections for AI training and evaluation. Research revenue would support free access, new challenges, and significant prizes.

Public status is closed beta. Global leaderboards, tournaments, funded cash-prize events, and research programs are in development. Research enrollment is inactive. Free practice requires no research participation. Cash-prize entry would require explicit agreement to research collection and commercial use before competing. The website has no signup, analytics, installation, or data-upload endpoint.

The intro resets on every load or reload. One upward swipe, downward wheel gesture, cue click or entry key starts a continuous 2.35-second sequence: the KeepRI name clears into “Keep reasoning independently,” the phrase holds briefly, and the paper opens upward onto the main page. There are no intermediate input gates or hidden settling delays. Repeated gestures cannot restart or skip the sequence. Text stays at its natural size and position; only the 24 peripheral reasoning and learning terms move. Skip and Escape exit immediately. Reduced motion enters immediately after the same single input. Completion removes the overlay, so reverse scrolling cannot return to it. Header and section labels read Industry. The hero uses independent columns with a 40–80px gutter and stacks below 960px; both carousel views retain a shared height and their own bordered panel. Flowchart arrows occupy normal-flow rows between bordered nodes.

The heading font is preloaded through Vite's asset URL so it matches the stylesheet's hashed font request. Tailwind scans app code, top-level website components, and the three used UI primitives (button, carousel, tabs). Add any newly used UI primitive to these sources in app/globals.css. This avoids shipping styles for the entire unused component catalog.

Reduced motion preserves all three gestures, settling each chosen animation immediately. Visibility and preference changes never start a waiting stage. The text uses opacity-only fades, fixed font sizes and no transforms. Main content remains inert until entry; no-JavaScript content remains readable.

The main visual is a responsive HTML/CSS flowchart. Free play branches into competition (per-game leaderboards, tournaments, verified prizes, and returning players) and research from prize play (explicit prize-entry agreement, quality-checked learning records, and organizational purchases). An outside return line connects research revenue to free access, new games and prizes. The diagram and explanation are two horizontal carousel panels, with touch dragging, horizontal trackpad gestures, arrow-key navigation and labeled buttons. Both panels share the height of the taller content, so switching never moves the headline or surrounding page. There is no dropdown or vertical scroll area. The explanation covers customer-directed game design, research deliverables, initial funding, sponsorship and operating costs. All diagram content is available without JavaScript. The probability simulation is retired from the page; its standalone math module and tests remain as historical source.

The existing main headline, dot-free RI wordmark, original philosophy and industry wording, and visitor-controlled intro remain intact. Mathematical sources and third-party notices are documented in `ASSET-PROVENANCE.md`. The build collects license/notice files from the installed runtime packages into the published `licenses/runtime-notices.txt`.

Use concise, professional copy without em dashes. Do not restore game screenshots, personal biographies/contact details, invented results, or active prize offers.

See [DESIGN.md](DESIGN.md), [MOTION-VERIFICATION.md](MOTION-VERIFICATION.md), and [ASSET-PROVENANCE.md](ASSET-PROVENANCE.md). Virio informed earlier motion research; the current owner direction supersedes the literal reproduction and earlier `.tastemaker/` layout restrictions.

The book keeps all three pages mounted and retains each scroll position. Inactive pages are hidden and inert. Header links and browser Back/Forward navigate the same pages; the cover is never a backward destination. Diagram and philosophy-card swipes stay within their respective carousels. Reduced motion or Pause motion makes book navigation immediate. Without JavaScript, the content remains a normal stacked document; print also exposes all three pages.

After `npm run prepare:pages`, `npm run test:book` launches an isolated Chrome profile and local static server for the production browser regression suite. No browser automation dependency is installed. On systems without Chrome at the standard macOS path, set `CHROME_PATH`; `BOOK_REVIEW_DIR` controls the report/screenshot directory (default: system temporary directory / `keepri-book-review`).
