'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Plus, Menu, X } from 'lucide-react';

const phrases = [
  'independently.',
  'through play.',
  'for yourself.',
  'with purpose.',
];
const thoughts = Array.from({ length: 18 }, (_, i) => {
  const angle = (i * 137.508 * Math.PI) / 180;
  const radius = 150 + (i % 3) * 86;
  return {
    x: Math.round(400 + Math.cos(angle) * radius),
    y: Math.round(400 + Math.sin(angle) * radius),
    color: ['#b7bca6', '#c06a43', '#d5b473'][i % 3],
  };
});

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open]);
  return (
    <header className="site-header">
      <div className="masthead shell">
        <a className="brand" href="#site" aria-label="KeepRI home">
          KeepRI<span className="brand-dot">·</span>
        </a>
        <nav
          className={`navigation ${open ? 'is-open' : ''}`}
          aria-label="Main navigation"
        >
          <a href="#thesis" onClick={() => setOpen(false)}>
            Philosophies
          </a>
          <a href="#research" onClick={() => setOpen(false)}>
            For industry
          </a>
        </nav>
        <span className="beta-status">
          <i />
          Closed beta
        </span>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

export function OpeningHero() {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(-1);
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    function reset() {
      clearInterval(timer);
      index = 0;
      setCurrent(0);
      setPrevious(-1);
      if (query.matches) return;
      timer = setInterval(() => {
        if (
          document.hidden ||
          document.documentElement.dataset.motion === 'paused' ||
          document.documentElement.dataset.intro === 'active'
        )
          return;
        setPrevious(index);
        index = (index + 1) % phrases.length;
        setCurrent(index);
      }, 2800);
    }
    reset();
    query.addEventListener('change', reset);
    return () => {
      clearInterval(timer);
      query.removeEventListener('change', reset);
    };
  }, []);
  return (
    <section
      className="opening"
      id="top"
      aria-label="Keep reasoning independently"
    >
      <div className="opening-stage">
        <div className="opening-layer" aria-hidden="true">
          <div className="thought-glow" />
          <div className="thought-field">
            <svg className="thought-network" viewBox="0 0 800 800" fill="none">
              <g className="thought-orbits">
                {[150, 236, 322].map((radius) => (
                  <circle key={radius} cx="400" cy="400" r={radius} />
                ))}
              </g>
              <g className="thought-connections">
                {thoughts.map((point, i) => {
                  const next = thoughts[(i + 5) % thoughts.length];
                  return (
                    <path
                      key={i}
                      pathLength="1"
                      d={`M${point.x},${point.y} Q400,400 ${next.x},${next.y}`}
                    />
                  );
                })}
              </g>
              <g className="thought-points">
                {thoughts.map((point, i) => (
                  <circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r={i % 3 === 1 ? 5 : 3.5}
                    fill={point.color}
                  />
                ))}
              </g>
            </svg>
            <span className="thought-word thought-word-1">Question</span>
            <span className="thought-word thought-word-2">Explore</span>
            <span className="thought-word thought-word-3">Reconsider</span>
            <span className="thought-word thought-word-4">Discover</span>
          </div>
          <span className="opening-wordmark">
            KeepRI<span>·</span>
          </span>
          <div className="opening-progress">
            <span />
            <i />
          </div>
        </div>
        <a className="intro-skip" href="#site">
          Skip intro
        </a>
        <a className="scroll-cue" href="#site">
          <span>Scroll down</span>
          <span className="chevrons">
            <i>⌄</i>
            <i>⌄</i>
          </span>
        </a>
        <div className="hero-layer" id="site" tabIndex={-1}>
          <section className="hero" aria-labelledby="hero-title">
            <canvas className="particle-field" aria-hidden="true" />
            <div className="hero-content">
              <h1 id="hero-title" aria-label="Keep reasoning independently.">
                Keep reasoning
                <span className="rotating-headline" aria-hidden="true">
                  {phrases.map((phrase, i) => (
                    <span
                      key={phrase}
                      data-phrase={i}
                      className={
                        i === current
                          ? 'is-active'
                          : i === previous
                            ? 'is-leaving'
                            : ''
                      }
                    >
                      {phrase}
                    </span>
                  ))}
                </span>
              </h1>
              <p>A place to practice independent thought without AI.</p>
              <a className="pill-button" href="#thesis">
                <Plus size={18} strokeWidth={1.5} />
                <span>Our philosophies</span>
              </a>
            </div>
            <div
              className="hero-marquee marquee"
              data-speed="50"
              aria-label="Curiosity. Practice. Discovery. Play."
            >
              <div className="marquee-track">
                {[0, 1, 2, 3].map((i) => (
                  <div className="marquee-group" aria-hidden="true" key={i}>
                    <span>Curiosity</span>
                    <span className="marquee-mark">✳</span>
                    <span>Practice</span>
                    <span className="marquee-mark">✳</span>
                    <span>Discovery</span>
                    <span className="marquee-mark">✳</span>
                    <span>Play</span>
                    <span className="marquee-mark">✳</span>
                  </div>
                ))}
              </div>
            </div>
            <a
              className="hero-scroll"
              href="#thesis"
              aria-label="Read our philosophies"
            >
              <ArrowDown size={18} />
            </a>
          </section>
        </div>
      </div>
    </section>
  );
}

export function MotionToggle() {
  const [paused, setPaused] = useState(false);
  return (
    <button
      className="motion-toggle"
      aria-pressed={paused}
      onClick={() => {
        const next = !paused;
        setPaused(next);
        document.documentElement.dataset.motion = next ? 'paused' : 'playing';
        window.dispatchEvent(new Event('keepri:motionchange'));
      }}
    >
      {paused ? 'Resume motion' : 'Pause motion'}
    </button>
  );
}
