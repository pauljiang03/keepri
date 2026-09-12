# Motion verification — three-section revision

September 11, 2026. The owner's latest direction replaces literal reproduction with a distinctly KeepRI opening and three main sections: hero, philosophies and industry. Game views, the player/rewards sections and the separate closing section are removed.

## Reference evidence

Virio (https://www.virio.ai/) was inspected live in native Chrome earlier in this session, including desktop scrolling and 390×844 responsive views. Live headline intervals were 2800ms and 2800ms. Its public scripts/styles established a 480vh opening (380vh travel), 207 bricks, Lenis lerp .1, 800ms blur/fade, 900ms headline travel, hero marquee 50px/s and mobile FAQ navigation 500ms. These findings remain the source for the retained rhythm; the old word-wall choreography is no longer a fidelity target.

## Current opening

A KeepRI wordmark is surrounded by 18 points, three rings and curved connections. Labels appear while the network rotates 32 degrees. The points gather; a circular aperture reveals the olive hero. Desktop wrapper 280svh (180svh travel); mobile wrapper 240svh (140svh travel). All positions below are normalized scroll progress, not elapsed seconds:

| Beat | Scroll progress |
| --- | --- |
| Rings and points appear | .02–.276 |
| Connections draw | .08–.402 |
| Labels appear | .14–.335 |
| Rotation | .18–.60 |
| Points gather, labels/network fade | .42–.681 |
| Circular reveal | .58–.86 |
| Hero accessible, header appears | after .82 |
| Circle clip removed, final hold | .86–1.00 |

The scroll cue uses visibility as well as opacity so it leaves keyboard focus order. Session key `keepri:opening-seen:v3` skips the opening on subsequent loads in the same tab. Reduced motion bypasses it. Scroll can reverse during the first visit; the former forced minimum scroll position was removed to avoid recursive scroll correction. The aperture clip is also removed after the reveal to avoid retaining an unnecessary compositing layer.

## Current native-browser measurements

A local QA page embeds the exact staged GitHub Pages build at fixed viewport sizes. Measurements read browser layout/computed styles and MutationObserver timestamps; the QA page is outside the repository and is not published. It does not finish or force website animations. The final harness uses iframe-local scrollTo; an earlier scrollIntoView could scroll the parent and intermittently show empty review space, so that was corrected.

- Desktop 1440×900: opening height2520px, travel1620px. At30% the connected constellation is visible; at72%, scroll1166px and computed circle37.30%; at91%, scroll1474px, clip none, hero interactive, header visible. The corrected final handoff was visually rechecked in Safari.
- Desktop hero: observed headline intervals2804/2802/2805ms, compared with reference2800ms. Computed marquee displacement measured50px/s. The page was visible during these measurements. Later offscreen-section samples varied by approximately1px/s at the same configured marquee speed.
- Mobile390×844: opening height2026px, travel1182px; connected constellation at30% / y354, complete hero at91% / y1075, clip none and hero interactive.
- Mobile320×844: philosophy layout has zero document overflow and zero card content overflow.
- Desktop document overflow0; philosophy panels each656×504px inside their borders, content height504px; no embedded game images.

## Intentional differences and limits

The constellation, aperture, shorter scroll travel, copy, KeepRI palette and DM Sans typography are intentional differences. The 26px canvas particle field remains an independently authored approximation of the measured wave/pointer behavior. The mobile philosophy carousel uses native scroll snapping and bounded navigation, not Virio's infinite carousel. Marquee throw feel is an adaptation, not exact parity. Physical touch hardware, screen-reader testing and frame-rate profiling are outside this verification.

See VALIDATION.md for build/static checks and final responsive review results.
