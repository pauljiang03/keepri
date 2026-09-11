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
4. Marquees now include horizontal-wheel steering, integer-position snapping and a 1000px throw clamp. Their exact release feel is not identical to the reference's item-aware loop. Mobile FAQ intentionally uses native scroll snapping and bounded previous/next navigation rather than an infinite GSAP carousel.
5. Release follow-up checks below cover the final desktop and mobile layout corrections. Physical touch hardware, 200% browser zoom, a screen reader, and frame-rate profiling remain outside the verified scope. The original live headline measurement remains the timing evidence; background Safari snapshots were used for layout, not new motion-timing claims.

For a fresh opening replay in the same tab, clear `keepri:opening-seen:v2` from that origin's session storage and reload. Reduced-motion preference intentionally skips the opening. Native touch scrolling is intentional.

## GitHub Pages release follow-up

The final static export was rebuilt and served locally at the same `/keepri/` path as production. Chrome production-page inspection measured 1440×900 with no horizontal overflow, a visible document, initialized desktop motion, and an opaque research panel. The industry layout was visually inspected. Chrome then had active-user focus changes, so remaining layout checks used a separate Safari window with an exact-size iframe review page outside the repository/public artifact.

Verified and corrected:

- At 320px and390px: document width equals viewport width. All three product-image instances loaded when visited, with the `/keepri/assets/product/` prefix. Offscreen lazy images may remain unloaded on a fresh deep link until approached, as expected.
- Final Compete visual at320px: client width256px, height350px, scrollHeight350px. At390px: width326px, height454px, scrollHeight454px. Content fits; mobile portrait-card sizing no longer grows with image intrinsic height.
- Mobile philosophy card and controls visually inspected at390px. Paper surface, full copy, and narrow-screen wrapping are readable.
- Desktop philosophy panels: each656px client width ×504px client height (658×506 outer), equal columns, vertical question list. Corrected an inherited horizontal flex direction and the minimum-width constraint that squeezed the answer panel.
- Desktop thesis headline: client/scroll width1440px, with the complete sentence visible. Reduced its desktop font size to fit KeepRI's longer wording.
- Script-disabled desktop: no root enhancement marker, closing curve display:none, three caption widths278px each, no horizontal overflow, and the closing CTA/footer visibly present. The no-JavaScript fallback now avoids overlapping captions and an obscured closing section.
- Header centered and darkened for legibility on the cream sections. Industry metadata now also says the research offering is planned.
- Fresh deep links skip intro height before first paint, then receive a single font/layout-aware position correction that is canceled by user input. This prevents sections from landing at stale positions after layout changes.
- GitHub Pages client hydration/remount fix: `PAGES_BASE_PATH` is explicitly inlined through Next configuration. Previously the browser compiled it to an empty object lookup, risking root-relative product image URLs after changing tabs. Static validation now rejects an unresolved client prefix.

The Safari review iframe reported `visibility:hidden` while the user worked in Chrome. Finite CSS entrance animations were settled by the local review page for layout snapshots. Those screenshots establish layout and content fit, not real-time animation performance. The review page is not included in `docs/` or the repository.
