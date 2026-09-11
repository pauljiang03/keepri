# KeepRI website design

## 1. Direction

The owner selected Virio's interactive entrance: several full-screen, single-statement chapters before reaching the main website. The entrance presents one full-screen statement per gesture, then hands off once to the main site. Personal identity, biographies, academic details, direct personal contacts, named games, and game captures are excluded at the owner's request.

Every graphic must communicate independent reasoning, learning through play, mastery, or the proposed consented-research model. Motion should make that idea easier to follow. Abstract sculptures and unrelated decorative effects are excluded.

## 2. Palette

Keep the established muted olive, sage and cream palette. Use `app/globals.css` tokens and the verified color contract in `.tastemaker/style-lock.md`. No new colors. The opening uses paper text over olive, with sage/clay decision paths below the statement; the main site uses ink and muted text over paper/surface.

## 3. Typography

Self-hosted DM Sans400/500, upright throughout. The entrance gives one line its own viewport:26–86px desktop and21–38px narrow screens. It can wrap under enlarged text rather than clipping. Main hero max104px. Main headings max58px. No italic display or monospace body.

## 4. Introduction

Three statements share one100svh stage: Start with a question; Learn from every attempt; Find your own way through. Wheel momentum and each touch swipe are consumed after one advance; held navigation keys cannot repeat through chapters. Chapter links and a visible Skip intro remain direct controls.

Each sentence moves as one plane, blending smoothly with the next over880ms. Per-word staggering, clipping, and perspective rotation are removed. The illustration below the statement shows possible approaches, an attempted path with feedback, then a revised path toward understanding. Paths draw in sequence to explain that progression. The one-second handoff removes the intro from layout; scrolling upward stops at the main website.

Gesture control is an explicit owner requirement for this entrance. It ends when the visitor enters the site. Reduced motion preserves one-step navigation with instant changes. Without JavaScript, the three native sections and anchors remain readable as a linear fallback. Inactive enhanced scenes are inert and hidden from assistive technology; keyboard navigation and skip targets remain available.

## 5. Main site

Identity/status/navigation, mission hero, thesis, changing-challenge experience, research opportunity with expandable deliverables, proposed commercial model, oversized animated wordmark footer. There is no specific product inventory to become stale each month.

The hero traces Question → Attempt → Feedback → Understanding. Discover, Experiment, Refine and Return control a labeled learning-process illustration: explore options, encounter a failed approach, reconsider it, develop a strategy, and return to a fresh question. It responds to scrolling and four native buttons. A visible caption identifies it as an illustration of the learning process; it is not presented as an app capture or observed result. No specific game is featured.

## 6. Interaction

Native details/summary disclosures for three research deliverables; keyboard and pointer activation use browser semantics. Labels remain visible while explanations expand. Existing Lucide arrows/plus icons share the established visual family. The visitor/privacy disclosure and its footer link are removed at the owner’s request.

## 7. Layout and spacing

1264px content maximum;48/32/20px gutters.96–128px desktop section spacing,64px phone spacing. Existing4px scale and4px corners. At700px, main grids stack and navigation wraps into its own row; all destinations remain visible. Introduction uses stable small-viewport units to avoid toolbar-induced height changes.

## 8. Content contract

Closed beta only. Free consumer play is the mission; separately consented research, paid programs, expanded competition and rewards remain plans. Never add individual details or specific games without a new owner instruction. No installation link, signup form, analytics, or research enrollment is present. The private proposal is not published.

## 9. Accessibility and validation

Visible skip-intro control plus a keyboard skip-to-main link; real anchors with focusable landing targets; visible link/summary focus; sufficient contrast; native disclosures; reduced-motion fallback; readable no-JavaScript content. See `VALIDATION.md` for executed checks and their limits.
