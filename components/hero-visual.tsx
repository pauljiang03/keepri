'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, RotateCcw, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  acceptsSequence,
  hypotheses,
  parseSequence,
  remainingHypotheses,
  type Sequence,
} from '@/lib/reasoning-challenge';

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
  const firstInput = useRef<HTMLInputElement>(null);
  const [fields, setFields] = useState(['', '', '']);
  const [remaining, setRemaining] = useState([true, true, true]);
  const [attempts, setAttempts] = useState<
    { sequence: Sequence; accepted: boolean }[]
  >([]);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [solved, setSolved] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const activeRules = remaining.filter(Boolean).length;
  function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const sequence = parseSequence(fields);
    if (!sequence) {
      setError('Enter three whole numbers between −999 and 999.');
      return;
    }
    const accepted = acceptsSequence(sequence);
    const next = remainingHypotheses(remaining, sequence);
    setRemaining(next);
    setAttempts((current) => [...current.slice(-3), { sequence, accepted }]);
    setError('');
    setFeedback(
      `${sequence.join(', ')} ${accepted ? 'fits' : 'does not fit'} the rule. ${next.filter(Boolean).length} possible ${next.filter(Boolean).length === 1 ? 'rule remains' : 'rules remain'}.`,
    );
  }
  function chooseRule(index: number) {
    setGuessCount((count) => count + 1);
    if (index === 2) {
      setSolved(true);
      setRemaining([false, false, true]);
      setFeedback(
        'Correct. Each number must be greater than the one before it. Neither even numbers nor equal steps are required.',
      );
    } else {
      setFeedback(
        index === 0
          ? 'Not quite. Test a sequence containing odd numbers.'
          : 'Not quite. Test a sequence with unequal steps.',
      );
    }
  }
  function restart() {
    setFields(['', '', '']);
    setRemaining([true, true, true]);
    setAttempts([]);
    setFeedback('');
    setError('');
    setSolved(false);
    setGuessCount(0);
    firstInput.current?.focus();
  }
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
        if (path.dataset.eliminated === 'true') return;
        path.setAttribute('d', ringPath(rings[i], yaw, pitch));
      });
      nodes.forEach((node, i) => {
        if (node.dataset.eliminated === 'true') return;
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
    <div
      className="hero-visual reasoning-instrument"
      ref={visual}
      data-solved={solved}
    >
      <div className="challenge-heading">
        <span className="challenge-kicker">Try it / Independent reasoning</span>
        <h2 id="challenge-title">Find the rule.</h2>
        <p>
          A hidden rule accepts <strong>2, 4, 6</strong>. Test a sequence, then
          choose a rule.
        </p>
      </div>
      <div className="orbital-stage">
        <div className="orbital-aura" aria-hidden="true" />
        <svg viewBox="0 0 600 600" fill="none" aria-hidden="true">
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
            {rings.map((tilt, i) => (
              <path
                className="orbital-meridian"
                data-eliminated={!remaining[i % 3]}
                d={ringPath(tilt)}
                key={tilt}
              />
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
          <text
            className="orbital-monogram"
            x="294"
            y="315"
            textAnchor="middle"
          >
            RI
          </text>
          <text
            className="orbital-evidence"
            x="300"
            y="345"
            textAnchor="middle"
          >
            {solved
              ? 'RULE FOUND'
              : `${activeRules} POSSIBLE ${activeRules === 1 ? 'RULE' : 'RULES'}`}
          </text>
          {[0, 1, 2].map((i) => {
            const point = project(
              orbit((i * TAU) / 3, rings[i * 2]),
              0.4,
              -0.25,
            );
            return (
              <g
                className={`orbital-node orbital-node-${i}`}
                data-eliminated={!remaining[i]}
                key={i}
                transform={`translate(${point.x},${point.y})`}
              >
                <circle r="12" className="orbital-node-halo" />
                <circle r="4.5" />
              </g>
            );
          })}
        </svg>
        {hypotheses.map((hypothesis, i) => (
          <Button
            key={hypothesis.label}
            type="button"
            variant="ghost"
            className={`orbital-label ${['orbital-label-top', 'orbital-label-right', 'orbital-label-bottom'][i]}`}
            data-eliminated={!remaining[i]}
            disabled={!remaining[i] || solved}
            onClick={() => chooseRule(i)}
            aria-label={`${hypothesis.label}${remaining[i] ? ': choose this rule' : ': ruled out by your tests'}`}
          >
            <span>{hypothesis.label}</span>
            {!remaining[i] ? (
              <X size={14} />
            ) : solved && i === 2 ? (
              <Check size={14} />
            ) : (
              <ArrowRight size={14} />
            )}
          </Button>
        ))}
      </div>
      <form
        className="sequence-form"
        onSubmit={submit}
        aria-labelledby="challenge-title"
      >
        <label id="sequence-label" htmlFor="sequence-0">
          Test a sequence
        </label>
        <div className="sequence-inputs">
          {fields.map((value, i) => (
            <Input
              key={i}
              id={`sequence-${i}`}
              ref={i === 0 ? firstInput : undefined}
              aria-label={`${['First', 'Second', 'Third'][i]} number`}
              aria-describedby={error ? 'sequence-error' : 'sequence-label'}
              aria-invalid={Boolean(error)}
              inputMode="text"
              autoComplete="off"
              maxLength={4}
              placeholder={String([2, 4, 6][i])}
              value={value}
              onChange={(event) =>
                setFields((current) =>
                  current.map((field, index) =>
                    index === i ? event.target.value : field,
                  ),
                )
              }
            />
          ))}
          <Button type="submit" className="sequence-submit">
            Test <ArrowRight size={16} />
          </Button>
        </div>
        {error && (
          <p className="sequence-error" id="sequence-error" role="alert">
            {error}
          </p>
        )}
      </form>
      <div className="challenge-results" aria-live="polite" aria-atomic="true">
        <p key={`${attempts.length}-${guessCount}-${feedback}`}>
          {feedback || 'Which test could rule out an explanation?'}
        </p>
      </div>
      {attempts.length > 0 && (
        <ol className="sequence-history" aria-label="Recent tests">
          {attempts.map((attempt, i) => (
            <li key={i} data-accepted={attempt.accepted}>
              <span>{attempt.sequence.join(', ')}</span>
              <span>
                {attempt.accepted ? <Check size={12} /> : <X size={12} />}
                {attempt.accepted ? 'Fits' : 'Does not fit'}
              </span>
            </li>
          ))}
        </ol>
      )}
      {(attempts.length > 0 || guessCount > 0) && (
        <Button variant="ghost" className="challenge-reset" onClick={restart}>
          <RotateCcw size={13} />
          Start again
        </Button>
      )}
      <noscript>
        <p className="challenge-noscript">
          The rule is any three increasing numbers. Odd numbers and unequal
          steps can help distinguish it from the other explanations. Enable
          JavaScript to test sequences.
        </p>
      </noscript>
    </div>
  );
}
