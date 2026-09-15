import { PageMotion } from '@/components/page-motion';
import { OpeningHero, SiteHeader } from '@/components/hero';
import { BookPages } from '@/components/book-pages';
export default function Home() {
  return (
    <>
      <PageMotion />
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <SiteHeader />
      <OpeningHero />
      <main
        id="main"
        className="book"
        tabIndex={-1}
        aria-describedby="book-help"
      >
        <BookPages />
      </main>
      <span id="book-help" className="sr-only">
        Scroll, swipe, or use arrow keys to turn pages. Navigation links jump to
        each chapter.
      </span>
      <noscript>
        <style>{`.intro-overlay { display: none !important; }`}</style>
      </noscript>
    </>
  );
}
