import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { asset } from '@/lib/site';

const testflight = 'https://testflight.apple.com/join/AhdBBYAG';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header shell">
        <a href="#" className="brand" aria-label="KeepRI home">
          <img src={asset("/assets/keepri-brand/icon.png")} width="44" height="44" alt="" />
          <span>KeepRI<span className="brand-period">.</span></span>
        </a>
        <nav aria-label="Main navigation">
          <a className="nav-link" href="#play">The game</a>
          <a className="nav-link" href="#mission">Our mission</a>
          <a className="nav-link" href="#research">For researchers</a>
        </nav>
        <a className="header-action" href={testflight}>Join the beta <ArrowUpRight size={17} aria-hidden="true" /></a>
      </header>
      <main id="main">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy enter">
            <p className="eyebrow"><span className="status-dot" /> Independent thinking. In good company.</p>
            <h1 id="hero-title">Your mind.<br /><em>Your move.</em></h1>
            <p className="hero-description">A little challenge. A new way to see it. Free reasoning games for the pleasure of figuring things out yourself.</p>
            <div className="hero-actions">
              <a className="action" href={testflight}>Join the beta <ArrowUpRight size={20} aria-hidden="true" /></a>
              <span className="beta-detail">Free on iPhone<br /><span>Available through TestFlight</span></span>
            </div>
          </div>
          <figure className="hero-product enter">
            <div className="product-stage">
              <div className="stage-heading"><span>Meet your next<br />“oh, I see it.”</span><ArrowUpRight size={32} strokeWidth={1.2} aria-hidden="true" /></div>
              <img className="hero-screen" src={asset("/assets/keepri-brand/crossing.png")} alt="KeepRI's Crossing puzzle: a four-by-four board with light pieces and dark opponents." width="942" height="2048" fetchPriority="high" />
              <div className="stage-bottom"><span>Small board. Big possibilities.</span><span aria-hidden="true">↗</span></div>
            </div>
            <figcaption>From the KeepRI iPhone beta · Crossing</figcaption>
          </figure>
        </section>
        <section className="mission-band" id="mission">
          <div className="shell mission-inner">
            <span className="section-kicker">KEEP REASONING INDEPENDENTLY</span>
            <p>In a world full of answers,<br />keep the <em>joy of discovery.</em></p>
            <div className="mission-bottom"><span>AI is changing what we can do.<br />We’re making space for what you can figure out.</span><a className="text-link" href="#play">Start with a game <ArrowRight size={20} aria-hidden="true" /></a></div>
          </div>
        </section>
        <section className="play-section shell" id="play" aria-labelledby="play-title">
          <div className="play-heading">
            <h2 id="play-title">Simple rules.<br /><em>Your own way through.</em></h2>
            <p>Start with a small board and an unfamiliar challenge. Try an idea, see what happens, and find the move that changes everything.</p>
          </div>
          <div className="play-layout">
            <div className="play-steps">
              <article className="play-step"><span className="step-number">01</span><div><h3>Learn by making a move.</h3><p>A hands-on tutorial gets you playing. In Crossing, reach the far edge. In Lockout, leave your opponent with nowhere to go.</p></div></article>
              <article className="play-step"><span className="step-number">02</span><div><h3>Take another look.</h3><p>A miss is a reason to try a new idea. Use a hint, follow a walkthrough, or set a puzzle aside and return with fresh eyes.</p></div></article>
              <article className="play-step"><span className="step-number">03</span><div><h3>Make room for a little discovery.</h3><p>Ten shared puzzles each week, with room to go deeper. Your progress stays with you, ready when you are.</p></div></article>
              <div className="current-beta"><span>IN THE BETA</span><p>Eight weekly sets through November 1, 2026. Crossing starts the season; Lockout opens October 5. Play offline, without an account.</p></div>
            </div>
            <figure className="lockout-figure">
              <div className="lockout-stage"><img src={asset("/assets/keepri-brand/lockout.png")} width="942" height="2048" loading="lazy" alt="A preview of Lockout in KeepRI, with a four-by-four board of disappearing tiles." /></div>
              <figcaption><span>New rules. New possibilities.</span><span>Lockout · Opens October 5</span></figcaption>
            </figure>
          </div>
          <div className="future-note"><span className="future-label">Where we’re going</span><p>A community that celebrates mastery—with rankings, new game families, multiplayer, and funded prize events. These are our next chapters; the current beta is individual puzzle play.</p></div>
        </section>
        <section className="research-section" id="research" aria-labelledby="research-title">
          <div className="shell research-layout">
            <div className="research-intro">
              <p className="section-kicker">FOR AI RESEARCH & EVALUATION TEAMS</p>
              <h2 id="research-title">An answer is a moment.<br /><em>Learning is a story.</em></h2>
              <p>How do people learn unfamiliar rules, recover from mistakes, and adapt when a rule changes? We’re building a way to study that process through carefully designed games.</p>
              <a className="text-link" href="mailto:pj1433@princeton.edu?subject=KeepRI%20research%20pilot">Discuss a research pilot <ArrowUpRight size={20} aria-hidden="true" /></a>
              <span className="research-stage">Seeking our first research partners</span>
            </div>
            <div className="research-deliverables">
              <p className="deliverables-label">THE PROGRAM WE’RE BUILDING</p>
              <article className="research-row"><span>01</span><div><h3>Executable environments</h3><p>Game families with versioned rules, controlled variations, and reproducible scoring.</p></div></article>
              <article className="research-row"><span>02</span><div><h3>Human learning histories</h3><p>With separate permission: the actions, feedback, assistance, and outcomes that put a learning process in context.</p></div></article>
              <article className="research-row"><span>03</span><div><h3>Evaluations with a human baseline</h3><p>Scoped comparisons of learning, error recovery, and adaptation, built around your team’s research question.</p></div></article>
              <div className="research-principle"><strong>Free to play. Free to choose.</strong><p>Our plan is for organizational research programs to support free games and meaningful rewards. Research participation will always require separate permission. No research enrollment or data-sale program is active in this beta.</p></div>
            </div>
          </div>
        </section>
        <section className="about-section shell" id="about" aria-labelledby="about-title">
          <div className="about-title"><img src={asset("/assets/keepri-brand/icon.png")} alt="KeepRI's smiling lime-green mascot" width="80" height="80" loading="lazy" /><h2 id="about-title">Thinking for yourself.<br /><em>Something we can do together.</em></h2></div>
          <div className="about-details"><p>KeepRI was started by Paul Jiang, a Princeton PhD student working in formal methods. We’re bringing precise rules and open-ended curiosity together to make independent reasoning enjoyable, competitive, and rewarding.</p><p>We’re early. We’re looking for curious players, research partners, and a cofounder who cares deeply about games and community.</p><a className="text-link" href="mailto:pj1433@princeton.edu?subject=Hello%20KeepRI">Get in touch <ArrowUpRight size={20} aria-hidden="true" /></a></div>
        </section>
        <section className="closing shell" aria-label="Join KeepRI"><div><span>Your next insight is waiting.</span><p>Come find it.</p></div><a className="action" href={testflight}>Join the beta <ArrowUpRight size={20} aria-hidden="true" /></a></section>
      </main>
      <footer className="site-footer shell"><a href="#" className="footer-brand" aria-label="Back to KeepRI home">KeepRI.</a><span>Keep reasoning independently.</span><nav aria-label="Footer navigation"><a href="https://pauljiang03.github.io/keepri-info/">App privacy</a><a href="https://pauljiang03.github.io/keepri-info/support.html">Support</a><a href="mailto:pj1433@princeton.edu">Contact</a></nav><span className="copyright">© 2026 KeepRI</span></footer>
    </>
  );
}
