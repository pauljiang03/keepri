# Style lock: KeepRI

Established September 11, 2026. Source: user's Virio reference and closed-beta investor brief. This direction replaces the prior installation-focused design.

## Palette and color contract

Use only the CSS tokens in `app/globals.css`: paper #f6f3e9, surface #e9e7dc, ink #242820, olive #3c4435, muted #606556, sage #bfc6a9, on-dark #d4d8c6, clay #c06a43, line #cdcec2.

Body ink on paper 13.52:1; ink on surface 12.10:1. Muted on paper 5.41:1 and surface 4.85:1. Paper on olive 9.14:1; on-dark on olive 6.97:1; sage on olive 5.73:1. All used text pairings exceed 4.5:1. State/focus borders use current text or sage on olive. Line token is decorative only. Clay is decorative only. One authored theme, no runtime toggle.

Script roles: text=ink, bg=paper, primary=olive, accent=clay, border=line, on-primary=paper, dark-muted=on-dark.

Text-safe   (body text, links, button labels on a fill; >=4.5): text/bg, text/on-primary, text/surface, text/dark-muted, text/border, bg/primary, primary/on-primary, text/sage, surface/primary, primary/dark-muted, primary/border, primary/sage, bg/muted, on-primary/muted, surface/muted
  UI-safe     (large text, icons, and borders that convey state; >=3.0 and <4.5): muted/dark-muted, text/accent, border/muted, bg/accent, accent/on-primary, muted/sage, surface/accent
  Decorative  (below 3.0; fine as a subtle hairline, must NOT be the only thing conveying state): accent/dark-muted, primary/accent, text/muted, accent/border, accent/sage, primary/muted, bg/sage, on-primary/sage, accent/muted, text/primary, bg/border, border/on-primary, surface/sage, bg/dark-muted, on-primary/dark-muted, surface/border, dark-muted/sage, surface/dark-muted, bg/surface, surface/on-primary, border/sage, border/dark-muted, bg/on-primary

The palette was adapted from the reference's muted olive dominant pixels and source cream/clay tokens. Extraction's most-populous quantized colors omit much of the light lettering, so its inferred text pairing was not adopted. The final role assignment was verified separately above.

## Typography, shape and spacing

Keep DM Sans400/500 and existing4px spacing scale. Intro26–86px desktop,21–38px mobile; main hero104px maximum; section58px maximum. Upright type, no shadows. The enhanced intro is one100svh stage with one centered sentence visible at a time. Main content retains1264px maximum and48/32/20px gutters.

## Structure and interaction

Long-Scroll Narrative replaces the previous Poster Fold. Three H1-style statements advance one gesture at a time before a separate main site. N4 masthead adapted with section navigation and Closed beta status; F4 experience progression; native expandable research deliverables; proposed model; Ft2 footer with Back to top.

Arc: answers, effort, independent thought, mission, thesis, changing-challenge experience, research opportunity, model. Personal biography/contact and game previews are removed at the owner's explicit request. Do not replace them with invented proof.

## Motion

GSAP3.15.0 is the single engine, using ScrollTrigger for main-page effects and ScrollToPlugin for the final handoff. Intro sentences move as a whole: a480ms outgoing fade overlaps a680ms incoming fade by280ms. The complete transition takes880ms. Per-word masks and perspective rotation are removed to avoid a stop-start appearance. The chapter line takes900ms. Decision paths draw over1s to show exploration, feedback and revision; the one-way handoff takes1s. The owner explicitly requested smoother, more expressive marketing effects. The longer progress-line duration is an intentional marketing-motion audit exception. One wheel burst or touch swipe advances once, including momentum that continues beyond the animation. Native page scrolling resumes at the main site. Completing or skipping the intro removes it from layout; it cannot be revisited by scrolling up. Reduced motion uses instant changes and handoff. Without JavaScript, native sections remain readable. Cleanup removes listeners and effects.

## Assets

The original brand icon is joined by labeled decision-path illustrations. Branches show possible approaches; the trial path ends in feedback; a revised route reaches a strategy; a return loop reaches a new question. The hero uses Question → Attempt → Feedback → Understanding. The experience illustration responds to scroll position and four native buttons, including under reduced motion with instant updates.

Every graphic must explain independent reasoning, learning through play, mastery, or the proposed consented-research model. Remove unrelated decorative shapes and pointer parallax. The owner rejected the abstract contour sculptures. Specific games, native captures and personal details remain excluded. Illustrations are labeled as conceptual learning processes, without invented results.

## Taste memory

The owner confirmed the interactive entrance direction and rejected personal details and specific game content. These are recorded in the project decision log. The implemented three-chapter sequence is pending review. No personal profile preference is promoted.

## Do not

Publish individual identity, biography, academic details, direct personal contact, named games, or game captures. Add installation links, release dates, invented metrics, investor backing, institutional endorsement, or a research-enrollment claim. Extend the entrance gesture control into the main site, remove the skip control, or hide the site until a timer ends.
