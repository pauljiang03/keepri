# KeepRI website design

## 1. Direction

The owner selected Virio's interactive entrance: several full-screen, single-statement chapters before reaching the main website. The current direction is Long-Scroll Narrative. Personal identity, biographies, academic details, direct personal contacts, named games, and game captures are excluded at the owner's request.

## 2. Palette

Keep the established muted olive, sage and cream palette. Use `app/globals.css` tokens and the verified color contract in `.tastemaker/style-lock.md`. No new colors. The opening uses paper/sage/on-dark over olive; the main site uses ink and muted text over paper/surface.

## 3. Typography

Self-hosted DM Sans400/500, upright throughout. The entrance gives one line its own viewport:26–86px desktop and21–38px narrow screens. It can wrap under enlarged text rather than clipping. Main hero max104px. Main headings max58px. No italic display or monospace body.

## 4. Introduction

Three100svh native sections: Answers are everywhere; Understanding takes effort; Keep thinking for yourself. A sticky brand/skip row and chapter navigation orient the visitor. Each section offers a real next anchor. The final anchor enters the main site; the footer can replay the introduction.

GSAP scroll-linked entry/exit opacity and48px movement track native scrolling. There are no wheel/touch preventDefault handlers, mandatory snapping, autoplay timers, delayed entry gates, or hidden content dependencies. The current chapter is identified by IntersectionObserver. All sections are fully visible without JavaScript and under reduced motion.

## 5. Main site

Identity/status/navigation, mission hero, thesis, changing-challenge experience, research opportunity with expandable deliverables, proposed commercial model, compact footer and website-privacy disclosure. There is no specific product inventory to become stale each month.

The experience uses a scroll-progress line across Discover, Experiment, Refine, Return. It is vertical on mobile. No playable demo, fake screenshot, fabricated performance chart, or current-customer evidence is presented.

## 6. Interaction

Native details/summary disclosures for three research deliverables; keyboard and pointer activation use browser semantics. Labels remain visible while explanations expand. Existing Lucide arrows/plus icons share the established visual family. The website-privacy disclosure is also native.

## 7. Layout and spacing

1264px content maximum;48/32/20px gutters.96–128px desktop section spacing,64px phone spacing. Existing4px scale and4px corners. At700px, main grids stack and navigation wraps into its own row; all destinations remain visible. Introduction uses stable small-viewport units to avoid toolbar-induced height changes.

## 8. Content contract

Closed beta only. Free consumer play is the mission; separately consented research, paid programs, expanded competition and rewards remain plans. Never add individual details or specific games without a new owner instruction. No installation link, signup form, analytics, or research enrollment is present. The private proposal is not published.

## 9. Accessibility and validation

Visible skip-intro control plus a keyboard skip-to-main link; real anchors with focusable landing targets; visible link/summary focus; sufficient contrast; native disclosures; reduced-motion fallback; no script-dependent visibility. See `VALIDATION.md` for executed checks and their limits.
