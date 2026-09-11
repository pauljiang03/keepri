# KeepRI reproduction design

The current user request is to reproduce Virio's layout and motion with KeepRI's branding, positioning and product visuals. This supersedes the previous three-chapter entrance, motion restraint, text-row layout and screenshot exclusion. The retired arena, trophy and assembly illustrations remain absent.

## Visual system

Keep the self-hosted DM Sans 400/500, warm paper `#f6f3e9`, dark olive `#3c4435`, ink `#242820`, sage and muted gold. Use a centered hero, regular-weight typography, restrained line work, film grain and an interactive dot field. Desktop uses 50px page gutters; small screens use 16–24px gutters. Breakpoints are 700/1024/1600px, following the reference.

The opening has a 480vh scroll region, a sticky viewport, a 207-word wall, radial scatter, colored bloom transition and hero handoff. Headlines blur/fade over 800ms and translate over 900ms every 2800ms. Lenis uses lerp .1 and native touch scrolling. Marquees move at 50px/s in the hero and 24px/s below. Their content uses KeepRI principles in place of customer logos.

Three desktop portrait cards reveal during a 110vh sticky sequence. On mobile, product cards and their explanations are stacked and fully visible. A fourth card describes the planned rewards experience. The research section stays cream with manual tabs, a visual on the left and copy on the right. The philosophy section has a sliding lead sentence, two cream desktop panels and mobile swipe cards. A cream ellipse scrolls away to reveal the olive closing section.

## Content contract

Independent thought without AI is the lead promise. Free reasoning play, learning, competition and recognition support it. KeepRI is in closed beta. Expanded competition, tournaments, funded cash prizes and research programs are in development. Product screenshots show existing tutorial/solution experiences; future competition/rewards graphics are explicitly conceptual. No invented metrics, customer logos, testimonials, release dates, installation links, personal biographies or personal contact details.

The industry proposition is licensed human learning data and commissioned collections with separate consent. Motivated effort is a thesis, not an established data-quality result. Research enrollment is not active. Free play and future prize eligibility remain independent of research participation.

## Interaction and accessibility

Native anchors, accessible Base UI tabs and native details/summary disclosures. Mobile menu supports Escape and restores toggle focus. Vertical tabs receive vertical orientation. Heading text has a stable accessible name while decorative rotating variants are hidden. Reduced-motion preference skips the opening, uses static particles, removes continuous loops and keeps all product text visible. Dynamic preference changes are handled. Without JavaScript, the hero and content remain readable; noscript sections include inactive industry/FAQ content.

See MOTION-VERIFICATION.md for measurements, observations and remaining differences. This is a reference adaptation, not a claim of pixel-identical reproduction.
