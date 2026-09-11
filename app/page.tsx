import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { asset } from '@/lib/site';
import { PageMotion } from '@/components/page-motion';
import { ReasoningAssembly } from '@/components/reasoning-assembly';
import { ReasoningJourney } from '@/components/reasoning-journey';

// Static Pages deployment: the original brand icon is served directly.
/* oxlint-disable next/no-img-element */

const introduction = [
  { id: 'intro-1', text: 'Think for yourself.', next: '#intro-2' },
  { id: 'intro-2', text: 'Learn without AI.', next: '#intro-3' },
  { id: 'intro-3', text: 'Make the effort count.', next: '#site' },
];

export default function Home() {
  return (
    <>
      <PageMotion />
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <section className="introduction" id="top" aria-label="Introduction">
        <div className="intro-reasoning" aria-hidden="true">
          <ReasoningAssembly />
        </div>
        <div className="intro-controls">
          <div className="shell intro-control-row">
            <a
              href="#top"
              className="intro-wordmark"
              aria-label="KeepRI introduction"
            >
              KeepRI
            </a>
            <a className="intro-skip" href="#site">
              Skip intro <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <nav className="intro-progress" aria-label="Introduction chapters">
            {introduction.map((scene, index) => (
              <a
                href={`#${scene.id}`}
                key={scene.id}
                aria-label={`Statement ${index + 1}: ${scene.text}`}
                data-scene-link={scene.id}
              >
                <span aria-hidden="true">0{index + 1}</span>
                <i aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
        {introduction.map((scene, index) => (
          <section
            className={`intro-scene scene-${index + 1}`}
            id={scene.id}
            key={scene.id}
            aria-label={`Statement ${index + 1} of 3`}
            tabIndex={-1}
          >
            <div className="scene-inner">
              <p className="intro-statement">{scene.text}</p>
              <a className="intro-next" href={scene.next}>
                {index === 2 ? 'Enter KeepRI' : 'Scroll to continue'}
                <ArrowDown size={18} aria-hidden="true" />
              </a>
            </div>
          </section>
        ))}
      </section>
      <div id="site" tabIndex={-1}>
        <div className="site-progress" aria-hidden="true" />
        <header className="site-header">
          <div className="shell masthead">
            <a className="brand" href="#site" aria-label="KeepRI home">
              <img
                src={asset('/assets/keepri-brand/icon.png')}
                width="32"
                height="32"
                alt=""
              />
              <span>KeepRI</span>
            </a>
            <nav className="navigation" aria-label="Main navigation">
              <a href="#thesis">Thesis</a>
              <a href="#experience">For players</a>
              <a href="#research">For industry</a>
            </nav>
            <span className="beta-status">Closed beta</span>
          </div>
        </header>
        <main id="main" tabIndex={-1}>
          <section className="hero shell" aria-labelledby="hero-title">
            <h1 id="hero-title">
              <span className="hero-title-line">
                <span>Keep reasoning</span>
              </span>
              <span className="hero-title-line">
                <span>independently.</span>
              </span>
            </h1>
            <div
              className="reasoning-rail"
              aria-label="Think independently, learn, compete, and earn rewards"
              data-reveal
            >
              <span>Think</span>
              <ArrowRight aria-hidden="true" size={18} />
              <span>Learn</span>
              <ArrowRight aria-hidden="true" size={18} />
              <span>Compete</span>
              <ArrowRight aria-hidden="true" size={18} />
              <span>Earn</span>
            </div>
            <div className="hero-bottom" data-reveal>
              <p>
                A place to practice independent thought without AI. We’re
                building free reasoning games where you develop your own
                strategies, with competition and meaningful prizes giving you
                more reasons to return.
              </p>
              <a className="text-link" href="#thesis">
                Explore the idea <ArrowDown size={20} aria-hidden="true" />
              </a>
            </div>
          </section>
          <section
            className="thesis-section shell"
            id="thesis"
            aria-labelledby="thesis-title"
          >
            <div data-reveal>
              <p className="section-label">The thesis</p>
              <h2 id="thesis-title">
                Independent thought
                <br />
                is worth practicing.
              </h2>
            </div>
            <div className="thesis-copy" data-reveal>
              <p className="lead">
                As AI makes answers easier to obtain, we believe people will
                seek out places to exercise their own judgment.
              </p>
              <p>
                KeepRI gives that practice a home. Work through an unfamiliar
                problem without AI supplying the answer. Test an idea, learn
                from a mistake, and understand why your next move works.
              </p>
              <p>
                Games make the effort enjoyable. Competition, recognition, and
                prizes add reasons to keep going. Our mission is to make
                independent thinking something people choose to practice,
                improve at, and celebrate together.
              </p>
            </div>
          </section>
          <section
            className="experience-section"
            id="experience"
            aria-labelledby="experience-title"
          >
            <div className="shell">
              <div className="experience-heading" data-reveal>
                <h2 id="experience-title">
                  Your thinking.
                  <br />
                  Your progress.
                </h2>
                <p>
                  Start with the satisfaction of figuring it out yourself. Build
                  your understanding through play, then put it to the test.
                  Shared challenges, competition, and planned prizes give that
                  progress a stage.
                </p>
              </div>
              <div className="experience-theatre">
                <ReasoningJourney />
                <div
                  className="thinking-sequence"
                  aria-label="The experience: discover, improve, compete, earn"
                >
                  <div className="thinking-step">
                    <span>01</span>
                    <h3>Discover.</h3>
                    <p>A fresh challenge. Start with your own judgment.</p>
                  </div>
                  <div className="thinking-step">
                    <span>02</span>
                    <h3>Improve.</h3>
                    <p>
                      Work out why an idea succeeds. Build a strategy without
                      AI.
                    </p>
                  </div>
                  <div className="thinking-step">
                    <span>03</span>
                    <h3>Compete.</h3>
                    <p>
                      A shared challenge. A worthy rival. A reason to give it
                      your all.
                    </p>
                  </div>
                  <div className="thinking-step">
                    <span>04</span>
                    <h3>Earn.</h3>
                    <p>
                      Recognition for mastery. Meaningful prizes. A new
                      challenge worth returning for.
                    </p>
                  </div>
                </div>
              </div>
              <p className="experience-note">
                KeepRI is in closed beta. Expanded competition, tournaments, and
                funded cash-prize events are part of the product we’re building
                toward.
              </p>
            </div>
          </section>
          <section
            className="research-section shell"
            id="research"
            aria-labelledby="research-title"
          >
            <div className="research-heading" data-reveal>
              <p className="section-label">For industry</p>
              <h2 id="research-title">
                Human data.
                <br />
                From human effort.
              </h2>
              <p>
                We’re developing human learning datasets for AI research and
                evaluation. Our thesis is that people who care about learning
                and competing will invest real effort, creating an opportunity
                to study how strategies develop over time.
              </p>
            </div>
            <div className="research-body">
              <div className="research-question" data-reveal>
                <span>Beyond the final score</span>
                <p>
                  What does learning look like when someone really wants to get
                  better?
                </p>
                <div
                  className="research-evidence"
                  aria-label="Research records: attempts, feedback, and strategy changes"
                >
                  <span>Attempts</span>
                  <ArrowRight size={16} aria-hidden="true" />
                  <span>Feedback</span>
                  <ArrowRight size={16} aria-hidden="true" />
                  <span>Revision</span>
                </div>
              </div>
              <div className="research-offer" data-reveal>
                <p>
                  AI teams would buy licensed human learning data and
                  commissioned collections, gathered with separate participant
                  consent. We plan to pair those records with reproducible
                  environments and evaluations. Controlled tasks, documented
                  assistance, and quality checks are part of the research
                  design.
                </p>
                <div className="research-accordion">
                  <details name="research-deliverables">
                    <summary>
                      Executable environments{' '}
                      <Plus size={20} aria-hidden="true" />
                    </summary>
                    <div>
                      <p>
                        Versioned rules, controlled variants, scoring, and
                        replay. A reproducible setting for studying how people
                        and AI systems approach an unfamiliar problem.
                      </p>
                    </div>
                  </details>
                  <details name="research-deliverables">
                    <summary>
                      Human learning histories{' '}
                      <Plus size={20} aria-hidden="true" />
                    </summary>
                    <div>
                      <p>
                        Actions, feedback, assistance, and outcomes in context.
                        Separately consented records that show how a strategy
                        develops across attempts.
                      </p>
                    </div>
                  </details>
                  <details name="research-deliverables">
                    <summary>
                      Evaluation packages <Plus size={20} aria-hidden="true" />
                    </summary>
                    <div>
                      <p>
                        Human baselines for learning, error recovery, and
                        adaptation, scoped to a research question with
                        documented conditions and exposure controls.
                      </p>
                    </div>
                  </details>
                </div>
                <span className="research-status">
                  Research program in development
                </span>
              </div>
            </div>
          </section>
          <section className="model-section" aria-labelledby="model-title">
            <div className="shell model-inner">
              <div data-reveal>
                <h2 id="model-title">
                  The player experience
                  <br />
                  comes first.
                </h2>
                <p>
                  Independent play brings people in. Optional, separately
                  consented research creates human learning data for industry.
                  Revenue from data licensing and research programs would fund
                  free access, fresh challenges, and meaningful prizes, helping
                  the community keep thinking for itself.
                </p>
              </div>
              <div
                className="model-diagram"
                data-reveal
                aria-label="Proposed model: free play, optional research with separate consent, and research programs that support the player experience."
              >
                <div className="model-node">
                  <span>01</span>
                  <strong>Independent play</strong>
                </div>
                <ArrowRight
                  className="model-arrow"
                  size={24}
                  aria-hidden="true"
                />
                <div className="model-node">
                  <span>02 · Optional</span>
                  <strong>Consented human data</strong>
                </div>
                <ArrowRight
                  className="model-arrow"
                  size={24}
                  aria-hidden="true"
                />
                <div className="model-node">
                  <span>03</span>
                  <strong>Data licensing &amp; research</strong>
                </div>
                <div className="model-return">
                  <span>
                    Research revenue → Fresh challenges, free play, funded
                    prizes
                  </span>
                </div>
              </div>
              <p className="consent-note">
                Free play and future prize eligibility remain independent of
                research participation. The research program is in development;
                research enrollment is not active in the closed beta.
              </p>
            </div>
          </section>
        </main>
        <footer className="site-footer">
          <div className="shell footer-top">
            <a
              href="#site"
              className="footer-wordmark"
              aria-label="KeepRI home"
            >
              KeepRI
            </a>
            <p>Keep reasoning independently.</p>
          </div>
          <div className="shell footer-bottom">
            <span>© 2026 KeepRI</span>
            <span>Closed beta</span>
            <nav aria-label="Footer navigation">
              <a href="#site">Back to top</a>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
