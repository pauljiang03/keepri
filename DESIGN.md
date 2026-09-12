# KeepRI website design

The latest owner direction is a shorter site with three main sections: the opening/hero, philosophies, and industry. Keep the liked hero and philosophy surfaces, remove game-specific pages and visuals, and make the intro distinctly KeepRI while retaining Virio's sense of motion. This supersedes the earlier literal reproduction and screenshot requirements.

## Visual and motion system

Self-hosted DM Sans 400/500, warm paper #f6f3e9, olive #3c4435, ink #242820, sage, gold and clay. Regular-weight typography, restrained line work, grain and an interactive dot field. Desktop gutters are 50px; small-screen gutters are 16–24px.

The opening starts with the KeepRI wordmark. Eighteen points, three rings and curved connections form a constellation. Four quiet labels appear, the points gather, and a circular olive aperture reveals the hero. No repeated word wall, radial brick explosion or successive background flashes. The opening scroll region is 280svh desktop / 240svh mobile, including the stationary hero viewport. Returning visitors and reduced-motion users go directly to the hero.

The headline changes every 2800ms, with 800ms blur/fade and 900ms vertical movement. Lenis lerp .1 smooths wheel input; touch remains native. The single hero marquee travels at 50px/s with drag/inertia and horizontal-wheel steering. It uses single words rather than repeated promotional sentences.

Philosophies retain the cream two-panel desktop tabs and mobile swipe cards. The lead sentence has a shorter, quieter scroll entrance. Industry is a direct section with a research diagram, explanatory copy and native disclosures. A compact footer replaces the extra closing section and footer marquee.

## Content contract

Independent thought without AI is the lead promise. KeepRI is in closed beta. Expanded competition, tournaments, funded cash prizes and research programs are in development. The industry proposition is proposed licensed human learning data and commissioned collections with separate participant consent. Motivated effort is a thesis, not an established data-quality result. Research enrollment is inactive. Free play and future prize eligibility remain independent of research participation.

Do not restore game screenshots, invented metrics/testimonials, active prize offers, installation links, release dates, personal biographies/contact details or reference-site logos/copy. Avoid the removed “Make the effort count,” “free reasoning games,” and “strategies of your own” slogans.

## Interaction and accessibility

Native anchors; accessible vertical Base UI tabs; native details/summary; mobile menu Escape and focus return. A stable accessible headline hides decorative rotating variants. The intro hero stays inert until revealed; hidden scroll cues leave the focus order. Reduced motion skips opening/loops, uses static particles, and handles preference changes without returning to the intro. The non-JavaScript page exposes the hero, direct industry content and all philosophy answers.

See MOTION-VERIFICATION.md for measurements and scope of browser verification.
