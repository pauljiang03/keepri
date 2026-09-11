# KeepRI website design

## 1. Visual theme and atmosphere

A company introduction for prospective research partners, investors, and collaborators. The user selected Virio as the main visual reference and requested a polished closed-beta presentation. The new direction supersedes the earlier player-installation page.

Poster Fold: a broad typographic opening, a geometric game-piece ribbon, then a quieter company brief. The story is mission, product evidence, research opportunity, commercial model, and founder. It uses deliberate repetition in the opening and varied layouts below it.

## 2. Color palette and roles

Paper #f6f3e9; surface #e9e7dc; ink #242820; olive #3c4435; muted #606556; sage #bfc6a9; on-dark #d4d8c6; clay #c06a43; decorative line #cdcec2. The exact color contract is in `.tastemaker/style-lock.md`.

Virio's retrieved public source uses warm cream, dark ink, olive, clay, and muted teal. Its social preview uses dark olive and oversized light sans-serif text. KeepRI adapts those material and hierarchy choices toward its existing green identity. Clay is confined to decorative game pieces. It is never body text or a button fill.

## 3. Typography

DM Sans 400/500, self-hosted with its OFL license. Upright headings throughout. Hero 62–108px on desktop, 43–62px on narrow screens; line height 1.02 desktop and 1.06 mobile. Main section headings top out at 58px. Body 18px, secondary labels 12–15px. Existing Virio font files are not copied or used.

## 4. Components

Semantic anchors, real image figures, a description list for research deliverables, and a simple model diagram. The existing Lucide family supplies arrows. No new visual registry is needed for static sections; existing primitives remain available for future interactive controls. Small 4px corners; flat surfaces; no drop shadows or fake device frames.

The original native logo is reused without alteration. The main header combines its small mark with the KeepRI wordmark and a plain Closed beta status. There is no public installation, signup, or waitlist action.

## 5. Layout

1264px maximum content width; 48px desktop gutters, 32px tablet, 20px phone. Two-row masthead separates company identity/status from section navigation. The poster opening uses large left-aligned type, an offset text action, and one full-width game-piece motif.

The product figures are staggered by 64px on desktop. The screenshot window crops each unchanged 942×2048 capture to the actual board at x84/y1090, 775px square. This removes dated chrome and partial controls without redrawing product UI. The research program is a question beside concrete deliverables. The commercial model is presented separately.

## 6. Depth and materials

Muted olive and warm paper supply the material character. The geometric ribbon is a code-native brand motif based on game-piece shapes. It is not a product simulation or an illustration of a measured result. Original native game boards provide the product proof. No stock photos, third-party logos, fabricated customer evidence, or fake traction are used.

## 7. Motion and interaction

GSAP 3.15.0 with ScrollTrigger, adapted from Tastemaker's reveal convention to React lifecycle cleanup. Three short hero beats, 240ms section reveals, and one 48px scroll-linked ribbon translation. No pinning, autoplay loop, custom cursor, or intercepted scrolling. Arrow hover feedback takes 180ms and is gated to a fine pointer. Reduced-motion users get fully visible, stationary content. Static HTML remains readable without JavaScript.

## 8. Content contract

The current product is in closed beta. Competition, new game families, rewards, and research programs are plans, not delivered services. The proposed research product combines executable environments, documented human learning histories, and evaluation packages. Separate consent is required; free play and future prize eligibility remain independent of research enrollment.

Founder: Paul Jiang, Princeton PhD student working in formal methods, from the supplied proposal. No institutional endorsement, fundraising outcome, revenue, customer count, or broad cognitive-improvement claim is implied. The private proposal and internal roadmap remain outside this repository.

## 9. Responsive and accessibility behavior

At 1000px, gaps and display type step down. At 700px, narrative grids and the model flow stack; the game figures return to one baseline. All section links remain visible, without a JavaScript menu. Narrow-screen captions wrap naturally; link labels stay on one line.

Skip link, sequential headings, native keyboard navigation, immediate focus outlines, descriptive image alt text, intrinsic image dimensions, local fonts, reduced motion, and minimum 44px link hit areas. Full viewport/device acceptance is not claimed; see `VALIDATION.md` for the checks actually run.
