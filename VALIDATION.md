# Website validation

## Two-stage intro, September 14

The intro now completes a spin before spelling the full phrase, then waits for explicit peel or skip. Typecheck, focused lint, production build and all 12 opening lifecycle tests passed, including stage ordering and reduced-motion settlement. Static checks passed for 28 local asset/anchor references and the required business-model content. The local preview returned HTTP 200. No browser visual or animation QA was performed.

## Main-page business workflow, September 14

Replaced the probability simulation with the owner-approved business flow: free games, per-game leaderboards, tournaments and prizes, optional research, organizational purchases and reinvestment. Preserved the headline, original philosophies and industry prose, and the visitor-controlled intro.

Validation: typecheck, the 10 opening lifecycle tests, focused lint and production build passed. Static checks passed for 28 local asset/anchor references, required workflow and consent wording, retained notices and the absence of retired simulation controls. The flow uses semantic HTML, a native details disclosure and responsive CSS; it requires no JavaScript to read. No browser visual or interaction QA was performed.

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

September 11, 2026. Current revision: centered hero, homepage opening replay, and header-only “For Industry” capitalization. Product copy and the constellation sequence are unchanged.

## Current revision

Final `npm run prepare:pages` passed type checking, production build, static validation, and staging for `/keepri/`, with 28 local references. Targeted Oxlint and `git diff --check` passed.

Isolated Chrome QA passed 13 cases. Every case had zero document overflow. Hero client and scroll heights matched: 900px at 1440 × 900, 844px at 390 × 844, 568px at 320 × 568, and 531px at 844 × 390. Headline, copy, and visible orbital artwork had 0px center deviation; the link differed by -0.01px. Desktop and mobile constellation screenshots at 30% progress and centered-hero screenshots at 91%, plus small and landscape layouts, were visually reviewed without layout issues.

The old session key was seeded with `1` before every load. Normal desktop and mobile loads still began with the intro active at scroll 0. Reloads after the intro and footer, and the header wordmark from a deep section, also replayed from 0. A direct `#thesis` link bypassed the intro and reached scroll 820px. Reduced motion bypassed the intro and disabled orbital playback.

At the 91% handoff, desktop measured a 2520px wrapper and scroll 1474px; mobile measured 2026px and scroll 1076px. Both had intro state `done`, no hero clip, and an interactive hero. All cases retained “For Industry” in the header and “For industry” in the section.

Results: `/private/tmp/keepri-final-review/replay/results.json`. The constellation sequence is unchanged. No new animation timing sample was taken; prior trace timings remain historical.

## Historical evidence

The remaining checks apply to the previous asymmetric layout and session-based opening behavior.

## Previous revision: build and source checks

- The final `npm run prepare:pages` passed type checking, production Vinext build, static validation, and staging into `docs/` for `/keepri/`.
- Static validation passed with 28 local asset and anchor references.
- Targeted Oxlint passed without diagnostics. `git diff --check` was clean.
- Content checks found six principles, three sections, no em dashes, and no image elements. Closed beta, planned competition and significant prizes, proposed industry offerings, and separate research consent remain explicit.

## Previous layout: Chrome measurements

Dimensions are pixels. Paired values report client size and scroll size. The vision bottom is its vertical position in the visible hero.

| Viewport   | Hero height | Headline width | Document overflow | Vision bottom |
| ---------- | ----------- | -------------- | ----------------- | ------------- |
| 1440 × 900 | 900 / 900   | 763 / 763      | 0                 | 868           |
| 390 × 844  | 844 / 844   | 350 / 350      | 0                 | 818           |
| 320 × 568  | 568 / 568   | 280 / 280      | 0                 | 550           |

All philosophy cards reported zero content overflow. At 320 × 568, CSS hides the orbital visual under the mobile rule for heights no greater than 700px.

The outer orbital trace uses a 14s cycle. Its animation clock advanced 1000ms over 1001ms on desktop and 999ms over 1001ms on mobile. Pause set the motion state to paused and orbital playback to false; an 8ms transition paint was followed by a stopped animation. Details and historical reference measurements are in [MOTION-VERIFICATION.md](MOTION-VERIFICATION.md).

An isolated headless Chrome profile checked 844 × 390 landscape. The opening was skipped, document overflow was zero, the natural-height hero measured 531 / 531px, and the headline measured 434 / 434px. The vision bottom was 513px within the hero. The hero had no clip and was interactive. Screenshot review found no overlap; the vision continues below the viewport through normal scrolling. Virtual-time results were excluded from animation timing evidence.

## Previous layout: opening and philosophy review

Isolated headless Chrome profiles verified the previous revision's opening at its 91% handoff. At 1440 × 900, scroll position was 1474px and the wrapper was 2520px high. At 390 × 844, scroll position was 1076px and the wrapper was 2026px high. Both had zero document overflow, no hero clip, an interactive hero, and intro state `done`. Screenshots were visually reviewed and showed no layout issues.

Real wall-clock samples after both handoffs measured 1000ms of outer-trace advance over 1001ms. At the philosophy section, orbital playback was false and the trace was paused, with zero advance over 1001ms on desktop and 1002ms on mobile. These measurements did not use virtual time.

Desktop and mobile philosophy screenshots showed the heading and first principle, with six entries and no card or document overflow. The mobile view displayed `01 / 06` and navigation arrows. The recorded results are in `/private/tmp/keepri-final-review/results.json`, outside the published site.

## Scope

Earlier Safari constellation checks and Virio measurements are historical evidence only. Physical touch hardware, screen-reader testing, and frame-rate profiling were not performed. Review artifacts live outside the published website.

The build was staged for GitHub Pages. These checks do not establish publication of the current revision.
