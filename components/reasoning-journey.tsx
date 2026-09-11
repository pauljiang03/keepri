'use client';

import { useEffect, useRef, useState } from 'react';
import { CompetitionArena } from '@/components/competition-arena';
import { animateArena } from '@/lib/arena-motion';

const stages = [
  {
    name: 'Discover',
    title: 'Curiosity gets you started.',
    description:
      'Free reasoning games invite you to explore a problem using your own judgment, without AI answers.',
  },
  {
    name: 'Improve',
    title: 'Understanding you build yourself.',
    description:
      'Test your ideas, learn from feedback, and develop a strategy. The progress is yours.',
  },
  {
    name: 'Compete',
    title: 'Give your best thinking a stage.',
    description:
      'Shared challenges, rankings, and planned tournaments give players a reason to bring their best.',
  },
  {
    name: 'Earn',
    title: 'Play for something that matters.',
    description:
      'Recognition, rivalry, and planned cash-prize events make mastery something to pursue together.',
  },
];

export function ReasoningJourney() {
  const [stage, setStage] = useState(0);
  const diagram = useRef<HTMLDivElement>(null);
  const animation = useRef<ReturnType<typeof animateArena> | null>(null);
  useEffect(() => {
    const steps = Array.from(
      document.querySelectorAll<HTMLElement>('.thinking-step'),
    );
    const narrow = window.matchMedia('(max-width: 700px)');
    let observer: IntersectionObserver;
    const observe = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(
        (entries) => {
          const current = entries.find((entry) => entry.isIntersecting);
          if (current) setStage(steps.indexOf(current.target as HTMLElement));
        },
        // On phones, read the narrative below the pinned illustration.
        {
          rootMargin: narrow.matches
            ? '-72% 0px -15% 0px'
            : '-55% 0px -25% 0px',
          threshold: 0,
        },
      );
      steps.forEach((step) => observer.observe(step));
    };
    observe();
    narrow.addEventListener('change', observe);
    return () => {
      observer.disconnect();
      narrow.removeEventListener('change', observe);
    };
  }, []);
  useEffect(() => {
    const element = diagram.current?.querySelector('svg');
    if (!element) return;
    // Keep current geometry when interrupted; the next scene continues from it.
    animation.current?.kill();
    animation.current = animateArena(element, stage);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finish = () => {
      if (preference.matches) animation.current?.progress(1).pause();
    };
    preference.addEventListener('change', finish);
    document
      .querySelectorAll<HTMLElement>('.thinking-step')
      .forEach((step, index) => {
        step.dataset.active = String(stage === index);
      });
    return () => {
      animation.current?.kill();
      preference.removeEventListener('change', finish);
    };
  }, [stage]);

  return (
    <figure className="reasoning-journey">
      <div className="journey-heading">
        <p className="section-label">Independent thought, through play</p>
        <span className="journey-count">0{stage + 1} / 04</span>
      </div>
      <div className="journey-diagram" ref={diagram}>
        <CompetitionArena />
      </div>
      <fieldset className="journey-controls">
        <legend className="sr-only">Explore the player experience</legend>
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
          Concept illustration · Competition and prize programs in development.
        </span>
      </figcaption>
    </figure>
  );
}
