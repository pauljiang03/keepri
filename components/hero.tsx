'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { HeroVisual } from './hero-visual';
import { asset } from '@/lib/site';

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
        <a className="brand" href={asset('/')} aria-label="KeepRI home">
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
            For Industry
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
            <div className="hero-main shell">
              <div className="hero-content">
                <span className="hero-eyebrow">Built for human judgment</span>
                <h1 id="hero-title">
                  Keep reasoning.
                  <br />
                  <span>Independently.</span>
                </h1>
                <p>
                  Society needs people who can assess evidence and make their
                  own decisions. We’re building a place to practice through
                  learning and competition.
                </p>
                <a className="hero-link" href="#thesis">
                  <span>Our philosophies</span>
                  <ArrowUpRight size={20} />
                </a>
              </div>
              <HeroVisual />
            </div>
            <div className="hero-vision shell">
              <div className="hero-vision-heading">
                <span>The vision</span>
                <span>In development</span>
              </div>
              <div className="hero-vision-grid">
                <div>
                  <h2>Global leaderboards</h2>
                  <p>Compete with a worldwide community.</p>
                </div>
                <div>
                  <h2>Significant prizes</h2>
                  <p>Rewards for learning and competition.</p>
                </div>
                <div>
                  <h2>Human learning data</h2>
                  <p>AI research with separate consent.</p>
                </div>
              </div>
            </div>
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
