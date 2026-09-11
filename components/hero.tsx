'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Plus, Menu, X } from 'lucide-react';

const phrases = [
  'independently.',
  'through play.',
  'for yourself.',
  'with purpose.',
];
const palette = [
  '#52685e',
  '#d5b473',
  '#3c4435',
  '#c06a43',
  '#8a8d48',
  '#f6f3e9',
  '#242820',
];
const random = (n: number) => {
  const x = Math.sin(n * 127.1 + 7 * 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const bricks = Array.from({ length: 207 }, (_, n) => {
  const row = Math.floor(n / 9) - 11,
    col = (n % 9) - 4;
  const x = col + (((row % 2) + 2) % 2) * 0.5,
    y = row * 0.6;
  const distance = Math.hypot(x, y) || 1;
  return {
    row,
    col,
    x,
    dx: x / distance,
    dy: y / distance,
    keeper: row === 0 && col === 0,
    color: Math.floor(random(n) * palette.length),
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
            Thesis
          </a>
          <a href="#experience" onClick={() => setOpen(false)}>
            For players
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
          <div className="color-blooms">
            <i />
            <i />
            <i />
          </div>
          <div className="word-cloud">
            {bricks.map((b, i) => (
              <span
                key={i}
                className={`reason-brick ${b.keeper ? 'reason-keeper' : ''}`}
                data-dx={b.dx}
                data-dy={b.dy}
                style={{
                  left: b.keeper
                    ? '50%'
                    : `calc(50% + ${b.x - 0.5} * var(--cell))`,
                  top: `calc(50% + ${b.row - 0.5} * var(--pitch))`,
                  backgroundColor: b.keeper ? 'transparent' : palette[b.color],
                  color:
                    b.keeper || b.color === 1 || b.color === 5
                      ? '#242820'
                      : '#f6f3e9',
                }}
              >
                REASONING
              </span>
            ))}
          </div>
          <span className="opening-subline">is worth practicing.</span>
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
              <p>
                A place to practice independent thought without AI.
                <br className="desktop-break" /> Free reasoning games.
                Strategies of your own.
              </p>
              <a className="pill-button" href="#experience">
                <Plus size={18} strokeWidth={1.5} />
                <span>Explore KeepRI</span>
              </a>
            </div>
            <div
              className="hero-marquee marquee"
              data-speed="50"
              aria-label="Think for yourself. Learn without AI. Make the effort count."
            >
              <div className="marquee-track">
                {[0, 1, 2, 3].map((i) => (
                  <div className="marquee-group" aria-hidden="true" key={i}>
                    <span>Think for yourself.</span>
                    <span className="marquee-mark">✳</span>
                    <span>Learn without AI.</span>
                    <span className="marquee-mark">✳</span>
                    <span>Make the effort count.</span>
                    <span className="marquee-mark">✳</span>
                  </div>
                ))}
              </div>
            </div>
            <a
              className="hero-scroll"
              href="#experience"
              aria-label="Explore the player experience"
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
