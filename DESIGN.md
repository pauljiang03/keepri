# KeepRI website design

## Direction

A typography-led company website for investors, prospective research partners and players. The owner rejected the custom trophy and other large illustrations as unpolished and asked to remove them. No bespoke illustrations or replacement decorative objects appear in the page. Keep the established cream, olive and sage palette, generous spacing and regular-weight typography.

Apply the owner's [Virio](https://www.virio.ai/) entrance reference and [Tastemaker](https://github.com/codeswithroh/tastemaker) direction. This refinement uses `better-layout`, `better-typography` and `better-ui` from [jakubkrehel/skills](https://github.com/jakubkrehel/skills), revision `267330e1adfc66a718fb65fa6918c1f06d0a689e`. Their emphasis on shared alignment, space before separators, descending type hierarchy and restrained motion informs the implementation. See `INTERFACE-REVIEW.md` for findings and verification limits.

## Introduction and motion

Three statements share one full-screen stage: Think for yourself. Learn without AI. Make the effort count. Each sentence sits at the center of the viewport. A wheel burst or touch swipe advances once; held navigation keys cannot repeat through chapters. Visible chapter links, Skip intro and the next-step anchor remain available.

Whole sentences translate and fade in overlapping 880ms transitions. Do not restore per-word masks or perspective rotation. A one-second handoff removes the intro from layout, making the main site the top of the page. The chapter progress line takes 900ms. These deliberate marketing timings preserve the owner's smooth staged entrance. Reduced motion makes chapter changes and the handoff instant. Without JavaScript, the three sections and native anchors form a readable linear fallback.

Main-site reveals use an 18px translation and a 750ms fade once per section. The footer uses a small 20px fade-in rather than rotation or scroll-linked scaling. Arrow and disclosure feedback lasts 150ms. There are no continuous loops, pointer parallax, sticky illustrations or custom graphic controls. GSAP remains the sole animation engine.

## Layout and typography

Self-hosted DM Sans 400/500, upright, served as WOFF2. The existing OFL font files were converted without changing glyph mappings, order or advance metrics. No font or artwork is copied from a reference site.

Use the existing 4px spacing scale, 1264px content maximum and 48/32/20px gutters. The main hero reaches 104px; section headings reach 58px; player-step headings reach 40px and remain subordinate to the section heading. Body copy uses a 1.4–1.55 line height with bounded measures. Labels remain at least 12px. Headings balance and descriptions use pretty wrapping.

The player experience is a native ordered list with four rows: Discover, Improve, Compete and Earn. Shared columns align headings and explanations; spacing separates rows without card borders. On narrow screens the number and heading share a row, with the explanation below the heading. The proposed business model uses three text groups with no boxes or connector arrows. They stack on phones with space between groups.

## Content and scope

Independent thought without AI leads the user promise. Free reasoning play makes practice enjoyable; competition, recognition and prizes reinforce it. Industry customers would license separately consented human learning data and commissioned collections. Proposed revenue supports free access, fresh challenges and meaningful prizes. Motivated effort is a research thesis, not a measured quality claim.

Public status is Closed beta. Expanded competition, tournaments, cash-prize events and research programs remain in development. Free play and future prize eligibility remain independent of research participation. Research enrollment is not active in the closed beta.

Exclude personal identity, biography, academic details, direct personal contact, named games, game screenshots, installation links, release dates, invented metrics, investor backing and the private proposal. There is no form, analytics or research upload endpoint. The removed visitor disclosure and its footer link stay absent.

## Accessibility and assets

Native anchors and three details/summary disclosures retain keyboard activation, visible focus and disclosure cues. Inactive enhanced intro chapters are inert and hidden from assistive technology. Main content remains readable without JavaScript. Reduced-motion handling covers all animated surfaces. Keep the verified text pairs in `.tastemaker/style-lock.md`; every existing text pairing exceeds 4.5:1.

The page uses a text wordmark and standard Lucide arrows/plus icons with 1.5px strokes beside regular type. The existing app icon remains as the favicon. Large bespoke illustrations are retired. Font, icon and runtime notices remain in the public output. See `ASSET-PROVENANCE.md` and `VALIDATION.md`.
