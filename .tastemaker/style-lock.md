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

DM Sans 400/500; upright headings, no italic emphasis. Body 18px. Hero max108px, main sections max58px. Font assets stay local; use existing OFL files. Flat surfaces, radius4px; circles reserved for game-piece motif. No shadows.

4px base unit: 4/8/12/16/24/32/48/64/96/128px. Desktop pivotal prose sections128px; standard surface sections96px; phone sections64px. Cards24–48px with equal or larger neighboring gaps. Surface shifts separate main sections. 1264px content maximum with48/32/20px gutters.

## Structure

Poster Fold with a company-brief continuation. N4 adapted two-row masthead (identity/status above section links), H1 statement fold, F5 real game captures, F6 deliverables, C3 founder contact, Ft2 compact footer with wordmark lead-in. The previous split screenshot hero and repeated signup ending are removed.

Arc: hook, thesis/stakes, product mechanism and real proof, research opportunity/deliverables, commercial model, founder/ask. Product and how-it-works merge because the simple game loop is explained beside two real examples. No fabricated social proof.

Design read: marketing narrative for investor and partner readers, Persuade mode, premium editorial lane. Dials7/3/4/7. Reference board in `.tastemaker/reference-board.md`. Structural/copy precheck passed with no prior local/global histories.

## Assets

Original icon unchanged, small in navigation and retained as favicon. Original Crossing/Lockout PNGs unchanged; CSS board crops remove dated chrome. Ribbon is code-native geometric composition, not generated raster art. Existing Lucide arrows. No photos or stock concept illustrations: thesis/founder are intentionally text-led.

## Motion

GSAP3.15.0, ScrollTrigger; one engine. Adapted Tastemaker reveal pattern with240ms power3.out,8–12px movement;180ms pointer-gated arrow feedback. Ribbon scrub48px. No pinned sections or loops. Reduced-motion branch skips all GSAP motion and disables smooth scrolling/arrow transforms. Cleanup via matchMedia.revert(). The static page starts fully visible.

## Taste memory

No personal profile existed. Current user explicitly rejected the earlier generic-looking treatment and requested Virio. `.tastemaker/decisions.log` captures those directions; this concrete implementation is pending review. No preference is promoted to a personal profile. Cross-project structure/copy entries record only the pending build.

## Do not

Add public beta installation/signup links or release dates. Add invented traction, investor backing, or university endorsement. Claim research collections, prize events, or measured cognitive benefits already exist. Publish the private proposal. Copy Virio's brand, wording, fonts or proprietary artwork. Repeat serif-italic emphasis, pill labels, generic feature cards, or floating phone mockups.
