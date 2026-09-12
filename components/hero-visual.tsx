'use client';

import { useEffect, useRef } from 'react';

export function HeroVisual() {
  const visual = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = visual.current!;
    const root = document.documentElement;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const update = () => {
      element.dataset.animated = String(
        visible &&
          !document.hidden &&
          !preference.matches &&
          root.dataset.intro !== 'active' &&
          root.dataset.motion !== 'paused',
      );
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
    document.addEventListener('visibilitychange', update);
    preference.addEventListener('change', update);
    update();
    return () => {
      intersection.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      preference.removeEventListener('change', update);
    };
  }, []);
  return (
    <div className="hero-visual" ref={visual} aria-hidden="true">
      <svg viewBox="0 0 520 540" fill="none">
        <path
          className="instrument-corners"
          d="M30 70V40h30M460 40h30v30M490 470v30h-30M60 500H30v-30"
        />
        <g className="instrument-rings">
          <circle cx="260" cy="270" r="180" />
          <ellipse
            cx="260"
            cy="270"
            rx="180"
            ry="65"
            transform="rotate(-25 260 270)"
          />
          <ellipse
            cx="260"
            cy="270"
            rx="65"
            ry="180"
            transform="rotate(-25 260 270)"
          />
          <ellipse
            cx="260"
            cy="270"
            rx="65"
            ry="180"
            transform="rotate(40 260 270)"
          />
        </g>
        <circle
          className="instrument-trace trace-outer"
          cx="260"
          cy="270"
          r="180"
          pathLength="1"
        />
        <ellipse
          className="instrument-trace trace-inner"
          cx="260"
          cy="270"
          rx="65"
          ry="180"
          transform="rotate(40 260 270)"
          pathLength="1"
        />
        <circle className="instrument-core" cx="260" cy="270" r="91" />
        <text
          className="instrument-monogram"
          x="252"
          y="312"
          textAnchor="middle"
        >
          RI
        </text>
        <g className="instrument-points">
          <circle cx="260" cy="90" r="6" />
          <circle cx="416" cy="360" r="6" />
          <circle cx="104" cy="360" r="6" />
        </g>
        <g className="instrument-labels">
          <text x="260" y="67" textAnchor="middle">
            01 / OBSERVE
          </text>
          <text x="437" y="388" textAnchor="middle">
            02 / DECIDE
          </text>
          <text x="79" y="388" textAnchor="middle">
            03 / RECONSIDER
          </text>
        </g>
        <path className="instrument-axis" d="M260 458v25M248 471h24" />
      </svg>
    </div>
  );
}
