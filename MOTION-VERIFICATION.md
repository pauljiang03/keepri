# KeepRI motion verification

## Current business-model revision

The business diagram is readable without animation or JavaScript. Removed the unused simulation parallax from PageMotion; the manual peel lifecycle and global motion preference remain unchanged. Earlier simulation-camera checks below are historical.

## Latest revision: mathematical simulation, game removed

The game is replaced by an independently authored beta–binomial probability surface. Adjustable successes, failures and symmetric prior strength determine the posterior. Twenty-five density slices show proportional accumulation of evidence; their vertical scale is shared and normalized. The bright curve is the final posterior. Mean, standard deviation in percentage points, and observation count are reported explicitly.

Four mathematical tests pass: exact uniform/polynomial densities and endpoints, numerical normalization including extreme cases, posterior moments and symmetry, and finite surface geometry with an exact final-posterior slice across all control-boundary combinations. TypeScript, authored-source lint, production export, asset/content checks and license-notice checks pass. No browser visual QA was requested or performed; no browser is connected in this session.

Camera updates are capped at 30fps and stop under local/global pause, reduced motion, hidden tabs and offscreen state. Parameter changes still update the static diagram when rotation is disabled. The existing visitor-controlled intro is unchanged. No game or rule-discovery code remains in the authored site. The build retains full license/notice files for 27 runtime/core package versions, alongside the existing font and icon notices.

## Previous revision (historical)

## Latest September 14 revision: visitor-controlled entry and reasoning exercise

This revision supersedes the timed auto-entry behavior documented below. The cover now waits for explicit entry. A separate paused GSAP timeline owns the peel; the constellation timeline cannot initiate it. Reduced-motion and visibility changes also preserve the waiting state. Completion remains permanent for the document lifetime.

The dotted logo is replaced with a shared RI open-frame wordmark. The hero headline is “Independent thought. In the age of AI.” The repeated expansion above it is removed. Philosophy and industry paragraphs exactly match the earlier September 11 prose; the new layouts are retained.

The orbit is now an interactive, client-only rule-discovery exercise. Input validation, rule evaluation, candidate elimination, accessible feedback, recent tests, answer selection and reset are implemented. Eliminated orbits dim and freeze; the diagram remains usable with motion disabled.

Validation: 10 opening/geometry tests and four reasoning tests pass. TypeScript, lint of authored files, production export and static content/asset checks pass. Existing unrelated vendored-component lint errors remain outside this change. No browser visual QA was performed; the connected session has no browser available.

## Earlier September 14 revision (historical)

## September 14, 2026 revision

The page-peel revision supersedes the scroll-controlled opening and centered-hero behavior recorded below. The older browser results are historical and do not validate this revision.

- Nine automated geometry/lifecycle tests pass via `npm run test:opening`. Coverage: decreasing paper coverage at desktop/mobile/landscape aspect ratios; every load/reload including section hashes; permanent completion under upward input; scroll acceleration; Escape/focus; reduced motion; preference changes; listener teardown and scroll restoration.
- Tests execute the production controller with deterministic GSAP, Lenis and browser-environment stubs. They verify state and geometry, not rendered animation or frame rate.
- TypeScript and lint for the authored app, components, libraries and validation scripts pass. Repository-wide lint still reports existing errors in vendored UI components and `hooks/use-mobile.ts`; those unrelated files are unchanged. Generated `docs/` output is now correctly excluded from lint.
- Production export, local asset references, repository base paths and product-status checks pass with `npm run prepare:pages`.
- No browser interaction or screenshot QA was requested or performed for this revision. The preview route responded successfully; no browser was available for the preview handoff.

The opening runs for 3.8 seconds, with its peel beginning at 2.15 seconds. Scroll/touch input advances to the peel and increases playback speed. Reduced motion uses a 450ms still cover. Completion hides the fixed overlay and releases inert content; no intro scroll region remains. A direct section hash is resolved after completion. Resize updates viewport geometry, without replay. The orbital frame loop stops offscreen, in hidden tabs and under reduced/paused motion.

## Historical evidence from September 11

September 11, 2026. The current revision retains the constellation sequence and centers a small RI orbital SVG above the stable hero headline, purpose statement, and link. Canvas particles, rotating phrases, and marquees are removed.

Current source settings and centered-layout replay checks are recorded below. Previous asymmetric-layout measurements and trace timings remain explicitly historical.

## Current opening settings

The opening contains 18 points, three rings, curved connections, four labels, and the KeepRI wordmark. Its wrapper is 280svh above 1024px and 240svh at smaller widths, with a sticky 100svh stage. ScrollTrigger maps the complete sequence to normalized progress from 0 to 1.

| Beat                            | Scroll progress |
| ------------------------------- | --------------- |
| Rings and points appear         | .02 to .276     |
| Connections draw                | .08 to .402     |
| Labels appear                   | .14 to .335     |
| Network rotates 32 degrees      | .18 to .60      |
| Labels leave and points gather  | .42 to .681     |
| Circular hero reveal            | .58 to .86      |
| Opening layer fades             | .68 to .84      |
| Hero becomes interactive        | after .82       |
| Circle clip removed; final hold | .86 to 1.00     |

These source-derived values are scroll positions, not elapsed seconds. The timeline can reverse with scrolling. Every normal homepage load or reload replays the opening; session storage no longer suppresses it. Before Lenis starts, manual scroll restoration and a reset to the top prevent an old scroll position from skipping the opening. The header wordmark links to the real homepage URL, including the deployment base path, to replay it.

Reduced motion, direct section links other than `#top`, and viewports no taller than 520px bypass the opening. Runtime motion-preference and compact-height changes preserve content position without replay. Hidden intro cues leave the focus order; the hero remains inert until the reveal threshold.

## Current hero and navigation settings

- Headline: static. No word rotation, text blur, or marquee.
- Orbital SVG: outer trace 14s linear; inner trace 10s linear in reverse. Both use normalized stroke-dashoffset from 0 to -1. The geometry and monogram remain stationary.
- Trace playback: enabled only while the hero visual is onscreen, the document is visible, the opening is complete, reduced motion is off, and the footer motion control is not paused.
- Hover: monogram color transition .4s; hero-link arrow moves 3px diagonally over .3s.
- Scrolling: Lenis lerp .1, smooth wheel input, native touch, nested scrolling enabled. Anchor navigation takes 1.2s, or completes immediately under reduced motion.
- Header: .25s power2.out movement, with a 1200ms visible hold after the opening and reveal on keyboard focus.
- Desktop philosophy heading: xPercent 12 to 0 and opacity .3 to 1, from top/bottom to bottom/35%, with scrub 1.
- Mobile philosophy navigation: native scroll snapping and bounded previous/next buttons, .5s power3.out. Reduced motion makes button navigation immediate.
- Compact height: at 520px or less, the hero uses natural height. Changes to this media condition or reduced motion rebuild the opening behavior while preserving content position.
- Small mobile viewports: at widths and heights no greater than 700px, CSS hides the orbital visual.

## Current centered-layout and replay checks

Isolated Chrome QA passed 13 cases with zero document overflow. Screenshots of the desktop and mobile constellation at 30% progress, the centered hero at 91%, and the 320 × 568 and 844 × 390 layouts were visually reviewed without layout issues.

| Viewport   | Hero client / scroll height | Headline and copy center deviation | Visible artwork center deviation | Link center deviation |
| ---------- | --------------------------- | ---------------------------------- | -------------------------------- | --------------------- |
| 1440 × 900 | 900 / 900px                 | 0px                                | 0px                              | -0.01px               |
| 390 × 844  | 844 / 844px                 | 0px                                | 0px                              | -0.01px               |
| 320 × 568  | 568 / 568px                 | 0px                                | hidden                           | -0.01px               |
| 844 × 390  | 531 / 531px                 | 0px                                | hidden                           | -0.01px               |

The old session key was seeded with `1` before every load. Normal desktop and mobile loads started with intro state `active` at scroll 0. Desktop reloads after the intro and footer, and the header wordmark from a deep section, also replayed at 0. Direct `#thesis` navigation set intro state `seen` and reached scroll 820px. Reduced motion set intro state `seen` and orbital playback to false.

| 91% handoff | Opening wrapper | Scroll position | Hero clip | Hero inert | Intro state |
| ----------- | --------------- | --------------- | --------- | ---------- | ----------- |
| 1440 × 900  | 2520px          | 1474px          | none      | false      | done        |
| 390 × 844   | 2026px          | 1076px          | none      | false      | done        |

All cases retained “For Industry” in the header and “For industry” in the section. Results are in `/private/tmp/keepri-final-review/replay/results.json`. The constellation sequence is unchanged; this review adds no animation timing sample. Prior trace timings below remain historical.

## Previous layout: Chrome measurements

| Viewport   | Hero client / scroll height | Headline client / scroll width | Document overflow | Vision bottom |
| ---------- | --------------------------- | ------------------------------ | ----------------- | ------------- |
| 1440 × 900 | 900 / 900px                 | 763 / 763px                    | 0px               | 868px         |
| 390 × 844  | 844 / 844px                 | 350 / 350px                    | 0px               | 818px         |
| 320 × 568  | 568 / 568px                 | 280 / 280px                    | 0px               | 550px         |

The vision bottom is measured within the visible hero. All philosophy cards reported zero content overflow. The 320 × 568 view hides the orbital visual through the small-mobile CSS rule.

For the configured 14s outer trace, the animation clock advanced 1000ms over a 1001ms desktop sample and 999ms over a 1001ms mobile sample. Pause set `data-motion="paused"` and orbital `data-animated="false"`. An 8ms advance during transition paint was followed by stopped playback.

## Previous layout: landscape check

An isolated headless Chrome profile at 844 × 390 skipped the opening and displayed an interactive hero without a circle clip. Document overflow was zero. The natural-height hero measured 531 / 531px and the headline measured 434 / 434px, using client / scroll dimensions. The vision bottom was 513px within the hero. Screenshot review found no overlap. Content below the 390px viewport remains available through normal scrolling.

This check establishes landscape layout and the compact opening exception. Virtual-time animation results were excluded from timing evidence. Orbital timing is established by the native Chrome samples above and real wall-clock checks below.

## Previous layout: opening and offscreen playback checks

Isolated headless Chrome profiles checked the previous revision at 91% normalized progress. Both screenshots were visually reviewed and showed a complete, unclipped hero handoff.

| Viewport   | Scroll position | Opening wrapper | Hero clip | Hero inert | Intro state | Document overflow |
| ---------- | --------------- | --------------- | --------- | ---------- | ----------- | ----------------- |
| 1440 × 900 | 1474px          | 2520px          | none      | false      | done        | 0px               |
| 390 × 844  | 1076px          | 2026px          | none      | false      | done        | 0px               |

Real wall-clock samples measured 1000ms of outer-trace advance over 1001ms after each handoff. At the philosophy section, `data-animated="false"` and a paused trace produced zero advance over 1001ms on desktop and 1002ms on mobile. These checks used no virtual-time acceleration.

Desktop and mobile philosophy screenshots from that revision showed the heading and first principle, six entries, and zero card or document overflow. The mobile view displayed `01 / 06` and navigation arrows. Recorded values are in `/private/tmp/keepri-final-review/results.json`, outside the published site.

## Historical browser evidence

Virio was inspected live in native Chrome earlier in the session, including desktop and 390 × 844 responsive views. Its headline changed at 2800ms intervals. Public source established a 480vh opening, 207 word bricks, Lenis lerp .1, 800ms blur/fade, 900ms headline travel, and a 50px/s hero marquee. Those opening and hero effects are historical reference, not current fidelity targets.

An earlier KeepRI revision with the same constellation opening was inspected in native Safari through a local QA wrapper. At 1440 × 900 its opening measured 2520px high; at 390 × 844 it measured approximately 2026px. The recorded 91% checkpoints showed no remaining circle clip and an interactive hero. Earlier 320/390/1440 layouts reported zero document overflow.

That earlier hero used rotating text and a marquee, measured at approximately 2800ms and 50px/s. Those measurements do not apply to the stable headline or orbital SVG. Earlier responsive results likewise do not establish the current hero's fit.

## Verification boundary

Current evidence covers centered layouts, constellation and handoff screenshots, homepage replay, direct-section navigation, and reduced motion. Earlier trace timing and philosophy screenshot evidence applies to its tested revision. Physical touch hardware, screen-reader testing, and frame-rate profiling were not performed. Final build evidence is recorded in [VALIDATION.md](VALIDATION.md); publication is separate.
