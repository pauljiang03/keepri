# KeepRI motion verification

September 11, 2026. The current revision retains the constellation opening and uses an original asymmetric hero, stable headline, and RI orbital SVG. Canvas particles, rotating phrases, and marquees are removed.

Source settings and current Chrome measurements are recorded separately below. Earlier browser measurements remain historical evidence for their tested revisions.

## Current opening settings

The opening contains 18 points, three rings, curved connections, four labels, and the KeepRI wordmark. Its wrapper is 280svh above 1024px and 240svh at smaller widths, with a sticky 100svh stage. ScrollTrigger maps the complete sequence to normalized progress from 0 to 1.

| Beat | Scroll progress |
| --- | --- |
| Rings and points appear | .02 to .276 |
| Connections draw | .08 to .402 |
| Labels appear | .14 to .335 |
| Network rotates 32 degrees | .18 to .60 |
| Labels leave and points gather | .42 to .681 |
| Circular hero reveal | .58 to .86 |
| Opening layer fades | .68 to .84 |
| Hero becomes interactive | after .82 |
| Circle clip removed; final hold | .86 to 1.00 |

These source-derived values are scroll positions, not elapsed seconds. Scroll may reverse during the first visit. Session key `keepri:opening-seen:v3` skips the opening on later loads in the same tab. Reduced motion, direct section links, and viewports no taller than 520px also bypass it. Hidden intro cues leave the focus order; the hero remains inert until the reveal threshold.

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

## Current Chrome measurements

| Viewport | Hero client / scroll height | Headline client / scroll width | Document overflow | Vision bottom |
| --- | --- | --- | --- | --- |
| 1440 × 900 | 900 / 900px | 763 / 763px | 0px | 868px |
| 390 × 844 | 844 / 844px | 350 / 350px | 0px | 818px |
| 320 × 568 | 568 / 568px | 280 / 280px | 0px | 550px |

The vision bottom is measured within the visible hero. All philosophy cards reported zero content overflow. The 320 × 568 view hides the orbital visual through the small-mobile CSS rule.

For the configured 14s outer trace, the animation clock advanced 1000ms over a 1001ms desktop sample and 999ms over a 1001ms mobile sample. Pause set `data-motion="paused"` and orbital `data-animated="false"`. An 8ms advance during transition paint was followed by stopped playback.

## Current landscape check

An isolated headless Chrome profile at 844 × 390 skipped the opening and displayed an interactive hero without a circle clip. Document overflow was zero. The natural-height hero measured 531 / 531px and the headline measured 434 / 434px, using client / scroll dimensions. The vision bottom was 513px within the hero. Screenshot review found no overlap. Content below the 390px viewport remains available through normal scrolling.

This check establishes landscape layout and the compact opening exception. Virtual-time animation results were excluded from timing evidence. Orbital timing is established by the native Chrome samples above and real wall-clock checks below.

## Final opening and offscreen playback checks

Isolated headless Chrome profiles checked the current intro at 91% normalized progress. Both screenshots were visually reviewed and showed a complete, unclipped hero handoff.

| Viewport | Scroll position | Opening wrapper | Hero clip | Hero inert | Intro state | Document overflow |
| --- | --- | --- | --- | --- | --- | --- |
| 1440 × 900 | 1474px | 2520px | none | false | done | 0px |
| 390 × 844 | 1076px | 2026px | none | false | done | 0px |

Real wall-clock samples measured 1000ms of outer-trace advance over 1001ms after each handoff. At the philosophy section, `data-animated="false"` and a paused trace produced zero advance over 1001ms on desktop and 1002ms on mobile. These checks used no virtual-time acceleration.

Desktop and mobile philosophy screenshots showed the current heading and first principle, six entries, and zero card or document overflow. The mobile view displayed `01 / 06` and navigation arrows. Recorded values are in `/private/tmp/keepri-final-review/results.json`, outside the published site.

## Historical browser evidence

Virio was inspected live in native Chrome earlier in the session, including desktop and 390 × 844 responsive views. Its headline changed at 2800ms intervals. Public source established a 480vh opening, 207 word bricks, Lenis lerp .1, 800ms blur/fade, 900ms headline travel, and a 50px/s hero marquee. Those opening and hero effects are historical reference, not current fidelity targets.

An earlier KeepRI revision with the same constellation opening was inspected in native Safari through a local QA wrapper. At 1440 × 900 its opening measured 2520px high; at 390 × 844 it measured approximately 2026px. The recorded 91% checkpoints showed no remaining circle clip and an interactive hero. Earlier 320/390/1440 layouts reported zero document overflow.

That earlier hero used rotating text and a marquee, measured at approximately 2800ms and 50px/s. Those measurements do not apply to the stable headline or orbital SVG. Earlier responsive results likewise do not establish the current hero's fit.

## Verification boundary

The current Chrome record covers hero layouts, the landscape exception, opening handoffs, philosophy screenshots, card overflow, orbital timing, and pause and offscreen behavior. Physical touch hardware, screen-reader testing, and frame-rate profiling were not performed. Final build checks are recorded in [VALIDATION.md](VALIDATION.md); publication is separate.
