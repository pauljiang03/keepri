'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Menu, X } from 'lucide-react';
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
    <div
      className="intro-overlay"
      id="top"
      data-step="idle"
      aria-label="KeepRI introduction"
    >
      <div className="opening-layer" aria-hidden="true">
        <div className="opening-content">
          <div className="opening-language">
            {[
              [
                'Premises',
                'Conclusions',
                'Inference',
                'Deduction',
                'Induction',
                'Abduction',
              ],
              [
                'Validity',
                'Soundness',
                'Consistency',
                'Completeness',
                'Truth',
                'Falsity',
              ],
              [
                'Propositions',
                'Predicates',
                'Quantifiers',
                'Variables',
                'Constants',
                'Relations',
              ],
              [
                'Negation',
                'Conjunction',
                'Disjunction',
                'Implication',
                'Equivalence',
                'Entailment',
              ],
              [
                'Necessity',
                'Possibility',
                'Contingency',
                'Contradiction',
                'Tautology',
                'Satisfiability',
              ],
              [
                'Universal quantification',
                'Existential quantification',
                'Scope',
                'Bound variables',
                'Free variables',
                'Domains',
              ],
              [
                'Axioms',
                'Theorems',
                'Lemmas',
                'Corollaries',
                'Proofs',
                'Counterexamples',
              ],
              [
                'Modus ponens',
                'Modus tollens',
                'Syllogisms',
                'Contraposition',
                'Reductio ad absurdum',
                'Inference rules',
              ],
              [
                'Symbolic logic',
                'Propositional logic',
                'Predicate logic',
                'Modal logic',
                'Classical logic',
                'Intuitionistic logic',
              ],
              [
                'Syntax',
                'Semantics',
                'Interpretations',
                'Truth tables',
                'Models',
                'Arguments',
              ],
            ].map((line) => (
              <div className="opening-line" key={line[0]}>
                {line.map((word) => (
                  <span key={word}>{word}</span>
                ))}
              </div>
            ))}
          </div>
          <div className="opening-title">
            <div className="opening-thesis">
              {['Keep', 'Reasoning', 'Independently'].map((word) => (
                <span className="opening-thesis-word" key={word}>
                  {word}
                </span>
              ))}
            </div>
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
