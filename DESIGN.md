# KeepRI website design

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
