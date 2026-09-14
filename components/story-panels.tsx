'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function ResearchPanels() {
  return (
    <section
      className="research-section"
      id="research"
      tabIndex={-1}
      aria-labelledby="research-title"
    >
      <div className="shell">
        <div className="research-top">
          <h2 id="research-title">
            Human learning.
            <br />
            For AI research.
          </h2>
          <span className="industry-label">For industry</span>
        </div>
        <div className="research-panel">
          <div className="research-panel-copy">
            <h3>
              How judgment
              <br />
              develops.
            </h3>
            <p>
              A final answer tells you little about how someone learned. We plan
              to study the attempts before it: what people tried, where they got
              stuck, and what they changed.
            </p>
            <p>
              AI teams would license these learning histories for training and
              evaluation, or commission focused collections. Both require
              separate participant consent.
            </p>
            <div className="research-accordion">
              <details name="research-deliverables">
                <summary>
                  Executable environments
                  <Plus size={20} />
                </summary>
                <div>
                  Versioned rules, controlled variants, scoring and replay for
                  reproducible studies.
                </div>
              </details>
              <details name="research-deliverables">
                <summary>
                  Human learning histories
                  <Plus size={20} />
                </summary>
                <div>
                  Actions, feedback, assistance and outcomes across attempts,
                  recorded with separate consent.
                </div>
              </details>
              <details name="research-deliverables">
                <summary>
                  Evaluation packages
                  <Plus size={20} />
                </summary>
                <div>
                  Human baselines for learning, error recovery and adaptation,
                  with documented conditions and quality controls.
                </div>
              </details>
            </div>
          </div>
          <div className="research-map">
            <span className="visual-label">
              Research program in development
            </span>
            <p>
              Learning
              <br />
              over time.
            </p>
            <ol>
              <li>
                <span>01</span>
                <strong>Attempts</strong>
                <small>Decisions in context.</small>
              </li>
              <li>
                <span>02</span>
                <strong>Feedback</strong>
                <small>Responses to new evidence.</small>
              </li>
              <li>
                <span>03</span>
                <strong>Revision</strong>
                <small>Changes across attempts.</small>
              </li>
            </ol>
            <span className="fine-print">
              Proposed research structure · Enrollment is not active.
            </span>
          </div>
        </div>
        <p className="research-consent">
          Free play and future prize eligibility remain independent of research
          participation. Research enrollment is not active in the closed beta.
        </p>
      </div>
    </section>
  );
}

const questions = [
  {
    title: 'Independent judgment',
    text: 'In a society shaped by AI, people still need to make up their own minds.',
    more: 'Assess the evidence. Question the recommendation. Take responsibility for the decision. AI should inform that judgment without replacing it.',
  },
  {
    title: 'Learning through challenge',
    text: 'Try an idea. Find out where it fails. Try something better.',
    more: 'Our challenges give you room to work things out. Feedback helps you learn from a decision; the next attempt is yours.',
  },
  {
    title: 'Global competition',
    text: 'We’re building toward global leaderboards and significant prizes.',
    more: 'A reason to keep practicing, and people to measure yourself against. Public leaderboards, tournaments and funded cash-prize events are in development.',
  },
  {
    title: 'Human learning data',
    text: 'AI research needs more data on the process of learning, not just the final answer.',
    more: 'With separate consent, we plan to record attempts, feedback and revisions so researchers can study how judgment develops.',
  },
  {
    title: 'Participant choice',
    text: 'Playing and joining a study are separate choices.',
    more: 'You can play for free and remain eligible for future prizes without joining research. The program is in development; enrollment is not active.',
  },
  {
    title: 'Our model',
    text: 'Research revenue would help keep the challenges free.',
    more: 'We plan to license consented learning data to AI teams and run commissioned studies. That revenue would support free access, new challenges and significant prizes.',
  },
];

export function Philosophy() {
  const rail = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  function move(direction: number) {
    const next = Math.max(
      0,
      Math.min(questions.length - 1, active + direction),
    );
    setActive(next);
    const target = rail.current?.children[next] as HTMLElement | undefined;
    if (!rail.current || !target) return;
    gsap.registerPlugin(ScrollToPlugin);
    gsap.to(rail.current, {
      scrollTo: {
        x:
          target.offsetLeft -
          (rail.current.firstElementChild as HTMLElement).offsetLeft,
      },
      overwrite: true,
      duration: matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 0
        : 0.5,
      ease: 'power3.out',
    });
  }
  return (
    <section
      className="philosophy-section"
      id="thesis"
      tabIndex={-1}
      aria-labelledby="thesis-title"
    >
      <div className="thesis-sentence">
        <h2 id="thesis-title">Independent judgment matters.</h2>
        <span>[ Our purpose ]</span>
      </div>
      <div className="shell philosophy-inner">
        <Tabs
          defaultValue="0"
          orientation="vertical"
          className="philosophy-desktop"
        >
          <div className="philosophy-questions">
            <h3>Our philosophies</h3>
            <TabsList aria-label="KeepRI principles">
              {questions.map((q, i) => (
                <TabsTrigger value={String(i)} key={q.title}>
                  <span className="principle-index">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {q.title}
                  <ArrowRight size={18} className="principle-arrow" />
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="philosophy-answer">
            <div className="philosophy-mark">
              Keep<span>RI</span>
            </div>
            {questions.map((q, i) => (
              <TabsContent value={String(i)} key={q.title}>
                <span className="answer-index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')} / 06
                </span>
                <p>{q.text}</p>
                <p>{q.more}</p>
              </TabsContent>
            ))}
          </div>
        </Tabs>
        <div className="philosophy-mobile">
          <section
            className="philosophy-rail"
            ref={rail}
            // The scrollable carousel needs keyboard focus for native arrow scrolling.
            // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            aria-roledescription="carousel"
            aria-label="Swipe through KeepRI principles"
            onScroll={() => {
              const el = rail.current;
              if (!el) return;
              const cards = Array.from(el.children) as HTMLElement[];
              const base = cards[0].offsetLeft;
              let nearest = 0;
              cards.forEach((card, i) => {
                if (
                  Math.abs(card.offsetLeft - base - el.scrollLeft) <
                  Math.abs(cards[nearest].offsetLeft - base - el.scrollLeft)
                )
                  nearest = i;
              });
              setActive(nearest);
            }}
          >
            {questions.map((q) => (
              <article className="philosophy-card" key={q.title}>
                <div className="philosophy-card-heading">
                  <h3>{q.title}</h3>
                  <span aria-hidden="true">KeepRI</span>
                </div>
                <p>{q.text}</p>
                <p>{q.more}</p>
              </article>
            ))}
          </section>
          <div className="philosophy-controls">
            <button
              onClick={() => move(-1)}
              disabled={active === 0}
              aria-label="Previous principle"
            >
              <ArrowLeft />
            </button>
            <span>
              {String(active + 1).padStart(2, '0')} /{' '}
              {String(questions.length).padStart(2, '0')}
            </span>
            <button
              onClick={() => move(1)}
              disabled={active === questions.length - 1}
              aria-label="Next principle"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
        <noscript>
          <div className="noscript-copy">
            {questions.slice(1).map((q) => (
              <article key={q.title}>
                <div className="philosophy-card-heading">
                  <h3>{q.title}</h3>
                  <span aria-hidden="true">KeepRI</span>
                </div>
                <p>{q.text}</p>
                <p>{q.more}</p>
              </article>
            ))}
          </div>
        </noscript>
      </div>
    </section>
  );
}
