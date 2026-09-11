import { gsap } from 'gsap';
import { arenaStages, podiumFaces, trackPoint } from './arena-geometry';

export function animateArena(element: Element, stage: number, animate = true) {
  element.setAttribute('data-stage', String(stage));
  const state = arenaStages[stage];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = animate && !reduced ? 1.2 : 0;
  const timeline = gsap.timeline({
    defaults: { duration, ease: 'power2.inOut' },
  });
  timeline.to(element, { attr: { viewBox: state.viewBox } }, 0);
  const rear = element.querySelector('.arena-players-rear')!;
  const front = element.querySelector('.arena-players-front')!;
  element.querySelectorAll<SVGElement>('[data-player]').forEach((player) => {
    const index = Number(player.dataset.player);
    const position = { angle: Number(player.dataset.angle) };
    timeline.to(
      position,
      {
        angle: state.angles[index],
        onUpdate: () => {
          const point = trackPoint(position.angle, index % 3);
          player.setAttribute('transform', `translate(${point.x} ${point.y})`);
          player.dataset.angle = String(position.angle);
          const layer = point.y < 365 ? rear : front;
          if (player.parentElement !== layer) layer.appendChild(player);
        },
      },
      0,
    );
  });
  element.querySelectorAll<SVGElement>('[data-podium]').forEach((podium) => {
    const index = Number(podium.dataset.podium),
      x = Number(podium.dataset.x);
    const position = { height: Number(podium.dataset.height) };
    const left = podium.querySelector('.podium-left')!,
      right = podium.querySelector('.podium-right')!,
      top = podium.querySelector('.podium-top')!,
      inlay = podium.querySelector('.podium-inlay')!;
    timeline.to(
      position,
      {
        height: state.heights[index],
        onUpdate: () => {
          const faces = podiumFaces(x, position.height);
          left.setAttribute('points', faces.left);
          right.setAttribute('points', faces.right);
          top.setAttribute('points', faces.top);
          inlay.setAttribute(
            'transform',
            `translate(${x} ${365 - position.height})`,
          );
          podium.dataset.height = String(position.height);
          if (index === 1)
            element
              .querySelector('.arena-award-lift')!
              .setAttribute(
                'transform',
                `translate(450 ${353 - position.height})`,
              );
        },
      },
      0,
    );
  });
  timeline.to(
    element.querySelectorAll('.arena-trace'),
    { strokeDashoffset: state.trace, opacity: stage === 0 ? 0.45 : 1 },
    0,
  );
  timeline.to(
    element.querySelector('.arena-award'),
    {
      opacity: state.award,
      scale: state.award ? 1 : 0.72,
      svgOrigin: '0 0',
      duration: duration * 0.75,
      ease: 'power3.out',
    },
    duration * 0.25,
  );
  return timeline;
}
