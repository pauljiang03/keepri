'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { HeroVisual } from './hero-visual';
import { Wordmark } from './wordmark';

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
          <Wordmark />
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
        <div
          className="intro-overlay"
          data-step="idle"
          aria-label="KeepRI introduction"
        >
          <div className="opening-layer" aria-hidden="true">
            <div className="thought-glow" />
            <div className="thought-field">
              <svg
                className="thought-network"
                viewBox="0 0 800 800"
                fill="none"
              >
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
            </div>
            <span className="opening-wordmark">
              <Wordmark />
            </span>
            <div className="opening-spelling">
              {['Keep', 'Reasoning', 'Independently'].map((word) => (
                <span className="opening-spelling-word" key={word}>
                  {word}
                </span>
              ))}
            </div>
            <div className="opening-progress">
              <span />
              <i />
            </div>
          </div>
          <svg
            className="peel-surface"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="peel-shading" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#8d8b7e" />
                <stop offset="0.14" stopColor="#e2dfd2" />
                <stop offset="0.48" stopColor="#fffdf5" />
                <stop offset="0.82" stopColor="#eeeadd" />
                <stop offset="1" stopColor="#c7c2b2" />
              </linearGradient>
            </defs>
            <polygon className="peel-fold" fill="url(#peel-shading)" />
          </svg>
          <a className="intro-skip" href="#site">
            Skip intro
          </a>
          <button className="scroll-cue" type="button">
            <span className="intro-cue-label" aria-live="polite">
              Swipe to spin
            </span>
            <span className="chevrons">
              <i>⌃</i>
              <i>⌃</i>
            </span>
          </button>
        </div>
        <div className="hero-layer" id="site" tabIndex={-1}>
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-main shell">
              <div className="hero-content">
                <h1 id="hero-title">
                  Independent thought.
                  <br />
                  <span>In the age of AI.</span>
                </h1>
                <p>
                  KeepRI brings learning and competition together to strengthen
                  independent judgment.
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
                  <span className="vision-index">01</span>
                  <h2>Global leaderboards</h2>
                  <p>Compete with a worldwide community.</p>
                </div>
                <div>
                  <span className="vision-index">02</span>
                  <h2>Significant prizes</h2>
                  <p>Rewards for learning and competition.</p>
                </div>
                <div>
                  <span className="vision-index">03</span>
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
