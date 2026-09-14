# KeepRI website design

The latest September 14 direction keeps the three-section site and its established identity, with a diagonal page-peel opening, a larger orbital instrument, stronger typography and concise mission-led copy.

## Visual system

Self-hosted DM Sans 400/500, warm paper #f6f3e9, ink #242820, deep greens, sage, gold and clay. Fine rules, subtle grain and a restrained coordinate grid connect the opening to the main page.

The desktop hero pairs left-aligned text with a large perspective-projected orbital SVG. Seven meridians rotate around RI; three points move through depth. Pointer input changes the viewing angle with damping. A numbered three-column vision row names global leaderboards, significant prizes and human learning data under an explicit development label. Mobile stacks text, artwork and two-column vision rows in natural flow.

The original constellation is a fixed cover over the page, not a scroll section. The constellation animates and waits for entry. Only Peel to enter, downward scroll, upward swipe or keyboard entry starts the 1.65-second diagonal peel. Skip intro and Escape dismiss it. Completion hides the cover permanently until the next document load. Hash links also get the intro and resolve afterward. The header wordmark returns to the main-page top without replaying it. Reduced motion waits on a still cover; preference and visibility changes never initiate entry.

The orbital graphic now supports a rule-discovery challenge. Users test sequences and choose between three explanations. Results dim and freeze explanations contradicted by evidence. A correct choice reveals the increasing-order rule. The exercise runs entirely in memory, with no server or persistence. Keep controls stationary; apply parallax only to the drawing. The type-only KeepRI signature uses an open corner beneath RI, without a dot. Reuse the Wordmark component across the intro, header, footer and philosophy panels.

The main headline is “Independent thought. In the age of AI.” Remove the repeated expansion above it. Headline and supporting paragraph share one left alignment. Preserve the September 11 philosophy and industry prose, restored at the owner's request.

Philosophies pair numbered desktop tabs with a larger answer panel; smaller screens use swipe cards. Industry uses a proposed research diagram, native disclosures and staged entrances. Header links indicate the current section. The footer retains Back to top and Pause motion.

Use “For Industry” in the header only. The section label remains “For industry”.

## Content contract

Lead with the societal need for independent judgment: assessing evidence, questioning AI recommendations, and taking responsibility for decisions. AI may inform judgment without replacing it. Learning challenges and competition provide a place to practice.

Global leaderboards and significant prizes are central to the planned player experience. KeepRI remains in closed beta. Public leaderboards, tournaments, funded cash-prize events, and research are in development; do not imply they are operational.

Explain the need for more human learning data and the proposed study of attempts, feedback, assistance, and revisions. AI teams would license separately consented datasets and commission targeted collections for training and evaluation. Research revenue would support free access, new challenges, and significant prizes. These are plans and hypotheses, not established revenue or data-quality results.

Research enrollment is inactive. Free play and future prize eligibility remain independent of participation. Use concise, professional language and no em dashes. Exclude game screenshots, personal biographies/contact details, installation links, release dates, invented metrics/testimonials, active prize offers, and reference-site logos or copy.

## Motion and accessibility

The stable headline carries the mission without animation. Orbital projection uses direct SVG updates, with no React renders per frame, and a single requestAnimationFrame loop. It stops offscreen, in hidden tabs, during the intro, under reduced motion and when paused. GSAP owns the intro and section entrances; Lenis smooths wheel scrolling and preserves native touch scrolling after entry.

Reduced motion retains a still opening until the visitor enters. Runtime preference changes never initiate or replay entry. Viewport changes recompute the crease without creating scroll travel. Preserve native zoom gestures, accessible tabs, disclosures, mobile menu Escape/focus return and focusable anchor destinations. The underlying page is inert while the cover is present. No-JavaScript content is readable. Do not add storage flags or scroll-controlled reverse entry.

See [MOTION-VERIFICATION.md](MOTION-VERIFICATION.md) for automated checks and historical browser evidence.
