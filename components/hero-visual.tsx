'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  createSurface,
  linePath,
  project,
  type Vector3,
} from '@/lib/bayesian-surface';

const base: Vector3[] = [
  [-185, 100, -145],
  [185, 100, -145],
  [185, 100, 115],
  [-185, 100, 115],
  [-185, 100, -145],
];
const defaultEvidence = { successes: 28, failures: 12, strength: 4 };

export function HeroVisual() {
  const visual = useRef<HTMLDivElement>(null);
  const [evidence, setEvidence] = useState(defaultEvidence);
  const [paused, setPaused] = useState(false);
  const surface = useMemo(
    () =>
      createSurface(evidence.successes, evidence.failures, evidence.strength),
    [evidence],
  );
  const liveSurface = useRef(surface);
  useEffect(() => {
    liveSurface.current = surface;
  }, [surface]);
  useEffect(() => {
    const element = visual.current!;
    const stage = element.querySelector<HTMLElement>('.orbital-stage')!;
    const root = document.documentElement;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const curves = [
      ...element.querySelectorAll<SVGPathElement>('.density-slice'),
    ];
    const rails = [
      ...element.querySelectorAll<SVGPathElement>('.density-rail'),
    ];
    const framePath = element.querySelector<SVGPathElement>('.density-base')!;
    const trace = element.querySelector<SVGPathElement>('.density-mean-trail')!;
    const marker = element.querySelector<SVGGElement>('.density-marker')!;
    let visible = false;
    let running = false;
    let frame = 0;
    let last = 0;
    let elapsed = 0;
    let pointerX = 0;
    let pointerY = 0;
    let lookX = 0;
    let lookY = 0;
    const draw = (time: number) => {
      if (!running) return;
      frame = requestAnimationFrame(draw);
      // Geometry is computed only when evidence changes. The camera runs at
      // 30fps, independently of React and the model's observation counts.
      if (last && time - last < 1000 / 30) return;
      const delta = last ? Math.min(time - last, 70) : 33;
      last = time;
      elapsed += delta;
      const damp = 1 - Math.exp(-delta / 220);
      lookX += (pointerX - lookX) * damp;
      lookY += (pointerY - lookY) * damp;
      const yaw = -0.48 + Math.sin(elapsed * 0.00015) * 0.1 + lookX * 0.16;
      const pitch = 0.34 + lookY * 0.12;
      const model = liveSurface.current;
      curves.forEach((path, i) =>
        path.setAttribute('d', linePath(model.curves[i], yaw, pitch)),
      );
      rails.forEach((path, i) =>
        path.setAttribute('d', linePath(model.rails[i], yaw, pitch)),
      );
      framePath.setAttribute('d', linePath(base, yaw, pitch));
      trace.setAttribute('d', linePath(model.means, yaw, pitch));
      const point = project(model.means[model.means.length - 1], yaw, pitch);
      marker.setAttribute('transform', `translate(${point.x},${point.y})`);
    };
    const update = () => {
      const next =
        visible &&
        !document.hidden &&
        !preference.matches &&
        root.dataset.intro !== 'active' &&
        root.dataset.motion !== 'paused' &&
        element.dataset.playing === 'true';
      if (next === running) return;
      running = next;
      cancelAnimationFrame(frame);
      last = 0;
      if (next) frame = requestAnimationFrame(draw);
    };
    const pointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const bounds = stage.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointerY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    };
    const resetPointer = () => {
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
    observer.observe(element, {
      attributes: true,
      attributeFilter: ['data-playing'],
    });
    intersection.observe(stage);
    stage.addEventListener('pointermove', pointer);
    stage.addEventListener('pointerleave', resetPointer);
    document.addEventListener('visibilitychange', update);
    preference.addEventListener('change', update);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      intersection.disconnect();
      observer.disconnect();
      stage.removeEventListener('pointermove', pointer);
      stage.removeEventListener('pointerleave', resetPointer);
      document.removeEventListener('visibilitychange', update);
      preference.removeEventListener('change', update);
    };
  }, []);
  const point = project(surface.means[surface.means.length - 1]);
  const controls = [
    { key: 'successes' as const, label: 'Successes', min: 0, max: 80, step: 1 },
    { key: 'failures' as const, label: 'Failures', min: 0, max: 80, step: 1 },
    {
      key: 'strength' as const,
      label: 'Prior strength',
      min: 2,
      max: 24,
      step: 2,
    },
  ];
  return (
    <div
      className="hero-visual probability-instrument"
      ref={visual}
      data-playing={!paused}
    >
      <div className="simulation-heading">
        <span className="simulation-kicker">Mathematical simulation / 01</span>
        <h2 id="simulation-title">Bayesian updating</h2>
        <p>A probability distribution reshaped by evidence.</p>
      </div>
      <figure
        className="probability-figure"
        aria-labelledby="simulation-title simulation-caption"
      >
        <div className="orbital-stage">
          <div className="probability-aura" aria-hidden="true" />
          <svg viewBox="0 0 600 440" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="density-ink" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#c7d8b0" stopOpacity="0.65" />
                <stop offset="1" stopColor="#7f9d75" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              className="density-corners"
              d="M40 80V50h30M530 50h30v30M560 355v30h-30M70 385H40v-30"
            />
            <path className="density-base" d={linePath(base)} />
            {surface.rails.map((rail, i) => (
              <path key={i} className="density-rail" d={linePath(rail)} />
            ))}
            {surface.curves.map((curve, i) => (
              <path
                key={i}
                className={`density-slice ${i === 0 ? 'density-prior' : i === surface.curves.length - 1 ? 'density-posterior' : ''}`}
                d={linePath(curve)}
              />
            ))}
            <path className="density-mean-trail" d={linePath(surface.means)} />
            <g
              className="density-marker"
              transform={`translate(${point.x},${point.y})`}
            >
              <circle r="10" fill="#d5b473" fillOpacity="0.15" />
              <circle r="3.5" fill="#f6dfaa" />
            </g>
            <text className="density-axis-label" x="43" y="420">
              θ / 0 → 1
            </text>
            <text
              className="density-axis-label"
              x="557"
              y="420"
              textAnchor="end"
            >
              Density · normalized height
            </text>
          </svg>
        </div>
        <figcaption id="simulation-caption" className="simulation-legend">
          <span>
            <i className="legend-prior" />
            Prior
          </span>
          <span>
            <i className="legend-evidence" />
            Accumulating evidence
          </span>
          <span>
            <i className="legend-posterior" />
            Posterior
          </span>
        </figcaption>
      </figure>
      <div className="simulation-controls">
        {controls.map((control) => (
          <div className="simulation-control" key={control.key}>
            <div className="simulation-control-label">
              <span id={`label-${control.key}`}>{control.label}</span>
              <output>{evidence[control.key]}</output>
            </div>
            <Slider
              aria-labelledby={`label-${control.key}`}
              value={[evidence[control.key]]}
              min={control.min}
              max={control.max}
              step={control.step}
              onValueChange={(value) =>
                setEvidence((current) => ({
                  ...current,
                  [control.key]: Array.isArray(value) ? value[0] : value,
                }))
              }
            />
          </div>
        ))}
      </div>
      <div className="simulation-readout">
        <div>
          <span>Posterior mean</span>
          <output>
            {(surface.mean * 100).toFixed(1)}
            <small>%</small>
          </output>
        </div>
        <div>
          <span>Standard deviation</span>
          <output>
            {(surface.deviation * 100).toFixed(1)}
            <small> pp</small>
          </output>
        </div>
        <div>
          <span>Observations</span>
          <output>{evidence.successes + evidence.failures}</output>
        </div>
      </div>
      <div className="simulation-actions">
        <Button
          variant="ghost"
          onClick={() => setPaused((current) => !current)}
          aria-pressed={paused}
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}
          {paused ? 'Resume rotation' : 'Pause rotation'}
        </Button>
        <Button
          variant="ghost"
          onClick={() => setEvidence(defaultEvidence)}
          aria-label="Reset simulation parameters"
        >
          <RotateCcw size={13} />
          Reset
        </Button>
      </div>
      <details className="simulation-model">
        <summary>The model</summary>
        <p>
          θ is an unknown success probability. Successes and failures update a
          symmetric beta prior. Faint curves show proportional accumulation of
          the selected evidence; the gold curve is the posterior.
        </p>
        <p className="simulation-equation">
          α = k/2 + successes · β = k/2 + failures
        </p>
        <p>
          Prior strength k sets the initial concentration around 50%. Surface
          height uses one shared scale. Standard deviation is shown in
          percentage points.
        </p>
        <a
          href="https://www.itl.nist.gov/div898/handbook/eda/section3/eda366h.htm"
          target="_blank"
          rel="noreferrer"
        >
          Beta distribution reference ↗
        </a>
      </details>
    </div>
  );
}
