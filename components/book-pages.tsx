import { ArrowDown } from 'lucide-react';
import { Wordmark } from './wordmark';
import { MotionToggle } from './hero';
import type { ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

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
function ChapterTabs({
  label,
  items,
  className = '',
}: {
  label: string;
  items: { value: string; label: string; content: ReactNode }[];
  className?: string;
}) {
  return (
    <Tabs defaultValue={items[0].value} className={`chapter-tabs ${className}`}>
      <TabsList variant="line" className="chapter-tab-list" aria-label={label}>
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="chapter-tab"
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="chapter-panel-stack">
        {items.map((item) => (
          <TabsContent
            key={item.value}
            value={item.value}
            keepMounted
            className="chapter-panel"
          >
            <div className="panel-body">{item.content}</div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
export function BookPages() {
  return (
    <>
      <Page
        id="site"
        label="KeepRI"
        className="hero-layer page-home page-dark interactive-page"
      >
        <ChapterTabs
          label="Explore KeepRI"
          items={[
            {
              value: 'overview',
              label: 'Overview',
              content: (
                <div className="home-overview">
                  <div className="home-message">
                    <h1 id="hero-title">
                      Independent thought.
                      <br />
                      <span>In the age of AI.</span>
                    </h1>
                    <p>
                      KeepRI brings learning and competition together to
                      strengthen independent judgment.
                    </p>
                    <a href="#thesis">Our philosophies ↗</a>
                  </div>
                  <Workflow />
                </div>
              ),
            },
            {
              value: 'research',
              label: 'Research',
              content: (
                <div className="panel-copy">
                  <span className="page-eyebrow">The planned model</span>
                  <h2>Research &amp; funding</h2>
                  <p className="panel-statement">
                    Free practice requires no research participation.
                  </p>
                  <p>
                    Cash-prize entry would require agreement to research data
                    collection and commercial use.
                  </p>
                  <p>
                    AI teams would commission studies and license
                    quality-checked learning records, game environments and
                    human evaluations. Their questions would guide new games.
                  </p>
                </div>
              ),
            },
            {
              value: 'funding',
              label: 'Funding',
              content: (
                <div className="panel-copy">
                  <span className="page-eyebrow">The planned model</span>
                  <h2>Fund the next round.</h2>
                  <p className="panel-statement">
                    Initial funding and event sponsorship would support early
                    competitions.
                  </p>
                  <p>
                    Research revenue would fund free access, new games,
                    operations and prizes.
                  </p>
                  <p>
                    Identity and prize-payment details would stay separate from
                    research deliveries. Research enrollment is not active.
                    Cash-prize events are in development.
                  </p>
                </div>
              ),
            },
            {
              value: 'vision',
              label: 'Vision',
              content: (
                <div className="panel-copy">
                  <span className="page-eyebrow">
                    The vision / In development
                  </span>
                  <h2>Learning and competition.</h2>
                  <p>
                    KeepRI brings learning and competition together to
                    strengthen independent judgment.
                  </p>
                  <div className="panel-cards">
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
                </div>
              ),
            },
          ]}
        />
      </Page>
      <Page
        id="thesis"
        label="Philosophy"
        className="page-philosophy interactive-page"
      >
        <header className="chapter-heading">
          <h2>Our philosophies.</h2>
          <span>Choose a principle</span>
        </header>
        <ChapterTabs
          label="Our philosophies"
          className="principle-tabs"
          items={questions.map((q, i) => ({
            value: String(i + 1),
            label: q.title,
            content: (
              <div className="panel-copy principle-copy">
                <span className="page-eyebrow">Principle 0{i + 1} / 06</span>
                <h3>{q.text}</h3>
                <p>{q.more}</p>
              </div>
            ),
          }))}
        />
      </Page>
      <Page
        id="research"
        label="Industry"
        className="page-industry interactive-page"
      >
        <ChapterTabs
          className="industry-tabs"
          label="Industry"
          items={[
            {
              value: 'overview',
              label: 'Overview',
              content: (
                <div className="panel-copy industry-intro">
                  <span className="page-eyebrow">
                    Industry / In development
                  </span>
                  <h2>
                    Human learning.
                    <br />
                    For AI research.
                  </h2>
                  <p>
                    We’re developing human learning datasets for AI training and
                    evaluation. We plan to study how motivated participants
                    explore problems, respond to feedback and revise decisions.
                  </p>
                  <p>
                    AI teams would license these datasets and commission
                    targeted collections, gathered with separate participant
                    consent.
                  </p>
                </div>
              ),
            },
            ...[
              {
                value: 'environments',
                label: 'Environments',
                title: 'Executable environments',
                text: 'Versioned rules, controlled variants, scoring and replay for reproducible studies.',
              },
              {
                value: 'histories',
                label: 'Learning data',
                title: 'Human learning histories',
                text: 'Actions, feedback, assistance and outcomes across attempts, recorded with separate participant consent.',
              },
              {
                value: 'evaluation',
                label: 'Evaluation',
                title: 'Evaluation packages',
                text: 'Human baselines for learning, error recovery and adaptation, with documented conditions and quality controls.',
              },
            ].map((item) => ({
              value: item.value,
              label: item.label,
              content: (
                <div className="panel-copy">
                  <span className="page-eyebrow">
                    Industry / Research deliverables
                  </span>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                  <p className="panel-note">In development.</p>
                </div>
              ),
            })),
            {
              value: 'process',
              label: 'Process',
              content: (
                <div className="panel-copy process-copy">
                  <span className="page-eyebrow">
                    Industry / Research not active
                  </span>
                  <h2>Learning over time.</h2>
                  <fieldset className="process-window">
                    <legend className="sr-only">Learning process</legend>
                    <div className="process-track">
                      {[0, 1].map((copy) => (
                        <div
                          className="process-group"
                          key={copy}
                          aria-hidden={copy === 1 ? true : undefined}
                        >
                          <div>
                            <strong>Attempts</strong>
                            <span>Decisions in context.</span>
                          </div>
                          <div>
                            <strong>Feedback</strong>
                            <span>Responses to new evidence.</span>
                          </div>
                          <div>
                            <strong>Revision</strong>
                            <span>Changes across attempts.</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                  <p>
                    Prize entrants would agree to research collection and
                    commercial use. Free practice stays separate.
                  </p>
                </div>
              ),
            },
          ]}
        />
        <footer id="contact" className="page-footer final-footer">
          <a href="#site" aria-label="KeepRI home">
            <Wordmark />
          </a>
          <span>© 2026 KeepRI · Closed beta</span>
          <MotionToggle />
        </footer>
      </Page>
    </>
  );
}
