import { gsap } from 'gsap';

export function revealReasoning(
  element: Element,
  stage: number,
  animate = true,
) {
  element.setAttribute('data-stage', String(stage));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const target =
    stage === 1
      ? '.reasoning-attempt'
      : stage === 2
        ? '.reasoning-revision'
        : stage === 3
          ? '.reasoning-return'
          : '.reasoning-options';
  const timeline = gsap.timeline();
  if (!animate || reduced) {
    return timeline
      .set(element.querySelectorAll('.reasoning-trace'), {
        strokeDashoffset: 0,
      })
      .set(
        element.querySelectorAll(
          '.reasoning-options, .reasoning-feedback, .reasoning-insight, .reasoning-return-tip',
        ),
        { clearProps: 'opacity' },
      );
  }
  if (stage === 0) {
    timeline.fromTo(
      element.querySelector(target),
      { opacity: 0.25 },
      { opacity: 1, duration: 0.7, ease: 'power2.out' },
    );
  } else {
    timeline.fromTo(
      element.querySelector(target),
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut' },
    );
    const arrival =
      stage === 1
        ? '.reasoning-feedback'
        : stage === 2
          ? '.reasoning-insight'
          : '.reasoning-return-tip';
    timeline.fromTo(
      element.querySelector(arrival),
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: 'power2.out' },
      0.65,
    );
  }
  return timeline;
}
