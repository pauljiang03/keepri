# Motion and fidelity verification

Reference: https://www.virio.ai/ — inspected in native Chrome on September 11, 2026. Current Keepri public site was also inspected before implementation. No separate reproduction-plan attachment was available in the session; implementation follows the explicit request and repository product facts.

## Evidence and implementation

Measurements combine live browser observation with the publicly served reference JS/CSS inspected through Chrome DevTools. Source timings are distinguished from stopwatch measurements below. Reference art, proprietary typeface, logos and copy were not imported.

| Surface | Reference evidence | KeepRI implementation |
| --- | --- | --- |
| Opening | Source: 480vh wrapper, sticky 100vh, 380vh travel. Browser: 390×844 at y=641 shows the word wall; around y=2940 shows the hero. | Same wrapper/travel and sequence; native desktop scrolling compared through wall, scatter/bloom and hero stages. |
| Wall | Source: 207 bricks, 13vw/8.6vh desktop grid; 26vw/max(7.5vw,5.5vh) mobile grid. | 207 REASONING bricks, KeepRI palette, same grid and radial movement. |
| Opening timeline | Source timeline totals 1.065 units. Pop .02/.1+stagger .06; scatter .24/.1+stagger .12; bloom .4; dark .42; subline .46; fade .66; hero .74; green .8; .2 tail. These are scroll weights, not elapsed seconds. | Matching segment positions, durations and easings. Scroll cue .85s yoyo with .16 stagger; resting bricks have .09s pop/.2s dismissal. |
| Headline | Live MutationObserver intervals: 2800ms, 2800ms. Source: opacity/blur 800ms, transform 900ms, ±45%, blur14px. | Same cadence and transition values; four KeepRI phrases. Paused while the document is hidden, intro active, or motion paused. |
| Scrolling | Live console confirmed Lenis lerp .1. Source: v1.3.11, native touch, GSAP ticker. | Same package version and scroll settings. Header reveal 250ms, initial hold1200ms. |
| Particles | Source: 26px grid, DPR cap2, radial waves ~3.93/4.83s, pointer follow .12/frame, 200ms activity window, .99 trail decay, 300px bottom fade. | Independently authored canvas with these parameters in the KeepRI palette, pointer response and upward exit. |
| Marquees | Source: hero50px/s, process/footer24px/s, drag/inertia, no hover pause. | Same autonomous speeds, drag/inertia and resume behavior; branded text replaces logos. |
| Cards | Source: 110vh wrapper, top18px sticky, 278×408px cards at1440. Scrubbed entrance and 10-unit sequential timeline. Browser desktop showed glass cards and staged imagery; mobile showed fully visible stacked cards. | Matching desktop geometry/timeline, actual beta tutorial and solution views, labeled future competition card. Mobile stack avoids desktop pinning. |
| Tabs / FAQ | Source: case panels320ms fade/y6, stats50ms delay; two cream FAQ panels with 300ms answer transition; mobile500ms power3.out navigation. | Accessible tabs, cream panels, swipe cards and matching transition values. |
| Closing | Source: 211vw×70.2vw cream ellipse, scroll-linked upward reveal, hidden on mobile. | Same geometry and trigger family, KeepRI closing copy. |

## Browser comparison and iteration

- Compared the reference and initial KeepRI opening with native desktop scroll gestures at a 1512px window, including resting wall, bloom/subline transition, hero handoff and upward return behavior.
- Compared hero geometry on desktop and in Chrome's 390×844 responsive viewport. Adjusted hero height, headline line height, header gutters, paragraph spacing and mobile content offset after visible differences. Shortened hero description to improve the mobile line count.
- Inspected reference desktop cards at 1440×900 and mobile reference cards at 390×844. Inspected KeepRI mobile Improve/Compete cards with actual product views; corrected desktop label positioning using source dimensions.
- Chrome became unavailable during the final full-page comparison (`cgWindowNotFound`). Re-selecting the app and resetting the browser session did not restore access. Final cream-panel adjustments and the last spacing edits are source-checked, but were not visually rechecked after that interruption.

## Remaining fidelity gaps and acceptance limits

1. DM Sans and KeepRI copy differ from Virio's Haffer typeface and wording. Line endings, glyph shapes, widths and some vertical spacing intentionally differ.
2. Product visuals are real KeepRI beta screenshots and labeled future-state designs. They replace Virio's animated charts/customer art. The lower case-study art's 9-second canvas/chart animation is not reproduced.
3. The particle/grain appearance is an independent approximation in KeepRI colors. Random scatter is seeded differently. Exact pixel parity and frame-rate parity are not established.
4. Marquee dragging uses the same GSAP drag/inertia family, but the reference's horizontal-wheel steering, item snapping and 1000px throw clamp are not reproduced. Mobile FAQ uses native scroll snapping and bounded previous/next navigation, rather than the reference's centered infinite GSAP carousel.
5. Final full-page desktop/mobile screenshots, 320px layout, actual touch hardware, 200% zoom, screen-reader behavior and performance profiling remain unverified because the browser window became unavailable. Earlier desktop/mobile observations do not establish final end-to-end acceptance.

For a fresh opening replay in the same tab, clear `keepri:opening-seen:v2` from that origin's session storage and reload. Reduced-motion preference intentionally skips the opening. Native touch scrolling is intentional.
