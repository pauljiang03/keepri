import { ArrowDown } from 'lucide-react';
import { Wordmark } from './wordmark';
import { MotionToggle } from './hero';
import type { ReactNode } from 'react';

const questions = [
  {
    title: 'Independent judgment',
    text: 'Essential to a society shaped by AI. AI should inform that judgment without replacing it.',
  },
  {
    title: 'Learning through challenge',
    text: 'Test ideas, assess alternatives and revise decisions.',
  },
  {
    title: 'Global competition',
    text: 'Global leaderboards and significant prizes for learning and competition. Funded cash-prize events are in development.',
  },
  {
    title: 'Human learning data',
    text: 'AI research needs more data on how people learn and exercise judgment.',
  },
  {
    title: 'Participant choice',
    text: 'Free practice requires no research participation. Cash-prize entrants would agree to research collection and commercial use.',
  },
  {
    title: 'Our model',
    text: 'AI teams would license human learning data and commission targeted collections.',
  },
];

function Page({
  id,
  label,
  className = '',
  children,
}: {
  id: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-page={id}
      className={`book-page ${className}`}
      tabIndex={-1}
      aria-label={label}
    >
      <div className="page-inner">{children}</div>
    </section>
  );
}
function Workflow() {
  return (
    <figure className="compact-model" aria-labelledby="model-title">
      <figcaption>
        <h2 id="model-title">How KeepRI would work</h2>
        <span>Planned model</span>
      </figcaption>
      <div className="compact-diagram">
        <div className="flow-box flow-start">
          <strong>Play different games.</strong>
          <span>Free practice. New weekly challenges.</span>
        </div>
        <div className="flow-paths">
          {[
            {
              title: 'Competition',
              nodes: ['Leaderboards', 'Cash-prize entry', 'Verified awards'],
            },
            {
              title: 'Prize-play research',
              nodes: [
                'Prize-entry agreement',
                'Learning records',
                'AI teams pay',
              ],
            },
          ].map((path) => (
            <div className="flow-path" key={path.title}>
              <ArrowDown size={14} aria-hidden="true" />
              <h3>{path.title}</h3>
              {path.nodes.map((node, i) => (
                <div className="flow-step" key={node}>
                  <div className="flow-box">{node}</div>
                  {i < 2 && <ArrowDown size={12} aria-hidden="true" />}
                </div>
              ))}
              <ArrowDown size={14} aria-hidden="true" />
            </div>
          ))}
        </div>
        <div className="flow-box flow-fund">
          <strong>Fund the next round.</strong>
          <span>Free access, new games and significant prizes.</span>
        </div>
        <p className="flow-consent">
          Cash-prize entry requires research agreement. Free practice stays
          separate.
        </p>
      </div>
    </figure>
  );
}
export function BookPages() {
  return (
    <>
      <Page id="site" label="KeepRI" className="hero-layer page-home page-dark">
        <div className="home-message">
          <h1 id="hero-title">
            Independent thought.
            <br />
            <span>In the age of AI.</span>
          </h1>
          <p>
            KeepRI brings learning and competition together to strengthen
            independent judgment.
          </p>
          <a href="#thesis">Our philosophies ↗</a>
        </div>
        <Workflow />
      </Page>
      <Page id="funding" label="Research and funding" className="page-dark">
        <div className="page-copy bordered-copy">
          <span className="page-eyebrow">The planned model</span>
          <h2>Research &amp; funding</h2>
          <p className="page-statement">
            Free practice requires no research participation.
          </p>
          <p>
            Cash-prize entry would require agreement to research data collection
            and commercial use.
          </p>
          <p>
            AI teams would commission studies and license quality-checked
            learning records, game environments and human evaluations. Their
            questions would guide new games.
          </p>
        </div>
      </Page>
      <Page
        id="funding-model"
        label="Funding the next round"
        className="page-dark"
      >
        <div className="page-copy bordered-copy">
          <span className="page-eyebrow">The planned model</span>
          <h2>Fund the next round.</h2>
          <p className="page-statement">
            Initial funding and event sponsorship would support early
            competitions.
          </p>
          <p>
            Research revenue would fund free access, new games, operations and
            prizes.
          </p>
          <p>
            Identity and prize-payment details would stay separate from research
            deliveries. Research enrollment is not active. Cash-prize events are
            in development.
          </p>
        </div>
      </Page>
      <Page
        id="thesis"
        label="Philosophy"
        className="page-philosophy page-collected"
      >
        <div className="collected-content">
          <header className="collected-heading">
            <span className="page-eyebrow">Keep Reasoning Independently</span>
            <h2>Our philosophies.</h2>
          </header>
          <div className="philosophy-grid">
            {questions.map((q, i) => (
              <article key={q.title}>
                <span className="principle-number" aria-hidden="true">
                  0{i + 1}
                </span>
                <div>
                  <h3>{q.title}</h3>{' '}
                  <p>{q.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Page>
      <Page
        id="research"
        label="Industry"
        className="page-industry page-collected"
      >
        <div className="collected-content industry-content">
          <header className="collected-heading">
            <span className="page-eyebrow">Industry / In development</span>
            <h2>
              Human learning.
              <br />
              For AI research.
            </h2>
            <p>
              We’re developing datasets that follow how people explore problems, respond to feedback and revise decisions.
            </p>
          </header>
          <div className="industry-details">
            <div className="research-offerings">
              <article>
                <h3>Executable environments</h3>
                <p>
                  Versioned rules, scoring and replay for reproducible studies.
                </p>
              </article>
              <article>
                <h3>Human learning histories</h3>
                <p>
                  Actions, feedback and outcomes across attempts, recorded with separate participant consent.
                </p>
              </article>
              <article>
                <h3>Evaluation packages</h3>
                <p>
                  Human baselines for learning and adaptation, with documented conditions and quality controls.
                </p>
              </article>
            </div>
            <p className="research-sequence">
              Attempts <span aria-hidden="true">→</span> Feedback{' '}
              <span aria-hidden="true">→</span> Revision
            </p>
          </div>
          <footer className="research-terms">
            <p>
              AI teams would license datasets and commission studies. Cash-prize entry would require research collection and commercial-use agreement; free practice stays separate.
            </p>
            <span>Research enrollment is not active in the closed beta.</span>
          </footer>
        </div>
      </Page>
      <Page id="vision" label="The vision" className="page-dark">
        <div className="page-copy">
          <span className="page-eyebrow">The vision / In development</span>
          <h2>Learning and competition.</h2>
          <div className="deliverable-grid">
            <article>
              <h3>Global leaderboards</h3>
              <p>Compete with a worldwide community.</p>
            </article>
            <article>
              <h3>Significant prizes</h3>
              <p>Rewards for learning and competition.</p>
            </article>
            <article>
              <h3>Human learning data</h3>
              <p>AI research with separate consent.</p>
            </article>
          </div>
          <footer className="page-footer">
            <a href="#site" aria-label="KeepRI home">
              <Wordmark />
            </a>
            <span>© 2026 KeepRI · Closed beta</span>
            <MotionToggle />
          </footer>
        </div>
      </Page>
    </>
  );
}
