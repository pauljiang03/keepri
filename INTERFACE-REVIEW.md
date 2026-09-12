# Interface review

The current site has three sections: hero, philosophies, and industry. The hero uses an original asymmetric layout, a stable headline, and an RI orbital SVG. Its planned vision centers on global leaderboards, significant prizes, and human learning data.

The copy presents independent judgment as a societal need, including the ability to assess evidence and evaluate AI recommendations. Six principles connect learning, competition, participant choice, and the need for more human learning data. Closed beta and proposed industry offerings remain explicit. Research consent is separate from play and future prize eligibility.

Source review retains the constellation opening, reversible first-visit scrolling, and an inert hero until the reveal threshold. Returning visits, reduced motion, direct section links, and viewports no taller than 520px bypass the opening. Hidden intro cues leave keyboard focus order. Compact viewports use a natural-height hero. Orbital playback responds to visibility, reduced motion, and the footer pause control.

Current Chrome measurements at 1440 × 900, 390 × 844, and 320 × 568 found no document overflow or hero and headline content overflow. The complete vision row fit each viewport. At 320 × 568, the orbital visual is hidden. All philosophy cards reported zero content overflow. Desktop and mobile animation-clock samples confirmed running orbital traces, and pause stopped playback.

An isolated headless Chrome check at 844 × 390 confirmed that landscape skips the opening and uses a 531px natural-height hero. There was no document or content overflow, clipping, or overlap. The vision continues below the viewport through normal scrolling.

Final isolated headless Chrome checks reviewed desktop and mobile opening handoffs at 91% progress. Both revealed an interactive hero without clipping or overflow. Real wall-clock samples confirmed orbital playback after the handoff and zero animation advance when the visual was offscreen at the philosophy section.

Desktop and mobile philosophy screenshots showed the current heading, first principle, and six entries without card or document overflow. Mobile displayed `01 / 06` and navigation arrows. The opening and philosophy screenshots were visually reviewed and showed no layout issues.

The measured results are recorded in [VALIDATION.md](VALIDATION.md) and [MOTION-VERIFICATION.md](MOTION-VERIFICATION.md). Earlier Safari opening checks apply to the earlier revision. Physical touch, screen-reader, and frame-rate testing were not performed.
