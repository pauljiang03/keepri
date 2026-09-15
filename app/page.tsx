import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Wordmark } from '@/components/wordmark';
import { PageMotion } from '@/components/page-motion';
import {
  OpeningHero,
  MainHero,
  SiteHeader,
  MotionToggle,
} from '@/components/hero';
import { ResearchPanels, Philosophy } from '@/components/story-panels';

export default function Home() {
  return (
    <>
      <PageMotion />
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <SiteHeader />
      <OpeningHero />
      <main id="main" className="book" tabIndex={-1}>
        <div className="book-page" data-page="site" aria-label="KeepRI">
          <section
            className="book-scroll"
            data-lenis-prevent=""
            aria-label="KeepRI page"
          >
            <MainHero />
          </section>
        </div>
        <div className="book-page" data-page="thesis" aria-label="Philosophies">
          <section
            className="book-scroll"
            data-lenis-prevent=""
            aria-label="Philosophies page"
          >
            <Philosophy />
          </section>
        </div>
        <div className="book-page" data-page="research" aria-label="Industry">
          <section
            className="book-scroll"
            data-lenis-prevent=""
            aria-label="Industry page"
          >
            <ResearchPanels />
            <footer className="site-footer">
              <div className="shell footer-main">
                <a className="footer-wordmark" href="#site">
                  <Wordmark />
                </a>
                <span className="footer-copyright">
                  © 2026 KeepRI · Closed beta
                </span>
                <MotionToggle />
                <a className="footer-back" href="#site">
                  Back to start <ArrowRight size={18} />
                </a>
              </div>
            </footer>
          </section>
        </div>
      </main>
      <nav className="book-navigation" aria-label="Page turns">
        <button
          className="book-previous"
          type="button"
          disabled
          aria-label="Previous page"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          <span>Previous</span>
        </button>
        <output className="book-position" aria-live="polite" aria-atomic="true">
          <span className="book-number">01 / 03</span>
          <span className="book-title">KeepRI</span>
        </output>
        <button
          className="book-next"
          type="button"
          aria-label="Next page: Philosophies"
        >
          <span>Next</span>
          <ArrowRight size={17} aria-hidden="true" />
        </button>
      </nav>
    </>
  );
}
