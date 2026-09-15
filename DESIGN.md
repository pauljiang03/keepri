# KeepRI website design

## Exactly three complete chapters

Main now contains the headline, workflow, both funding sections and vision. Philosophy restores the complete six principles. Industry restores the research overview, deliverables and learning sequence, and ends with participation terms and the original footer. There are exactly three page surfaces in that order. Legacy links resolve to the corresponding chapter.

Complete text is retained. Where it exceeds the viewport, the chapter scrolls natively; reading momentum is consumed without changing chapters at the bottom. A fresh gesture at an edge or an explicit navigation control changes chapters at the existing fixed 520ms speed. Earlier entries below describe the superseded six-page and viewport-only layouts.

## Consolidated chapters and fixed transition timing

Philosophy now presents all six principles on one page; Industry combines its overview, three deliverables, research sequence and participation terms on one page. The main page is preserved. There are six pages in total, with no internal scrolling. Legacy principle and research subpage hashes redirect to their consolidated chapter.

Transitions take 520ms at a constant speed. Extra gestures, taps and keys during a transition are consumed without acceleration or delayed replay. The cue exposes its busy state and returns to ready as soon as the transition finishes. Gesture detection no longer scales the required impulse against the strength of the previous swipe. Earlier entries below describe superseded behaviors.

## Bottom swipe cue and uninterrupted gestures

A compact arrow-and-text cue sits below every page. It advances on tap and reverses on the last page; users can also swipe directly over it. Pages reserve 44px for the cue, or 32px in short landscape views, with compact-phone spacing adjusted to keep the workflow in view. Fresh swipes in either direction are accepted during an active transition and accelerate its completion. Wheel momentum stays in one gesture across short delivery gaps and noisy tail samples. A new gesture requires 240ms of input silence, a deliberate reversal, or three rising samples that establish a separate impulse; this is independent of animation completion.


## Preserve spacing on revisited pages

Word wrappers now exist only during a transition. Completion restores the original text nodes before hiding a page, preventing animation cleanup from reordering whitespace. Resting pages use native text. Touch activation is now 14px and wheel activation 12px; the intro shares the shorter touch threshold.


## Word transitions and a consistent green palette

Page flips are replaced by staggered word exits and entrances. Words move upward to advance and downward to return; incoming words enter from the opposite side. All thirteen pages use the same forest-green ground with cream text and gold accents. The workflow and borders fade through the transition. Existing copy, viewport sizing, short swipes and quick reverse gestures are preserved.


## Sensitive vertical page curls

All pages now curl vertically: upward for forward navigation, downward for backward navigation. The intro retains its upward peel. Touch sensitivity is 22px and wheel sensitivity is 20px, with a 180ms pause recognizing a fresh wheel gesture. One deliberate reverse gesture can wait for an active turn; repeated inputs in the current direction cannot skip the animation.


## Curled cover and sideways book turns, September 15

Restored the original bottom-up cover peel. Logic words converge on curved paths with an edge-first stagger; the mission words settle in sequence at constant size. Main pages turn from right to left along a bowed crease with a shaded underside; backward navigation reverses the turn. No page content stretches, rotates or scrolls during navigation. Full-viewport layout and existing prose are unchanged.


## Words gather into the mission

The cover now starts as a scattered word field. The three destination words travel into the centered Keep / Reasoning / Independently phrase while the surrounding logic terms gather and clear. Natural word size is preserved throughout. After a short hold, the cover uses the same whole-page flip as the rest of the site. All viewport-only pages and the centered main headline remain unchanged.

## Full-viewport publication with direct page flips

The owner requested a complete page in each view, with no bottom bar, Next/Previous controls or internal scrolling. The site now has thirteen compact pages: main headline plus workflow, two funding pages, six original philosophy statements, three Industry pages and the vision. Funding and research detail is preserved through pagination, not hidden in overflow. The main headline block is centered vertically beside the diagram. Narrow screens use a compact stacked main page and responsive text sizing.

The cover shows the name and meaning together over logic vocabulary. One input immediately flips the entire cover upward. Every section transition uses the same 720ms whole-sheet rotation and power2.inOut easing. A simple 3D transform replaces the scrolling clipping sheet and gradient fold strip. No text element is animated independently. Scrolling or swiping turns pages in either direction; header links jump to chapters. There are no visible page-navigation controls or persistent bottom furniture. The no-JavaScript and print fallbacks remain stacked documents.

Earlier sections below describe previous revisions.

## Logic vocabulary

The intro background now uses 60 terms from logic: premises and conclusions, deduction and induction, validity and soundness, connectives, quantifiers, proof forms and logical systems. The dark palette, typography, spacing and bottom-up motion are unchanged.

## Formal-methods cover and bottom-edge peels

The cover now shares the main page’s forest-green background. Ten rows distribute 60 formal-methods terms across the viewport in restrained monospace type, with a soft central mask preserving the wordmark’s space. The meaning uses larger cream type and a gold Reasoning line, with no scaling, spinning or per-letter effects. The header no longer fades in over a pale body after the cover disappears; it is already rendered beneath the peeling cover.

Page-to-page navigation now follows the intro’s bottom-up geometry. A horizontal edge rises over 720ms while the content counter-translates beneath it and remains stationary. The fold uses the existing peelGeometry function. Going backward restores the previous sheet in reverse. Native reading scroll, carousel gestures, history, focus and reduced motion retain their existing behavior. All type, gradients and motion are authored locally with the existing stack.

Earlier sections below describe superseded motion.

## Reversible book pages, September 15

Visual thesis: a restrained editorial book, with a persistent masthead and page controls framing one readable sheet. KeepRI, Philosophies and Industry turn around a left-hand spine in 620ms; the reverse turn brings the preceding sheet back over the current one. A subtle shadow supplies depth. Page typography is never individually scaled or distorted. The intro remains an independent opening cover.

Each sheet has native vertical scrolling and keeps its place on return. The page controls stay visible without consuming content space or changing the headline layout. Arrows and horizontal touch swipes supplement the controls; nested carousels retain ownership of their gestures. Previous is disabled on the first page, Next on the last. A shorter desktop layout keeps the complete business-model panel above the controls at 1010×780.

The existing React/Vinext static stack and source-to-docs publication pipeline remain in place. CSS perspective and the browser Web Animations API implement the turn; no new runtime package or third-party page-flip source was added. The former window-scroll reveals were removed because each section is now its own reading page. Reduced motion is immediate, hidden pages are inert, and no-JavaScript and print views retain a stacked document.

## Name first and bounded model panels

The cover begins with the KeepRI wordmark. One input crossfades it into Keep reasoning independently before the existing upward handoff. Eight peripheral rows contain 24 specific reasoning/learning terms instead of four imperative slogans. Their typography is smaller, with a clear central area and a reduced four-row arrangement in short landscape viewports.

The diagram and explanatory text each sit within their own bordered, padded panel. Every arrow between diagram nodes is an actual SVG in a separate layout row. The old overlapping pseudo-element connectors and outside return line are removed. Nodes have complete borders, and both panels keep their shared height during horizontal navigation. Earlier descriptions below are historical.

## Continuous entry and stable hero, September 15

Visual thesis: a calm typographic sequence moves from independent reasoning to the KeepRI identity, then directly into the product story. The direction is deliberate, legible and continuous; the anti-goal is a series of effects that requires visitors to discover hidden input gates. The primary archetype remains product marketing with an editorial expression and a split narrative. The main action is to read the philosophies and planned business model, with development status serving as transparent process information.

The user-linked build-polished-websites skill and Virio's observed progression informed the motion. KeepRI's authored words, warm paper, clay accent, DM Sans, dot-free wordmark and upward reveal are retained. The reasoning phrase is visible first, fades into the name, then opens the page in one 2.35-second sequence. No tiled reference artwork, fonts, source code, copy or logos were reused. This supersedes the three-gesture requirements below. Industry is the label in both navigation and section heading.

The hero has a 40–80px gutter, aligned column tops, smaller bounded headline type and natural content height. Below 960px the figure follows the headline with a 40–48px gap. Figure rows have more vertical clearance. Switching diagram/text views preserves headline position and hero height.

Platform contract: source edits belong in React components, app/globals.css and lib/opening-motion.ts. Content remains editable in the existing component source; no CMS was introduced. Vinext 1.0.0-beta.5 regenerates hashed production assets with npm run prepare:pages; generated docs is staged from that export. Committing docs and pushing main publishes through the existing GitHub Pages deployment. Existing licensed dependencies and notices remain unchanged. Later sections are historical.

## Restrained intro, September 15

Apply the owner-linked [premium-web-design skill](https://github.com/Lucxar/premium-web-design-skill/blob/main/SKILL.md) to the intro: restraint, purposeful short transitions and a single brand-derived focal point. The warm paper and existing DM Sans wordmark stay. Two fine corner strokes echo the RI signature and turn once by 90 degrees; the wordmark remains still. The whole phrase crossfades together without stagger or an empty pause. A transform-based bottom-up peel preserves stationary text. Each motion lasts 0.5 seconds and waits for its own gesture. Dots, connecting lines, glow, the progress bar and bouncing cues are removed. All later intro descriptions are historical.

## Horizontal model views

The diagram and research explanation now occupy two horizontally swipable panels, using the existing Embla carousel and labeled buttons. No vertical scrolling or dropdown remains. Both panels retain the height of the taller content so switching does not move the headline. At that revision, the intro text reveal was shortened to 3.8 seconds.

## Three gestures and contained disclosure

The intro waits separately for spin, slow text reveal and upward peel. The diagram and its dropdown now scroll together within a fixed-height figure, with stable scrollbar space and native keyboard access. Opening the disclosure does not change the figure height or move surrounding page text.

## Compact main-page flow

The business flow shows concise step labels in its two branches, with the supporting explanations retained in Research & funding. Reduced vertical spacing, hero padding and excess minimum height let the closed diagram fit the first desktop view. The headline stays top-anchored when the disclosure expands. The hero no longer clips its contents.

The current peel lifts a horizontal fold from the bottom edge to the top. Only the constellation spins; intro text stays stationary and fades in as whole words.

## Static intro text

The wordmark no longer rotates in 3D. Only the constellation spins. The phrase uses three plain words at fixed 40px desktop / 32px mobile sizes, normal letter spacing and opacity-only fades. There are no per-character spans, text translations, perspective or scaling. Two distinct gestures still control spin and peel.

## Contained intro lettering

The spelling is limited to a centered 38rem column and a 3.75rem maximum type size. Viewport width and height can reduce the font without a fixed minimum, while each word uses intrinsic, non-stretching letter widths. Narrow and landscape screens keep side gutters.

## Current interaction and prize model

The intro starts paused. One gesture triggers spin and spelling; a second gesture peels. The headline uses a fixed top alignment independent of the funding disclosure height. Cash-prize entry would require an explicit research and commercial-use agreement; free practice remains available without research participation. This supersedes the earlier prize-eligibility model.

## Two-stage intro

The opening now spins the KeepRI wordmark and constellation once, fades that scene, then spells Keep Reasoning Independently letter by letter over three centered lines. The completed phrase holds until manual peel or skip. No change to the main-page business diagram or prose.

## Current main-page model diagram

The hero now presents the planned KeepRI business workflow instead of the probability simulation. Two connected columns separate competition from research contributed under the prize-entry agreement. A gold return line links revenue to free access, new games and prizes. Labels are HTML with responsive sizing; no scaled SVG text, external diagram package, or copied reference artwork is used. The original headline, philosophies, industry prose and manual intro are preserved.

The latest September 14 direction keeps the three-section site and its established identity, with a diagonal page-peel opening, a larger orbital instrument, stronger typography and concise mission-led copy.

## Visual system

Self-hosted DM Sans 400/500, warm paper #f6f3e9, ink #242820, deep greens, sage, gold and clay. Fine rules, subtle grain and a restrained coordinate grid connect the opening to the main page.

The desktop hero pairs left-aligned text with a custom 3D Bayesian probability surface. The surface depicts a beta prior updated by successes and failures. Three sliders control successes, failures and prior strength; readouts display mean, standard deviation and observation count. Wireframe curves show proportional evidence accumulation and a gold curve highlights the final posterior. The height scale is shared and normalized across the family. Motion is confined to the mathematical visual; controls remain stationary. Mobile stacks text, surface and controls in natural flow.

The original constellation is a fixed cover over the page, not a scroll section. The constellation animates and waits for entry. Only Peel to enter, downward scroll, upward swipe or keyboard entry starts the 1.65-second diagonal peel. Skip intro and Escape dismiss it. Completion hides the cover permanently until the next document load. Hash links also get the intro and resolve afterward. The header wordmark returns to the main-page top without replaying it. Reduced motion waits on a still cover; preference and visibility changes never initiate entry.

The earlier sequence game is retired. There are no guesses, answers, scores or winning states. Use the independently authored geometry in `lib/bayesian-surface.ts`, not third-party chart artwork, source examples or copied website styling. Standard mathematical formulas are documented separately from the rendering implementation. Preserve license notices for reused fonts and software. The dot-free KeepRI wordmark remains shared across the intro, header, footer and philosophy panels.

The main headline is “Independent thought. In the age of AI.” Remove the repeated expansion above it. Headline and supporting paragraph share one left alignment. Preserve the September 11 philosophy and industry prose, restored at the owner's request.

Philosophies pair numbered desktop tabs with a larger answer panel; smaller screens use swipe cards. Industry uses a proposed research diagram, native disclosures and staged entrances. Header links indicate the current section. The footer retains Back to top and Pause motion.

Use “For Industry” in the header only. The section label remains “For industry”.

## Content contract

Lead with the societal need for independent judgment: assessing evidence, questioning AI recommendations, and taking responsibility for decisions. AI may inform judgment without replacing it. Learning challenges and competition provide a place to practice.

Global leaderboards and significant prizes are central to the planned player experience. KeepRI remains in closed beta. Public leaderboards, tournaments, funded cash-prize events, and research are in development; do not imply they are operational.

Explain the need for more human learning data and the proposed study of attempts, feedback, assistance, and revisions. AI teams would license separately consented datasets and commission targeted collections for training and evaluation. Research revenue would support free access, new challenges, and significant prizes. These are plans and hypotheses, not established revenue or data-quality results.

Research enrollment is inactive. Free practice requires no research participation; cash-prize entry would require explicit agreement to research collection and commercial use. Use concise, professional language and no em dashes. Exclude game screenshots, personal biographies/contact details, installation links, release dates, invented metrics/testimonials, active prize offers, and reference-site logos or copy.

## Motion and accessibility

The stable headline carries the mission without animation. The probability surface uses direct SVG camera updates at a capped 30fps, with no React renders per frame. Density geometry is recomputed only when parameters change. It stops offscreen, in hidden tabs, during the intro, under reduced motion and when paused. GSAP owns the intro and section entrances; Lenis smooths wheel scrolling and preserves native touch scrolling after entry.

Reduced motion retains a still opening until the visitor enters. Runtime preference changes never initiate or replay entry. Viewport changes recompute the crease without creating scroll travel. Preserve native zoom gestures, accessible tabs, disclosures, mobile menu Escape/focus return and focusable anchor destinations. The underlying page is inert while the cover is present. No-JavaScript content is readable. Do not add storage flags or scroll-controlled reverse entry.

See [MOTION-VERIFICATION.md](MOTION-VERIFICATION.md) for automated checks and historical browser evidence.
