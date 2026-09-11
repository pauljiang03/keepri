import { gsap } from 'gsap';
import { assemblyPosition, assemblyTransform } from './assembly-geometry';

export function animateAssembly(
  element: Element,
  stage: number,
  animate = true,
) {
  element.setAttribute('data-stage', String(stage));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = animate && !reduced ? 1.1 : 0;
  const timeline = gsap.timeline({
    defaults: { duration, ease: 'power3.inOut' },
  });
  element.querySelectorAll<SVGElement>('[data-piece]').forEach((piece) => {
    const index = Number(piece.dataset.piece);
    const current = {
      x: Number(piece.dataset.x),
      y: Number(piece.dataset.y),
      rotation: Number(piece.dataset.rotation),
    };
    timeline.to(
      current,
      {
        ...assemblyPosition(index, stage),
        onUpdate: () => {
          piece.setAttribute('transform', assemblyTransform(index, current));
          piece.dataset.x = String(current.x);
          piece.dataset.y = String(current.y);
          piece.dataset.rotation = String(current.rotation);
        },
      },
      duration ? (index === 4 ? 0.08 : index * 0.018) : 0,
    );
  });
  timeline.to(
    element.querySelector('.assembly-complete'),
    { opacity: stage === 2 ? 1 : 0, duration: duration * 0.3 },
    duration * 0.8,
  );
  return timeline;
}
