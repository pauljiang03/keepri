# KeepRI website design

The current direction is an original three-section website: opening and hero, philosophies, and industry. The hero uses an asymmetric composition, stable headline, and RI orbital artwork. This replaces the earlier centered hero, rotating phrases, canvas particles, and marquees.

## Visual system

Use self-hosted DM Sans 400/500, warm paper #f6f3e9, ink #242820, olive #3c4435, deep green #263126, sage, gold, and clay. Regular-weight typography, fine rules, and restrained grain establish the visual language.

Desktop pairs the left-aligned headline and purpose statement with the original orbital SVG. A three-column vision row names global leaderboards, significant prizes, and human learning data beneath an explicit development label. Small screens use a compact SVG and stacked vision rows. Short mobile viewports omit the artwork to preserve space for content.

The opening retains 18 points, three rings, curved connections, four labels, and the KeepRI wordmark. The network gathers into a circular reveal. Its scroll region is 280svh above 1024px and 240svh at smaller widths. Returning visitors and reduced-motion users start at the hero. Viewports no taller than 520px also bypass the opening and use a natural-height hero to prevent landscape overlap.

Philosophies use two cream panels with vertical tabs on desktop and six swipe cards on smaller screens. Industry is a direct section with a proposed research diagram and native disclosures. The compact footer includes Back to top and Pause motion.

## Content contract

Lead with the societal need for independent judgment: assessing evidence, questioning AI recommendations, and taking responsibility for decisions. AI may inform judgment without replacing it. Learning challenges and competition provide a place to practice.

Global leaderboards and significant prizes are central to the planned player experience. KeepRI remains in closed beta. Public leaderboards, tournaments, funded cash-prize events, and research are in development; do not imply they are operational.

Explain the need for more human learning data and the proposed study of attempts, feedback, assistance, and revisions. AI teams would license separately consented datasets and commission targeted collections for training and evaluation. Research revenue would support free access, new challenges, and significant prizes. These are plans and hypotheses, not established revenue or data-quality results.

Research enrollment is inactive. Free play and future prize eligibility remain independent of participation. Use concise, professional language and no em dashes. Exclude game screenshots, personal biographies/contact details, installation links, release dates, invented metrics/testimonials, active prize offers, and reference-site logos or copy.

## Motion and accessibility

The stable hero headline carries its full meaning without animation. Two decorative SVG traces travel in opposite directions over 14s and 10s. They stop offscreen, in a hidden tab, during the opening, under reduced motion, and when paused. The opening and philosophy entrance respond to scrolling; Lenis uses lerp .1 for wheel input and native touch behavior.

Preserve accessible tabs, native disclosures, focusable anchor destinations, mobile menu Escape/focus return, and hidden intro focus controls. The hero is inert until the reveal reaches its access threshold. Motion-preference and compact-viewport changes bypass the opening while preserving content position. Without JavaScript, the hero, industry content, and philosophy answers remain readable.

See [MOTION-VERIFICATION.md](MOTION-VERIFICATION.md) for source settings and the distinction between historical evidence and current verification.
