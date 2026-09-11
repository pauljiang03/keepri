import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { asset } from '@/lib/site';
import { PageMotion } from '@/components/page-motion';

// Static Pages deployment: the original brand icon is served directly.
/* oxlint-disable next/no-img-element */

const introduction = [
  { id: 'intro-1', text: 'Answers are everywhere.', next: '#intro-2' },
  { id: 'intro-2', text: 'Understanding takes effort.', next: '#intro-3' },
  { id: 'intro-3', text: 'Keep thinking for yourself.', next: '#site' },
];

export default function Home() {
  return (
    <>
      <PageMotion />
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <section className="introduction" id="top" aria-label="Introduction">
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
              <a href="#experience">Experience</a>
              <a href="#research">Research</a>
            </nav>
            <span className="beta-status">Closed beta</span>
          </div>
        </header>
        <main id="main" tabIndex={-1}>
          <section className="hero shell" aria-labelledby="hero-title">
            <h1 id="hero-title" data-reveal>
              Keep reasoning
              <br />
              <span>independently.</span>
            </h1>
            <div className="hero-bottom" data-reveal>
              <p>
                We’re building a home for independent thinking through play. A
                place to discover, develop your own strategies, and take pride
                in understanding.
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
                Understanding is
                <br />
                worth the effort.
              </h2>
            </div>
            <div className="thesis-copy" data-reveal>
              <p className="lead">
                As AI makes answers easier to obtain, we believe people will
                seek out places to exercise their own judgment.
              </p>
              <p>
                Games make that effort something people choose. An unfamiliar
                rule invites a question. A failed attempt offers feedback. A
                better strategy brings the satisfaction of figuring it out.
              </p>
              <p>
                Our ambition is a lasting home for independent thinking, built
                around discovery, mastery, and competition.
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
                  New challenges.
                  <br />
                  Your own way through.
                </h2>
                <p>
                  The challenges will keep changing. The reason to return stays
                  the same: the pleasure of making sense of something
                  unfamiliar.
                </p>
              </div>
              <div
                className="thinking-sequence"
                aria-label="The experience: discover, experiment, refine, return"
              >
                <div className="thinking-step" data-reveal>
                  <span>01</span>
                  <h3>Discover.</h3>
                  <p>Meet an unfamiliar set of rules.</p>
                </div>
                <div className="thinking-step" data-reveal>
                  <span>02</span>
                  <h3>Experiment.</h3>
                  <p>Try an idea. Learn from what happens.</p>
                </div>
                <div className="thinking-step" data-reveal>
                  <span>03</span>
                  <h3>Refine.</h3>
                  <p>Find the strategy you couldn’t see before.</p>
                </div>
                <div className="thinking-step" data-reveal>
                  <span>04</span>
                  <h3>Return.</h3>
                  <p>Become a beginner again.</p>
                </div>
              </div>
              <p className="experience-note">
                KeepRI is in closed beta. We’re working toward an evolving
                collection of reasoning challenges and a community that
                celebrates mastery.
              </p>
            </div>
          </section>
          <section
            className="research-section shell"
            id="research"
            aria-labelledby="research-title"
          >
            <div className="research-heading" data-reveal>
              <p className="section-label">The research opportunity</p>
              <h2 id="research-title">
                How we learn
                <br />
                is part of the answer.
              </h2>
              <p>
                For AI teams, a final score leaves questions open. How was a
                strategy discovered? What happened after a mistake? What changed
                when the rules did?
              </p>
            </div>
            <div className="research-body">
              <div className="research-question" data-reveal>
                <span>A question we want to help answer</span>
                <p>
                  When a familiar rule changes, can an AI system adapt as
                  effectively as a person?
                </p>
              </div>
              <div className="research-offer" data-reveal>
                <p>
                  We’re developing commissioned research programs that pair
                  carefully designed environments with separately consented
                  human learning histories.
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
                  Our model is for organizational research revenue to fund free
                  play, fresh content, and meaningful rewards.
                </p>
              </div>
              <div
                className="model-diagram"
                data-reveal
                aria-label="Proposed model: free play, optional research with separate consent, and research programs that support the player experience."
              >
                <div className="model-node">
                  <span>01</span>
                  <strong>Free play</strong>
                </div>
                <ArrowRight
                  className="model-arrow"
                  size={24}
                  aria-hidden="true"
                />
                <div className="model-node">
                  <span>02 · Optional</span>
                  <strong>Consented research</strong>
                </div>
                <ArrowRight
                  className="model-arrow"
                  size={24}
                  aria-hidden="true"
                />
                <div className="model-node">
                  <span>03</span>
                  <strong>Paid research programs</strong>
                </div>
                <div className="model-return">
                  <span>Revenue supports the player experience</span>
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
              <a href="#top">Replay intro</a>
              <a href="#privacy">Website privacy</a>
            </nav>
          </div>
          <div className="shell website-privacy" id="privacy">
            <details>
              <summary>
                About your visit <Plus size={16} aria-hidden="true" />
              </summary>
              <p>
                This website has no analytics, account system, or signup form.
                GitHub Pages serves the site and processes hosting requests
                under its{' '}
                <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
                  privacy statement
                </a>
                . Research participation is not available through this website.
              </p>
            </details>
          </div>
        </footer>
      </div>
    </>
  );
}
