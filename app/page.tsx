import { ArrowRight, Circle, Crosshair, Plus, Square } from 'lucide-react';
import { PageMotion } from '@/components/page-motion';
import { OpeningHero, SiteHeader, MotionToggle } from '@/components/hero';
import { ProductVisual } from '@/components/product-visual';
import { ResearchPanels, Philosophy } from '@/components/story-panels';

const steps = [
  {
    title: 'Discover',
    text: 'A fresh challenge. Start with your own judgment.',
    icon: Crosshair,
  },
  {
    title: 'Improve',
    text: 'Work out why an idea succeeds. Build a strategy without AI.',
    icon: Circle,
  },
  {
    title: 'Compete',
    text: 'A shared challenge. A worthy rival. A reason to give it your all.',
    icon: Square,
  },
];

export default function Home() {
  return (
    <>
      <PageMotion />
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <SiteHeader />
      <OpeningHero />
      <main id="main" tabIndex={-1}>
        <section
          className="experience-section"
          id="experience"
          tabIndex={-1}
          aria-label="The player experience"
        >
          <div className="experience-sequence">
            <div className="experience-sticky">
              <div
                className="process-marquee marquee"
                data-speed="24"
                aria-hidden="true"
              >
                <div className="marquee-track">
                  {[0, 1, 2, 3].map((i) => (
                    <div className="marquee-group" key={i}>
                      <span>How it works</span>
                      <span>✳</span>
                      <span>How it works</span>
                      <span>✳</span>
                    </div>
                  ))}
                </div>
              </div>
              <ol className="experience-list">
                {steps.map((step, i) => (
                  <li className="experience-item" key={step.title}>
                    <div className="product-card">
                      <step.icon
                        className="card-icon"
                        size={24}
                        strokeWidth={1.4}
                      />
                      <div className={`card-visual step-visual-${i}`}>
                        <ProductVisual step={i} />
                      </div>
                    </div>
                    <div className={`step-copy step-copy-${i}`}>
                      <i className="step-line" />
                      <span className="step-number">[ 00{i + 1} ]</span>
                      <h2>{step.title}</h2>
                      <p>{step.text}</p>
                      {i === 2 && (
                        <span className="step-status">
                          Expanded competition in development
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="earn-section">
            <div className="earn-line" />
            <div className="earn-copy">
              <span className="step-number">[ 004 ]</span>
              <h2>Make the effort count.</h2>
              <p>
                Recognition for mastery. Meaningful prizes.
                <br />A new challenge worth returning for.
              </p>
            </div>
            <div className="earn-card">
              <div className="earn-card-inner">
                <span className="visual-label">
                  The experience we’re building toward
                </span>
                <h3>
                  Your thinking.
                  <br />
                  Your progress.
                </h3>
                <div className="earn-progress">
                  <span>Discover</span>
                  <ArrowRight />
                  <span>Improve</span>
                  <ArrowRight />
                  <span>Compete</span>
                  <ArrowRight />
                  <span>Earn</span>
                </div>
                <p>
                  KeepRI is in closed beta. Expanded competition, tournaments,
                  and funded cash-prize events are in development.
                </p>
              </div>
            </div>
          </div>
        </section>
        <ResearchPanels />
        <Philosophy />
        <section className="closing-section" aria-labelledby="closing-title">
          <div className="closing-curve" />
          <div className="closing-content">
            <div className="closing-line" />
            <p>The answers come easily.</p>
            <h2 id="closing-title">
              Keep thinking
              <br />
              for yourself.
            </h2>
            <a className="pill-button" href="#experience">
              <Plus size={18} />
              <span>Explore KeepRI</span>
            </a>
            <span className="closing-status">Closed beta</span>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div
          className="footer-marquee marquee"
          data-speed="24"
          aria-hidden="true"
        >
          <div className="marquee-track">
            {[0, 1, 2, 3].map((i) => (
              <div className="marquee-group" key={i}>
                <span>Keep reasoning independently</span>
                <span>✳</span>
              </div>
            ))}
          </div>
        </div>
        <div className="shell footer-main">
          <a className="footer-wordmark" href="#site">
            KeepRI<span>·</span>
          </a>
          <div>
            <p>Keep reasoning independently.</p>
            <span>© 2026 KeepRI</span>
            <MotionToggle />
          </div>
          <a className="footer-back" href="#site">
            Back to top <ArrowRight size={18} />
          </a>
        </div>
        <div className="shell footer-note">
          <span>Closed beta · Research program in development</span>
          <p>
            Free play and future prize eligibility remain independent of
            research participation. Research enrollment is not active in the
            closed beta.
          </p>
        </div>
      </footer>
    </>
  );
}
