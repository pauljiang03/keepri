'use client';

import { useEffect, useRef } from 'react';

type Vector = [number, number, number];
const TAU = Math.PI * 2;
const rings = Array.from({ length: 7 }, (_, i) => (i * Math.PI) / 7);
function project([x, y, z]: Vector, yaw: number, pitch: number) {
  const dx = x * Math.cos(yaw) + z * Math.sin(yaw);
  const dz = -x * Math.sin(yaw) + z * Math.cos(yaw);
  const dy = y * Math.cos(pitch) - dz * Math.sin(pitch);
  const depth = y * Math.sin(pitch) + dz * Math.cos(pitch);
  const scale = 760 / (760 - depth);
  return { x: 300 + dx * scale, y: 300 + dy * scale, depth, scale };
}
function orbit(angle: number, tilt: number): Vector {
  return [
    210 * Math.cos(angle),
    210 * Math.sin(angle) * Math.cos(tilt),
    210 * Math.sin(angle) * Math.sin(tilt),
  ];
}
function ringPath(tilt: number, yaw = 0.4, pitch = -0.25) {
  return (
    Array.from({ length: 97 }, (_, i) => {
      const point = project(orbit((i / 96) * TAU, tilt), yaw, pitch);
      return `${i === 0 ? 'M' : 'L'}${point.x.toFixed(2)},${point.y.toFixed(2)}`;
    }).join(' ') + 'Z'
  );
}

export function HeroVisual() {
  const visual = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = visual.current!;
    const root = document.documentElement;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const paths = [
      ...element.querySelectorAll<SVGPathElement>('.orbital-meridian'),
    ];
    const nodes = [...element.querySelectorAll<SVGGElement>('.orbital-node')];
    let visible = false;
    let frame = 0;
    let running = false;
    let previous = 0;
    let elapsed = 0;
    let pointerX = 0;
    let pointerY = 0;
    let lookX = 0;
    let lookY = 0;
    const draw = (time: number) => {
      if (!running) return;
      const delta = previous ? Math.min(40, time - previous) : 16;
      previous = time;
      elapsed += delta;
      const damp = 1 - Math.exp(-delta / 180);
      lookX += (pointerX - lookX) * damp;
      lookY += (pointerY - lookY) * damp;
      const yaw = 0.4 + elapsed * 0.000055 + lookX * 0.35;
      const pitch = -0.25 + lookY * 0.25;
      paths.forEach((path, i) => {
        path.setAttribute('d', ringPath(rings[i], yaw, pitch));
      });
      nodes.forEach((node, i) => {
        const point = project(
          orbit(
            elapsed * 0.00022 * (i % 2 ? -1 : 1) + (i * TAU) / 3,
            rings[i * 2],
          ),
          yaw,
          pitch,
        );
        node.setAttribute(
          'transform',
          `translate(${point.x},${point.y}) scale(${point.scale})`,
        );
        node.style.opacity = String(0.45 + ((point.depth + 210) / 420) * 0.55);
      });
      element.style.setProperty('--light-x', `${50 + lookX * 22}%`);
      element.style.setProperty('--light-y', `${50 + lookY * 22}%`);
      frame = requestAnimationFrame(draw);
    };
    const update = () => {
      const next =
        visible &&
        !document.hidden &&
        !preference.matches &&
        root.dataset.intro !== 'active' &&
        root.dataset.motion !== 'paused';
      if (next === running) return;
      running = next;
      element.dataset.animated = String(next);
      cancelAnimationFrame(frame);
      previous = 0;
      if (next) frame = requestAnimationFrame(draw);
    };
    const pointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const box = element.getBoundingClientRect();
      pointerX = ((event.clientX - box.left) / box.width) * 2 - 1;
      pointerY = ((event.clientY - box.top) / box.height) * 2 - 1;
    };
    const reset = () => {
      pointerX = 0;
      pointerY = 0;
    };
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    const observer = new MutationObserver(update);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-intro', 'data-motion'],
    });
    intersection.observe(element);
    element.addEventListener('pointermove', pointer);
    element.addEventListener('pointerleave', reset);
    document.addEventListener('visibilitychange', update);
    preference.addEventListener('change', update);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      intersection.disconnect();
      observer.disconnect();
      element.removeEventListener('pointermove', pointer);
      element.removeEventListener('pointerleave', reset);
      document.removeEventListener('visibilitychange', update);
      preference.removeEventListener('change', update);
    };
  }, []);
  return (
    <div className="hero-visual" ref={visual} aria-hidden="true">
      <div className="orbital-aura" />
      <svg viewBox="0 0 600 600" fill="none">
        <defs>
          <radialGradient id="orbital-core">
            <stop offset="0" stopColor="#354333" />
            <stop offset="1" stopColor="#1e291f" />
          </radialGradient>
          <linearGradient id="orbital-line" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#edf0da" stopOpacity="0.65" />
            <stop offset="0.45" stopColor="#bec9a6" stopOpacity="0.12" />
            <stop offset="1" stopColor="#d5b473" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <g className="orbital-calibration">
          <circle cx="300" cy="300" r="272" />
          {Array.from({ length: 72 }, (_, i) => (
            <path
              key={i}
              d={`M300 ${i % 6 === 0 ? 21 : 26}V${i % 6 === 0 ? 37 : 31}`}
              transform={`rotate(${i * 5} 300 300)`}
            />
          ))}
          <path d="M300 52v30M300 518v30M52 300h30M518 300h30" />
        </g>
        <g className="orbital-grid">
          {rings.map((tilt) => (
            <path className="orbital-meridian" d={ringPath(tilt)} key={tilt} />
          ))}
        </g>
        <circle
          className="orbital-center"
          cx="300"
          cy="300"
          r="79"
          fill="url(#orbital-core)"
        />
        <circle
          cx="300"
          cy="300"
          r="88"
          stroke="#bdc7a1"
          strokeOpacity="0.18"
          strokeDasharray="1 7"
        />
        <text className="orbital-monogram" x="294" y="328" textAnchor="middle">
          RI
        </text>
        {[0, 1, 2].map((i) => {
          const point = project(orbit((i * TAU) / 3, rings[i * 2]), 0.4, -0.25);
          return (
            <g
              className={`orbital-node orbital-node-${i}`}
              key={i}
              transform={`translate(${point.x},${point.y})`}
            >
              <circle r="12" className="orbital-node-halo" />
              <circle r="4.5" />
            </g>
          );
        })}
      </svg>
      <span className="orbital-label orbital-label-top">01 / Question</span>
      <span className="orbital-label orbital-label-right">02 / Test</span>
      <span className="orbital-label orbital-label-bottom">
        03 / Reconsider
      </span>
    </div>
  );
}
