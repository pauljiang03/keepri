'use client';

import { useEffect, useRef, useState } from 'react';
import { ReasoningPaths } from '@/components/reasoning-paths';
import { revealReasoning } from '@/lib/reasoning-motion';

const stages = [
  {
    name: 'Discover',
    title: 'A question. A few possible approaches.',
    description:
      'An unfamiliar challenge gives you room to explore your own ideas.',
  },
  {
    name: 'Experiment',
    title: 'An attempt gives you feedback.',
    description: 'One approach stops working. That is something to learn from.',
  },
  {
    name: 'Refine',
    title: 'Feedback changes your next move.',
    description:
      'Revisit the idea, try a different approach, and develop your own strategy.',
  },
  {
    name: 'Return',
    title: 'A new challenge. More to discover.',
    description:
      'Bring what you learned, stay curious, and begin exploring again.',
  },
];

export function ReasoningJourney() {
  const [stage, setStage] = useState(0);
  const diagram = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const steps = Array.from(
      document.querySelectorAll<HTMLElement>('.thinking-step'),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - window.innerHeight * 0.5) -
              Math.abs(b.boundingClientRect.top - window.innerHeight * 0.5),
          )[0];
        if (current) setStage(steps.indexOf(current.target as HTMLElement));
      },
      { rootMargin: '-55% 0px -25% 0px', threshold: 0 },
    );
    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const element = diagram.current?.querySelector('svg');
    if (!element) return;
    const animation = revealReasoning(element, stage);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finish = () => {
      if (preference.matches) animation.progress(1).pause();
    };
    preference.addEventListener('change', finish);
    document
      .querySelectorAll<HTMLElement>('.thinking-step')
      .forEach((step, index) => {
        step.dataset.active = String(stage === index);
      });
    return () => {
      animation.revert();
      preference.removeEventListener('change', finish);
    };
  }, [stage]);

  return (
    <figure className="reasoning-journey">
      <div className="journey-heading">
        <p className="section-label">Learning through play</p>
        <span className="journey-count">0{stage + 1} / 04</span>
      </div>
      <div className="journey-diagram" ref={diagram}>
        <ReasoningPaths stage={stage} />
        <span className="journey-label journey-question">
          {stage === 3 ? 'New question' : 'Your question'}
        </span>
        <span className="journey-label journey-idea">An idea</span>
        <span
          className="journey-label journey-feedback"
          data-visible={stage > 0}
        >
          Doesn’t fit
        </span>
        <span className="journey-label journey-revise" data-visible={stage > 1}>
          Reconsider
        </span>
        <span
          className="journey-label journey-strategy"
          data-visible={stage > 1}
        >
          Your strategy
        </span>
        <span
          className="journey-label journey-again"
          data-visible={stage === 3}
        >
          Keep exploring
        </span>
      </div>
      <fieldset className="journey-controls">
        <legend className="sr-only">Explore the learning process</legend>
        {stages.map((item, index) => (
          <button
            type="button"
            key={item.name}
            aria-pressed={stage === index}
            onClick={() => setStage(index)}
          >
            {item.name}
          </button>
        ))}
      </fieldset>
      <figcaption>
        <strong>{stages[stage].title}</strong>
        <p>{stages[stage].description}</p>
        <span className="journey-note">
          An illustration of the learning process.
        </span>
      </figcaption>
    </figure>
  );
}
