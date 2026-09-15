import { ArrowDown } from 'lucide-react';
import { Wordmark } from './wordmark';
import { MotionToggle } from './hero';
import type { ReactNode } from 'react';

const questions = [
  {
    title: 'Independent judgment',
    text: 'Independent judgment is essential to a society shaped by AI.',
    more: 'People must be able to evaluate evidence, question recommendations and take responsibility for decisions. AI should inform that judgment without replacing it.',
  },
  {
    title: 'Learning through challenge',
    text: 'Learning requires people to test ideas, assess alternatives and revise their decisions.',
    more: 'KeepRI pairs challenges with feedback so players can develop their judgment without AI supplying answers.',
  },
  {
    title: 'Global competition',
    text: 'Our vision combines global leaderboards with significant prizes for learning and competition.',
    more: 'Public leaderboards, tournaments and funded cash-prize events are in development.',
  },
  {
    title: 'Human learning data',
    text: 'We believe AI research needs more data on how people learn and exercise judgment.',
    more: 'With separate consent, we plan to capture attempts, feedback and revisions to support AI training and evaluation.',
  },
  {
    title: 'Participant choice',
    text: 'Free practice remains available without research participation. Cash-prize entrants would agree to research collection and commercial use before competing.',
    more: 'The research program is in development. Research enrollment is not active in the closed beta.',
  },
  {
    title: 'Our model',
    text: 'AI teams would license human learning data and commission targeted collections.',
    more: 'Research revenue would help fund free access, new challenges and significant prizes.',
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
      {questions.map((q, i) => (
        <Page
          id={i === 0 ? 'thesis' : `principle-${i + 1}`}
          label={`Philosophies: ${q.title}`}
          className="page-philosophy"
          key={q.title}
        >
          <div className="page-copy">
            <span className="page-eyebrow">Our philosophies / {q.title}</span>
            <h2 className="page-statement">{q.text}</h2>
            <p>{q.more}</p>
          </div>
        </Page>
      ))}
      <Page id="research" label="Industry" className="page-industry">
        <div className="page-copy">
          <span className="page-eyebrow">Industry</span>
          <h2>
            Human learning.
            <br />
            For AI research.
          </h2>
          <p className="page-statement small-statement">
            How judgment develops.
          </p>
          <p>
            We’re developing human learning datasets for AI training and
            evaluation. We plan to study how motivated participants explore
            problems, respond to feedback and revise decisions.
          </p>
          <p>
            AI teams would license these datasets and commission targeted
            collections, gathered with separate participant consent.
          </p>
        </div>
      </Page>
      <Page
        id="research-deliverables"
        label="Industry: Research deliverables"
        className="page-industry"
      >
        <div className="page-copy">
          <span className="page-eyebrow">Industry / In development</span>
          <h2>Research deliverables.</h2>
          <div className="deliverable-grid">
            <article>
              <h3>Executable environments</h3>
              <p>
                Versioned rules, controlled variants, scoring and replay for
                reproducible studies.
              </p>
            </article>
            <article>
              <h3>Human learning histories</h3>
              <p>
                Actions, feedback, assistance and outcomes across attempts,
                recorded with separate consent.
              </p>
            </article>
            <article>
              <h3>Evaluation packages</h3>
              <p>
                Human baselines for learning, error recovery and adaptation,
                with documented conditions and quality controls.
              </p>
            </article>
          </div>
        </div>
      </Page>
      <Page
        id="research-process"
        label="Industry: Learning over time"
        className="page-industry"
      >
        <div className="page-copy">
          <span className="page-eyebrow">Research program in development</span>
          <h2>Learning over time.</h2>
          <ol className="learning-steps">
            <li>
              <strong>Attempts</strong>
              <span>Decisions in context.</span>
            </li>
            <li>
              <strong>Feedback</strong>
              <span>Responses to new evidence.</span>
            </li>
            <li>
              <strong>Revision</strong>
              <span>Changes across attempts.</span>
            </li>
          </ol>
          <p>
            Free practice requires no research participation. Cash-prize entry
            would require agreement to research data collection and commercial
            use.
          </p>
          <p className="page-note">
            Proposed research structure. Research enrollment is not active in
            the closed beta.
          </p>
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
