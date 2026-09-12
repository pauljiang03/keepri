# Interface review

The current site has three sections: hero, philosophies, and industry. The hero centers a small RI orbital SVG above its stable headline, purpose statement, and link. Its planned vision centers on global leaderboards, significant prizes, and human learning data. Desktop vision columns are centered; mobile rows place headings and descriptions in two left-aligned columns.

The copy presents independent judgment as a societal need, including the ability to assess evidence and evaluate AI recommendations. Six principles connect learning, competition, participant choice, and the need for more human learning data. Closed beta and proposed industry offerings remain explicit. Research consent is separate from play and future prize eligibility.

The constellation sequence is unchanged. It replays on every normal homepage load or reload, with manual scroll restoration and a reset before Lenis starts. The header wordmark loads the homepage to replay it. Reduced motion, direct section links, and viewports no taller than 520px bypass it. Runtime preference and compact-height changes preserve position without replay. Scrolling can reverse the sequence, and the hero remains inert until its reveal threshold. Hidden intro cues leave keyboard focus order. Orbital playback responds to visibility, reduced motion, and the footer pause control.

The header label is now “For Industry”. The section label remains “For industry”. Product copy and animation sequence are unchanged.

## Current Chrome review

Thirteen isolated Chrome cases passed with zero document overflow. Desktop and mobile constellation screenshots at 30% progress and centered-hero screenshots at 91%, plus 320 × 568 and 844 × 390 layouts, were visually reviewed without layout issues. Hero client and scroll heights matched at 900, 844, 568, and 531px respectively. Headline, copy, and visible artwork were centered within 0px; the link differed by -0.01px.

An old seeded session key did not suppress the opening. Normal desktop and mobile loads, reloads after the intro or footer, and the header wordmark from a deep section began with the intro active at scroll 0. Direct `#thesis` navigation bypassed the opening and reached the section. Reduced motion bypassed the opening and disabled orbital playback. Both 91% handoffs removed the hero clip and inert state.

The header-only capitalization was verified in every case. Final type checking, build, static validation with 28 local references, targeted Oxlint, and diff checks passed. Current results are in `/private/tmp/keepri-final-review/replay/results.json`. Prior animation timing measurements remain historical.

## Previous layout review

The following checks tested the previous asymmetric hero and session-based opening behavior. They do not validate the centered layout or replay on every homepage load.

Chrome measurements at 1440 × 900, 390 × 844, and 320 × 568 found no document overflow or hero and headline content overflow. The complete vision row fit each viewport. At 320 × 568, the orbital visual was hidden. All philosophy cards reported zero content overflow. Desktop and mobile animation-clock samples confirmed running orbital traces, and pause stopped playback.

An isolated headless Chrome check at 844 × 390 confirmed that landscape skips the opening and uses a 531px natural-height hero. There was no document or content overflow, clipping, or overlap. The vision continues below the viewport through normal scrolling.

Isolated headless Chrome checks reviewed desktop and mobile opening handoffs at 91% progress. Both revealed an interactive hero without clipping or overflow. Real wall-clock samples confirmed orbital playback after the handoff and zero animation advance when the visual was offscreen at the philosophy section.

Desktop and mobile philosophy screenshots showed the heading, first principle, and six entries without card or document overflow. Mobile displayed `01 / 06` and navigation arrows. The opening and philosophy screenshots were visually reviewed and showed no layout issues.

The measured results are recorded in [VALIDATION.md](VALIDATION.md) and [MOTION-VERIFICATION.md](MOTION-VERIFICATION.md). Earlier Safari opening checks apply to the earlier revision. Physical touch, screen-reader, and frame-rate testing were not performed.
