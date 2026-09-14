# KeepRI asset provenance

## Current hero diagram

The September 14 business-model revision replaces the probability surface on the public page with independently authored HTML/CSS in components/hero-visual.tsx and app/globals.css. Its content follows the owner-approved KeepRI workflow. Lucide supplies the small licensed direction/disclosure icons. Mathematical sources below describe the retired simulation, not the current hero.

Current inventory, September 14, 2026. This records source origins and retained notices; it does not assert exclusive rights or independent legal clearance.

| Asset                        | Origin and use                                                                                                                                                                                                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Constellation opening        | Original inline SVG and TypeScript in `components/hero.tsx`, with GSAP choreography in `lib/opening-motion.ts`. Eighteen points, three rings, curved connections, and a diagonal peel with original clipping/reflection geometry in `lib/peel-geometry.ts`, authored for KeepRI. |
| Bayesian probability surface | Independently authored TypeScript density calculations and perspective projection in `lib/bayesian-surface.ts`, rendered by `components/hero-visual.tsx`. No downloaded chart, screenshot, animation, example implementation or website artwork is used.                         |
| Research diagram             | Original HTML/CSS in `components/story-panels.tsx`, showing proposed attempts, feedback, and revisions.                                                                                                                                                                          |
| Grain                        | Locally generated noise texture at `public/assets/grain.png`.                                                                                                                                                                                                                    |
| Brand favicon                | Existing native project icon at `public/assets/keepri-brand/icon.png`, supplied in the workspace. Underlying ownership was not independently audited.                                                                                                                            |
| DM Sans                      | Existing self-hosted font files, with 400/500 WOFF2 faces used by the website. SIL OFL notice in `public/fonts/DM-Sans-OFL.txt`.                                                                                                                                                 |
| Lucide icons                 | Third-party arrows, menu, and disclosure icons. ISC/MIT notices in `public/licenses/lucide.txt`.                                                                                                                                                                                 |
| GSAP                         | Third-party animation runtime. Current authored code uses GSAP, ScrollTrigger, and ScrollToPlugin. Retained notice in `public/licenses/GSAP-notice.txt`; the notice also lists plugins used by earlier revisions.                                                                |
| Lenis                        | Third-party scrolling runtime, version 1.3.11. MIT notice in `public/licenses/lenis.txt`.                                                                                                                                                                                        |

## Historical assets and reference

The former trophy, arena, reasoning assembly, word-wall opening, canvas particle field, gameplay screenshots, and competition/reward cards are retired from the current design. Their original source or native-app assets remain in project history or the parent workspace. Do not treat those earlier assets as current website features.

[Virio](https://www.virio.ai/) supplied historical layout and motion reference. Its public scripts and styles were inspected to measure behavior. Its proprietary fonts, customer logos, imagery, and marketing copy are not website assets. The new probability surface is independently authored for KeepRI; no reference-site artwork or implementation was used for it.

## Mathematical sources and software notices

The distribution formulas were verified against [NIST’s beta-distribution reference](https://www.itl.nist.gov/div898/handbook/eda/section3/eda366h.htm). Beta–binomial conjugacy was checked against the [Book of Statistical Proofs](https://statproofbook.github.io/P/bin-prior.html). These are mathematical references, not sources for copied prose, proof text, charts or software. The log-factorial evaluator, sampling scheme, projection, camera behavior and scene are authored in this repository.

The prior is Beta(k/2, k/2); selected successes and failures update its two shape parameters. Intermediate slices use proportional accumulation of the selected counts, not a claimed historical order of observations. A shared vertical normalization is disclosed in the figure. The gold curve is the posterior; the dotted path follows the means of the slices.

`public/licenses/runtime-notices.txt` retains license/NOTICE files for 27 installed runtime/core package versions, collected by `scripts/collect-runtime-notices.mjs`. These include React, Base UI and supporting packages, shadcn components, class-variance-authority (Apache-2.0), clsx, tailwind-merge, Tailwind, Vinext, Lucide, Lenis and GSAP. The build regenerates this file. Separate DM Sans OFL and icon notices remain published.

On September 14, the [official GSAP standard license](https://gsap.com/community/standard-license/) and [SIL Open Font License guidance](https://openfontlicense.org/) were checked. Existing copyright and license notices are retained. This document records provenance and license handling, not a guarantee about exclusivity, trademark clearance or future disputes.

The dot-free wordmark in `components/wordmark.tsx` is authored text and CSS: Keep with RI highlighted by an open corner frame. The earlier sequence exercise, its code and its tests are removed from the current site.
