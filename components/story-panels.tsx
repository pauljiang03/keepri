'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ProductVisual } from './product-visual';

export function ResearchPanels() {
  const [tab, setTab] = useState('players');
  useEffect(() => {
    const showIndustry = () => setTab('research');
    if (location.hash === '#research') showIndustry();
    window.addEventListener('keepri:industry', showIndustry);
    return () => window.removeEventListener('keepri:industry', showIndustry);
  }, []);
  return (
    <section
      className="research-section"
      id="research"
      tabIndex={-1}
      aria-labelledby="research-title"
    >
      <div className="shell">
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(String(value))}
          className="research-tabs"
        >
          <div className="research-top">
            <h2 id="research-title">
              Human effort.
              <br />
              Lasting value.
            </h2>
            <TabsList aria-label="Explore the Keepri model">
              <TabsTrigger value="players">For players</TabsTrigger>
              <TabsTrigger value="research">For industry</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="players" className="research-panel">
            <div className="research-panel-copy">
              <span className="section-label">[ The player experience ]</span>
              <h3>
                Understanding is
                <br />
                the reward.
              </h3>
              <p>
                Work through an unfamiliar problem. Test an idea, learn from a
                mistake, and understand why your next move works.
              </p>
              <p>
                We’re building free reasoning games where you develop your own
                strategies, with competition and meaningful prizes giving you
                more reasons to return.
              </p>
              <p className="fine-print">
                Expanded competition, tournaments, and funded cash-prize events
                are in development.
              </p>
            </div>
            <div className="beta-showcase">
              <div className="preview-caption">
                <span>KeepRI</span>
                <span>Closed-beta product view</span>
              </div>
              <div className="showcase-screen">
                <ProductVisual step={1} />
              </div>
            </div>
            <div className="status-grid">
              <div>
                <strong>Closed beta</strong>
                <span>Current product status</span>
              </div>
              <div>
                <strong>Your own thinking</strong>
                <span>Practice without AI</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="research" className="research-panel">
            <div className="research-panel-copy">
              <span className="section-label">[ For industry ]</span>
              <h3>
                Human data.
                <br />
                From human effort.
              </h3>
              <p>
                We’re developing human learning datasets for AI research and
                evaluation. Our thesis is that people who care about learning
                and competing will invest real effort, creating an opportunity
                to study how strategies develop over time.
              </p>
              <p>
                AI teams would buy licensed human learning data and commissioned
                collections, gathered with separate participant consent.
              </p>
              <div className="research-accordion">
                <details name="research-deliverables">
                  <summary>
                    Executable environments
                    <Plus size={20} />
                  </summary>
                  <div>
                    Versioned rules, controlled variants, scoring, and replay.
                    Reproducible environments for studying unfamiliar problems.
                  </div>
                </details>
                <details name="research-deliverables">
                  <summary>
                    Human learning histories
                    <Plus size={20} />
                  </summary>
                  <div>
                    Actions, feedback, assistance, and outcomes in context.
                    Separately consented records that show how a strategy
                    develops across attempts.
                  </div>
                </details>
                <details name="research-deliverables">
                  <summary>
                    Evaluation packages
                    <Plus size={20} />
                  </summary>
                  <div>
                    Human baselines for learning, error recovery, and
                    adaptation, with documented conditions, quality checks, and
                    exposure controls.
                  </div>
                </details>
              </div>
            </div>
            <div className="research-map">
              <span className="visual-label">
                Research program in development
              </span>
              <p>
                Beyond the
                <br />
                final score.
              </p>
              <ol>
                <li>
                  <span>01</span>
                  <strong>Attempts</strong>
                  <small>A strategy takes shape.</small>
                </li>
                <li>
                  <span>02</span>
                  <strong>Feedback</strong>
                  <small>New evidence changes the picture.</small>
                </li>
                <li>
                  <span>03</span>
                  <strong>Revision</strong>
                  <small>Understanding develops over time.</small>
                </li>
              </ol>
              <span className="fine-print">
                Proposed research structure · Enrollment is not active.
              </span>
            </div>
          </TabsContent>
        </Tabs>
        <noscript>
          <div className="noscript-copy">
            <h3>For industry</h3>
            <p>
              We’re developing licensed human learning data and commissioned
              collections for AI research, gathered with separate participant
              consent. The research program would pair executable environments,
              human learning histories, and evaluation packages. Research
              enrollment is not active.
            </p>
          </div>
        </noscript>
      </div>
    </section>
  );
}

const questions = [
  {
    title: 'The thesis',
    text: 'As AI makes answers easier to obtain, we believe people will seek out places to exercise their own judgment.',
    more: 'KeepRI gives that practice a home. Our mission is to make independent thinking something people choose to practice, improve at, and celebrate together.',
  },
  {
    title: 'Why games?',
    text: 'Games make the effort enjoyable. An unfamiliar problem gives you a reason to experiment, learn from a mistake, and discover why a move works.',
    more: 'The satisfaction starts with figuring it out yourself. KeepRI is a place to practice independent thought without AI supplying the answer.',
  },
  {
    title: 'Why competition?',
    text: 'A shared challenge. A worthy rival. A reason to give it your all. Competition and recognition give independent practice a social dimension.',
    more: 'Expanded competition, tournaments, and funded cash-prize events are part of the product we’re building toward. These are planned features, not current prize offers.',
  },
  {
    title: 'What is available today?',
    text: 'KeepRI is in closed beta. The current player experience centers on reasoning challenges, tutorials, feedback, and reviewing solutions.',
    more: 'Public installation, expanded competition, funded prizes, and research enrollment are not offered through this website.',
  },
  {
    title: 'What would research study?',
    text: 'What does learning look like when someone really wants to get better? We plan to study attempts, feedback, and strategy changes—not just the final score.',
    more: 'The proposed research program would pair separately consented human learning histories with executable environments and evaluation packages. Controlled tasks, documented assistance, and quality checks are part of the design.',
  },
  {
    title: 'Is research optional?',
    text: 'Yes. Free play and future prize eligibility remain independent of research participation.',
    more: 'Research requires separate participant consent. The research program is in development; research enrollment is not active in the closed beta.',
  },
  {
    title: 'How would the model work?',
    text: 'Independent play brings people in. Optional, separately consented research creates human learning data for industry.',
    more: 'Revenue from data licensing and research programs would fund free access, fresh challenges, and meaningful prizes. The player experience comes first.',
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
        <h2 id="thesis-title">Independent thought is worth practicing.</h2>
        <span>[ Keep thinking for yourself ]</span>
      </div>
      <div className="shell philosophy-inner">
        <Tabs
          defaultValue="0"
          orientation="vertical"
          className="philosophy-desktop"
        >
          <div className="philosophy-questions">
            <h3>Our philosophies</h3>
            <TabsList aria-label="Questions about Keepri">
              {questions.map((q, i) => (
                <TabsTrigger value={String(i)} key={q.title}>
                  <span>[</span>
                  {q.title}
                  <span>]</span>
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
            aria-label="Swipe through questions about Keepri"
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
              aria-label="Previous question"
            >
              <ArrowLeft />
            </button>
            <span>{String(active + 1).padStart(2, '0')} / 07</span>
            <button
              onClick={() => move(1)}
              disabled={active === questions.length - 1}
              aria-label="Next question"
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
