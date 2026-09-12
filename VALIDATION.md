# Website validation

September 11, 2026. Current revision: three sections, an asymmetric hero with a stable headline and RI orbital SVG, six principles, and a compact footer.

## Build and source checks

- The final `npm run prepare:pages` passed type checking, production Vinext build, static validation, and staging into `docs/` for `/keepri/`.
- Static validation passed with 28 local asset and anchor references.
- Targeted Oxlint passed without diagnostics. `git diff --check` was clean.
- Content checks found six principles, three sections, no em dashes, and no image elements. Closed beta, planned competition and significant prizes, proposed industry offerings, and separate research consent remain explicit.

## Current Chrome measurements

Dimensions are pixels. Paired values report client size and scroll size. The vision bottom is its vertical position in the visible hero.

| Viewport | Hero height | Headline width | Document overflow | Vision bottom |
| --- | --- | --- | --- | --- |
| 1440 × 900 | 900 / 900 | 763 / 763 | 0 | 868 |
| 390 × 844 | 844 / 844 | 350 / 350 | 0 | 818 |
| 320 × 568 | 568 / 568 | 280 / 280 | 0 | 550 |

All philosophy cards reported zero content overflow. At 320 × 568, CSS hides the orbital visual under the mobile rule for heights no greater than 700px.

The outer orbital trace uses a 14s cycle. Its animation clock advanced 1000ms over 1001ms on desktop and 999ms over 1001ms on mobile. Pause set the motion state to paused and orbital playback to false; an 8ms transition paint was followed by a stopped animation. Details and historical reference measurements are in [MOTION-VERIFICATION.md](MOTION-VERIFICATION.md).

An isolated headless Chrome profile checked 844 × 390 landscape. The opening was skipped, document overflow was zero, the natural-height hero measured 531 / 531px, and the headline measured 434 / 434px. The vision bottom was 513px within the hero. The hero had no clip and was interactive. Screenshot review found no overlap; the vision continues below the viewport through normal scrolling. Virtual-time results were excluded from animation timing evidence.

## Final opening and philosophy review

Isolated headless Chrome profiles verified the current opening at its 91% handoff. At 1440 × 900, scroll position was 1474px and the wrapper was 2520px high. At 390 × 844, scroll position was 1076px and the wrapper was 2026px high. Both had zero document overflow, no hero clip, an interactive hero, and intro state `done`. Screenshots were visually reviewed and showed no layout issues.

Real wall-clock samples after both handoffs measured 1000ms of outer-trace advance over 1001ms. At the philosophy section, orbital playback was false and the trace was paused, with zero advance over 1001ms on desktop and 1002ms on mobile. These measurements did not use virtual time.

Desktop and mobile philosophy screenshots showed the current heading and first principle, with six entries and no card or document overflow. The mobile view displayed `01 / 06` and navigation arrows. The recorded results are in `/private/tmp/keepri-final-review/results.json`, outside the published site.

## Scope

Earlier Safari constellation checks and Virio measurements are historical evidence only. Physical touch hardware, screen-reader testing, and frame-rate profiling were not performed. Review artifacts live outside the published website.

The build was staged for GitHub Pages. These checks do not establish publication of the current revision.
