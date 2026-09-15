'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowUpRight, Menu, X } from 'lucide-react';
import { HeroVisual } from './hero-visual';
import { Wordmark } from './wordmark';

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
            Industry
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
            <div className="opening-content">
              <div className="opening-language">
                {[
                  'Ask. Try. Reconsider.',
                  'Look closer. Test again.',
                  'Question. Check. Revise.',
                  'Think it through.',
                ].map((line) => (
                  <div className="opening-line" key={line}>
                    {line}
                  </div>
                ))}
              </div>
              <span className="opening-wordmark">
                <Wordmark />
              </span>
              <div className="opening-thesis">
                {['Keep', 'Reasoning', 'Independently'].map((word) => (
                  <span className="opening-thesis-word" key={word}>
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="peel-surface" aria-hidden="true">
            <div className="peel-fold" />
          </div>
          <a className="intro-skip" href="#site">
            Skip intro
          </a>
          <button className="scroll-cue" type="button">
            <span className="intro-cue-label" aria-live="polite">
              Scroll to begin
            </span>
            <span className="chevrons">
              <ArrowUp size={16} aria-hidden="true" />
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
