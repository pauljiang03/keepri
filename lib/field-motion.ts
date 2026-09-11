import { gsap } from 'gsap';
import { signalPath } from './signal-shape';

export function morphSignal(field: Element, chapter: number, duration = 1.3) {
  const paths = field.querySelectorAll('.signal-thread');
  const svg = field.querySelector('svg');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return gsap
      .timeline()
      .set(paths, {
        attr: { d: (index: number) => signalPath(index, chapter) },
      });
  }
  return gsap
    .timeline()
    .to(
      paths,
      {
        attr: { d: (index: number) => signalPath(index, chapter) },
        duration,
        ease: 'power2.inOut',
      },
      0,
    )
    .to(
      svg,
      {
        rotation: [-8, 16, -5, 8][chapter],
        scale: chapter === 2 ? 1.06 : 1,
        duration,
        ease: 'power2.inOut',
        transformOrigin: '50% 50%',
      },
      0,
    );
}

export function fieldParallax(
  surface: HTMLElement,
  field: HTMLElement,
  distance = 24,
) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return () => {};
  const x = gsap.quickTo(field, 'x', { duration: 1.1, ease: 'power3.out' });
  const y = gsap.quickTo(field, 'y', { duration: 1.1, ease: 'power3.out' });
  const move = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = surface.getBoundingClientRect();
    x(((event.clientX - bounds.left) / bounds.width - 0.5) * distance * 2);
    y(((event.clientY - bounds.top) / bounds.height - 0.5) * distance * 2);
  };
  const leave = () => {
    x(0);
    y(0);
  };
  surface.addEventListener('pointermove', move);
  surface.addEventListener('pointerleave', leave);
  return () => {
    surface.removeEventListener('pointermove', move);
    surface.removeEventListener('pointerleave', leave);
    x.tween.kill();
    y.tween.kill();
    gsap.set(field, { clearProps: 'transform' });
  };
}
