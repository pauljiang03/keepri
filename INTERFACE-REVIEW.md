# Interface refinement review

September 11, 2026. Scope: KeepRI's introduction and public company landing page. This is an implementation review under the owner's request to remove the bespoke illustrations and apply the linked skills.

Applied domain skills: `better-layout`, `better-typography`, `better-ui`, from [jakubkrehel/skills](https://github.com/jakubkrehel/skills) at `267330e1adfc66a718fb65fa6918c1f06d0a689e`. This is not a six-domain `better-interface` audit.

Project context: React 19, Vinext/Vite static export, existing CSS tokens, self-hosted DM Sans, Lucide and GSAP. Read `DESIGN.md`, `brand-spec.md`, `README.md` and `.tastemaker/style-lock.md`. No project AGENTS.md, CLAUDE.md, CONTRIBUTING.md or CODING_STANDARDS.md was found in the website.

## Layout: group with space and align shared edges

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| Medium, fixed | `app/page.tsx:145`, `app/globals.css:386` | A sticky arena, four controls and tall scroll steps remained tied to the rejected artwork. | A native ordered list with shared heading/copy columns, 12px within mobile groups and 32px between them. All illustration components and geometry controllers removed. | Delivers the owner's deletion request and keeps related text grouped. |
| Low, fixed | `app/globals.css:526` | Five-column connector layout and boxed model nodes; mobile text groups had less separation than their internal gap. | Three unboxed groups; 32px mobile separation around 16px internal spacing. | Grouping follows the reading order without decorative connectors. |

## Typography: hierarchy, format and readable wrapping

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| Medium, fixed | `app/globals.css:407` | Player headings could reach 68px beside a section heading capped at 58px. | Player headings cap at 40px and use a shared role token. | Subordinate headings no longer overpower their parent. |
| Low, fixed | `app/fonts.css:6`, `app/fonts.css:13` | Two TTF faces totaling 96,588 bytes. | Two WOFF2 faces totaling 38,564 bytes, preserving glyph mappings, order and advance metrics. | The same face loads with roughly 60% fewer font bytes. |
| Low, fixed | `app/globals.css:455` | A multi-line research question used 1.2 line height. | 1.4 line height with its existing bounded measure. | Long wrapping remains readable on narrow screens. |

## UI: restrained feedback and icon weight

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| Low, fixed | `components/page-motion.tsx:14`, `app/globals.css:616` | Larger travel, rotating footer, redundant node scaling and 180–300ms hover/disclosure transitions. | Finite 18px reveals, a 20px footer fade, 150ms feedback and regular-text icons with 1.5px strokes. | Retains the entrance choreography while reducing repeated visual distraction. |

## Verification

- `npm run prepare:pages`: seven gesture tests, TypeScript, one static route with none skipped, 30 local asset/anchor checks, and staging passed.
- `npx oxlint app components/page-motion.tsx lib scripts`, formatting and `git diff --check` passed.
- Tastemaker anti-slop and component-coherence checks passed. Motion audit has one medium heuristic for the intentional 900ms marketing chapter line; this is documented in the design contract. No high motion finding.
- Isolated in-app Chromium browser: rendered intro, hero, player section and research disclosure inspected at 1280×720 and 320×740. No document horizontal overflow at those widths. Desktop chapter links and PageDown advanced correctly; Enter KeepRI removed the intro and placed the site at the page top. Mobile Skip intro and the native research disclosure worked. Header navigation and deep links resolved. Browser error/warning log was empty during the checked session.
- Source reviewed for hover, focus, active and reduced-motion behavior; unused illustration and control styles removed. No loading, error, empty or submission state exists on this static reading surface.
- Not verified: physical touch/trackpad gestures, frame-rate profiling, 10% speed playback, 200% browser zoom, RTL/pseudo-localization and a screen reader. Gesture unit tests verify the input gate, not physical-device motion. The isolated browser preview does not access the native Chrome window that was blocked during an earlier revision.

Verdict: **Approve for the inspected scope.** All listed findings are fixed; the unverified states above are excluded from this verdict. User design acceptance remains pending.
