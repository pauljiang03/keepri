# KeepRI website design

## 1. Visual Theme & Atmosphere

An editorial invitation to independent thinking, built around the real game.

Audience: curious players first; AI research teams, potential cofounders, and pre-seed partners second. Greenfield website, preserving the app's mascot and forest/lime identity. The proposal `keepri (1).pdf` supplies the mission and planned business model; the approved native beta supplies current product facts.

Design Read: variance 7 (oversized asymmetric hero, full-width statement, open research rows); motion 3 (L1 CSS entrance and state feedback); density 4 (one idea per section); asset dependence 7 (real icon and screenshots); brand fidelity 8 (existing identity, expanded typography).

Narrative: invite → show the game → explain the mission → introduce future research → contact. Designed for laptop and phone viewing. Warm, purposeful, playful in small details. Hero copy occupies about half the desktop width; the real screenshot supplies the other half. One concrete first version based on the supplied product and proposal.

## 2. Color Palette & Roles

```css
:root {
  --forest: #153c30;
  --forest-deep: #102d24;
  --surface: #214b3b;
  --lime: #d8f7a3;
  --lime-hover: #e5ffbe;
  --paper: #f7f7ee;
  --paper-dark: #ebeee2;
  --ink: #173a2f;
  --muted: #b5c9bc;
  --muted-ink: #4e6559;
  --line: #456151;
  --line-light: #c7d0bf;
  --white: #ffffff;
  --forest-rgb: 21, 60, 48;
  --lime-rgb: 216, 247, 163;
  --shadow-rgb: 5, 20, 13;
}
```

Dark green carries identity, lime signals an action or a key idea, paper provides a quiet research surface. All color literals stay in token declarations. No gradients, glows, or text shadows.

## 3. Typography Rules

DM Sans is the confident everyday voice; Newsreader italic introduces the reflective, human voice at large scale. Fonts are self-hosted; no external font request from visitors.

Source CSS: `https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Newsreader:ital,wght@1,400&display=swap`. Use local `@font-face`, `font-display: swap`; sans fallback Helvetica/sans-serif, serif fallback Georgia/serif.

| Role | Font | Size | Weight | Line height |
| --- | --- | --- | --- | --- |
| Hero | DM Sans + Newsreader italic | clamp(72px, 8.8vw, 132px) | 600 / 400 | .99 |
| Statement | DM Sans | clamp(36px, 4.5vw, 68px) | 500 | 1.12 |
| Section | DM Sans + Newsreader | clamp(38px, 4.4vw, 64px) | 500 / 400 | 1.08 |
| Subheading | DM Sans | 22–28px | 500 | 1.2 |
| Body | DM Sans | 17–20px | 400 | 1.6 |
| Navigation | DM Sans | 14–16px | 500 | 1.4 |

Use real text, balanced headings, and pretty-wrapped paragraphs. No display Inter/Roboto. No text decoration beyond the serif change; links use underlines on hover.

## 4. Component Stylings

```css
.action { display:inline-flex; align-items:center; justify-content:center; gap:20px; min-height:56px; padding:16px 24px; border:1px solid var(--lime); border-radius:8px; background:var(--lime); color:var(--forest-deep); font-weight:600; transition:background 180ms,transform 180ms; }
.action:hover { background:var(--lime-hover); transform:translateY(-2px); }
.action:active { transform:translateY(0); }
.action:focus-visible,a:focus-visible { outline:3px solid currentColor; outline-offset:6px; }
.action:disabled,.action[aria-disabled=true] { opacity:.45; pointer-events:none; }
.text-link { display:inline-flex; align-items:center; gap:12px; min-height:44px; text-underline-offset:6px; }
.text-link:hover { text-decoration:underline; }
.text-link:active { opacity:.75; }
.nav-link { display:inline-flex; min-height:44px; align-items:center; }
.nav-link:hover { color:var(--lime); }
.status { display:inline-flex; align-items:center; gap:10px; font-size:14px; }
.research-row { display:grid; grid-template-columns:52px 1fr; gap:20px; border-top:1px solid var(--line-light); padding:28px 0; }
```

Ordinary navigation uses semantic anchors. No forms or fake submission states. The reading journey needs no added control library. Status means the actual TestFlight beta availability. Screenshots are figures, not clickable fake app controls. Contact opens the visitor's mail client; it does not silently send email.

## 5. Layout Principles

Max content width 1320px, gutters clamp(24px, 4.4vw, 72px). 8px base spacing; sections use 88–120px vertical space. Hero 1.2fr/1fr; research 1fr/1.15fr. Use open space and dividers, with one framed product composition. Research uses three horizontal numbered rows, not a feature-card grid. On small screens all narrative grids stack.

## 6. Depth & Elevation

| Level | Treatment | Use |
| --- | --- | --- |
| Flat | Dividers only | Header, research rows, footer |
| Surface | Solid lime or paper | Hero visual stage and mission band |
| Elevated | `0 32px 70px rgba(var(--shadow-rgb), .25)` | Actual app screenshot only |

8px action corners, 24px product stage, 32px screenshot crop. No arbitrary elevation on prose.

## 7. Animation & Interaction

L1, CSS only. Hero type rises once into view. Screenshot enters with a slight rotation that settles; nothing loops indefinitely. Hover shifts arrows a few pixels, echoing a next move. Native scrolling and anchors preserve keyboard behavior. No scroll listener, autoplay, custom cursor, or scroll hijacking.

```css
@keyframes enter { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
.enter { animation:enter 650ms cubic-bezier(.2,.7,.2,1) both; }
.action svg,.text-link svg { transition:transform 180ms ease; }
.action:hover svg,.text-link:hover svg { transform:translateX(3px); }
@media (prefers-reduced-motion:reduce) {
  *,*::before,*::after { animation:none!important; transition:none!important; scroll-behavior:auto!important; }
}
```

## 8. Do's and Don'ts

Do:
- Lead with the player's satisfaction of discovery.
- Use the supplied icon and verified app screenshots.
- Keep TestFlight access prominent and consistent.
- Distinguish current product from planned competition and research.
- Keep free play independent of research participation.
- Use the proposal's founder identity without implying university endorsement.

Don't:
- Invent customers, revenue, player counts, testimonials, or prizes.
- Promise improved IQ or general cognitive benefits.
- Present proposed pilot pricing as a purchasable service.
- Publish the full fundraising proposal by default.
- Draw a fake app screenshot or replacement logo.
- Add a waitlist without real storage and disclosures.
- Add analytics or upload local app recordings.
- Add decorative dashboards, technical controls, or animation libraries.
- Treat the old native prototype count in the proposal as current app inventory.

## 9. Responsive Behavior

| Width | Behavior |
| --- | --- |
| >1100px | Split hero, spacious section layouts |
| 761–1100px | Smaller hero type and screenshot; narrowed gaps |
| ≤760px | Stacked hero and research; navigation wraps; screenshot remains readable |
| ≤420px | 24px gutters, 72px hero text, stacked primary action details |

Every interactive target is at least 44px high. Images have intrinsic dimensions and width constraints. No content depends on hover. At 200% text zoom the layouts wrap rather than clip. Keep reading links accessible in the mobile navigation without a JS-only menu.
