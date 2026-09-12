import { ArrowRight } from 'lucide-react';
import { PageMotion } from '@/components/page-motion';
import { OpeningHero, SiteHeader, MotionToggle } from '@/components/hero';
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
      <main id="main" tabIndex={-1}>
        <Philosophy />
        <ResearchPanels />
      </main>
      <footer className="site-footer">
        <div className="shell footer-main">
          <a className="footer-wordmark" href="#site">
            KeepRI<span>·</span>
          </a>
          <span className="footer-copyright">© 2026 KeepRI · Closed beta</span>
          <MotionToggle />
          <a className="footer-back" href="#site">
            Back to top <ArrowRight size={18} />
          </a>
        </div>
      </footer>
    </>
  );
}
