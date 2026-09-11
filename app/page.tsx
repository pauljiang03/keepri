import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { asset } from '@/lib/site';
import { PageMotion } from '@/components/page-motion';

// GitHub Pages has no image optimization server; these local images use explicit dimensions.
/* oxlint-disable next/no-img-element */

const contact = 'mailto:pj1433@princeton.edu';

export default function Home() {
  return (
    <>
      <PageMotion />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header" id="top">
        <div className="shell masthead">
          <a className="brand" href="#top" aria-label="KeepRI home">
            <img
              src={asset('/assets/keepri-brand/icon.png')}
              width="36"
              height="36"
              alt=""
            />
            <span>KeepRI</span>
          </a>
          <span className="beta-status">Closed beta</span>
          <a className="header-contact" href={contact}>
            Get in touch <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <nav className="shell navigation" aria-label="Main navigation">
          <a href="#thesis">Thesis</a>
          <a href="#product">Product</a>
          <a href="#research">Research</a>
          <a href="#company">Company</a>
        </nav>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="shell hero-content">
            <h1 id="hero-title">
              Independent reasoning
              <br className="desktop-break" /> <span>in the age of AI.</span>
            </h1>
            <div className="hero-bottom">
              <p>
                We’re building free reasoning games that make working through
                unfamiliar problems enjoyable, competitive, and rewarding.
              </p>
              <a className="hero-link" href="#thesis">
                Our thesis <ArrowDown size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="board-ribbon" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => (
              <div className={`board-tile tile-${i % 8}`} key={i}>
                <span />
              </div>
            ))}
          </div>
        </section>
        <section
          className="thesis-section shell"
          id="thesis"
          aria-labelledby="thesis-title"
        >
          <div className="section-heading" data-reveal>
            <p className="section-label">The thesis</p>
            <h2 id="thesis-title">
              Understanding is
              <br />
              worth the effort.
            </h2>
          </div>
          <div className="thesis-copy" data-reveal>
            <p className="lead">
              As AI makes answers easier to obtain, we believe people will seek
              out places to exercise their own judgment.
            </p>
            <p>
              Games make that effort something people choose. An unfamiliar rule
              invites a question. A failed attempt offers feedback. A better
              strategy brings the satisfaction of figuring it out.
            </p>
            <p>
              KeepRI starts there. Our ambition is a lasting home for
              independent thinking, built around discovery, mastery, and
              competition.
            </p>
          </div>
        </section>
        <section
          className="product-section"
          id="product"
          aria-labelledby="product-title"
        >
          <div className="shell">
            <div className="product-heading" data-reveal>
              <h2 id="product-title">
                A small board.
                <br />
                Room to think.
              </h2>
              <div>
                <p>
                  Learn the rules. Try a strategy. Find a better one. The KeepRI
                  app brings this loop to focused, weekly reasoning challenges.
                </p>
                <span className="product-status">Currently in closed beta</span>
              </div>
            </div>
            <div className="game-gallery">
              <figure className="game-figure crossing" data-reveal>
                <div className="game-image">
                  <div className="game-crop">
                    <img
                      src={asset('/assets/keepri-brand/crossing.png')}
                      alt="Crossing puzzle board in KeepRI, with two light pieces facing two dark pieces."
                      width="942"
                      height="2048"
                      loading="lazy"
                    />
                  </div>
                </div>
                <figcaption>
                  <h3>Crossing</h3>
                  <p>Find your way to the far edge.</p>
                </figcaption>
              </figure>
              <figure className="game-figure lockout" data-reveal>
                <div className="game-image">
                  <div className="game-crop">
                    <img
                      src={asset('/assets/keepri-brand/lockout.png')}
                      alt="Lockout puzzle board in KeepRI, with two pieces and tiles that disappear as play progresses."
                      width="942"
                      height="2048"
                      loading="lazy"
                    />
                  </div>
                </div>
                <figcaption>
                  <h3>Lockout</h3>
                  <p>Leave your opponent without a move.</p>
                </figcaption>
              </figure>
            </div>
            <div className="product-footnote">
              <p>From the KeepRI app</p>
              <p>
                Our next chapter: more game families, shared competition, and a
                community that celebrates mastery.
              </p>
            </div>
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
              <span>One question we want to help answer</span>
              <p>
                When a familiar rule changes, can an AI system adapt as
                effectively as a person?
              </p>
            </div>
            <div className="research-offer" data-reveal>
              <p>
                We’re developing commissioned research programs that pair
                carefully designed games with separately consented human
                learning histories.
              </p>
              <dl className="deliverables">
                <div>
                  <dt>Executable environments</dt>
                  <dd>
                    Versioned rules, controlled variants, scoring, and replay.
                  </dd>
                </div>
                <div>
                  <dt>Human learning histories</dt>
                  <dd>
                    Actions, feedback, assistance, and outcomes in context.
                  </dd>
                </div>
                <div>
                  <dt>Evaluation packages</dt>
                  <dd>
                    Human baselines for learning, error recovery, and
                    adaptation.
                  </dd>
                </div>
              </dl>
              <a
                className="text-link"
                href={`${contact}?subject=KeepRI%20research%20partnership`}
              >
                Discuss a research partnership{' '}
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
        <section className="model-section" aria-labelledby="model-title">
          <div className="shell model-inner">
            <div data-reveal>
              <h2 id="model-title">The games come first.</h2>
              <p>
                Our model is for organizational research revenue to fund free
                play, fresh content, and meaningful rewards.
              </p>
            </div>
            <div
              className="model-diagram"
              data-reveal
              aria-label="Proposed model: free games, optional research with separate consent, and paid research programs that support the player experience."
            >
              <div className="model-node">
                <span>01</span>
                <strong>Free games</strong>
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
        <section
          className="company-section shell"
          id="company"
          aria-labelledby="company-title"
        >
          <div className="company-heading" data-reveal>
            <h2 id="company-title">
              Built from a belief
              <br />
              in independent thought.
            </h2>
          </div>
          <div className="company-copy" data-reveal>
            <p>
              KeepRI was started by Paul Jiang, a Princeton PhD student working
              in formal methods.
            </p>
            <p>
              We’re bringing precise, executable rules to games people want to
              learn, and to research that can make learning easier to
              understand.
            </p>
            <p>
              We’re early, and looking to connect with research partners,
              investors, and a cofounder with a deep feel for consumer games and
              community.
            </p>
            <a className="founder-link" href={contact}>
              <span>
                Talk with Paul
                <span className="founder-email">pj1433@princeton.edu</span>
              </span>
              <ArrowUpRight size={28} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="shell footer-top">
          <a
            href="#top"
            className="footer-wordmark"
            aria-label="KeepRI, back to top"
          >
            KeepRI
          </a>
          <p>Keep reasoning independently.</p>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 KeepRI</span>
          <span>Closed beta</span>
          <nav aria-label="Footer navigation">
            <a href="https://pauljiang03.github.io/keepri-info/">Privacy</a>
            <a href="https://pauljiang03.github.io/keepri-info/support.html">
              Support
            </a>
            <a href={contact}>Contact</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
