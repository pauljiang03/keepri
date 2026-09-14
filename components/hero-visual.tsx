import { ArrowDown, ArrowUp, CornerUpLeft, Plus } from 'lucide-react';

export function HeroVisual() {
  return (
    <figure className="hero-visual model-flow" aria-labelledby="model-title">
      <figcaption className="model-heading">
        <h2 id="model-title">How KeepRI would work</h2>
        <span>Planned model</span>
      </figcaption>
      <div className="model-circuit">
        <div className="model-game">
          <span className="model-label">01 / Free play</span>
          <h3>A growing library of games.</h3>
          <p>Original games, new variants and weekly challenges.</p>
        </div>
        <div className="model-branches">
          <section
            className="model-lane model-competition"
            aria-labelledby="competition-path"
          >
            <h3 id="competition-path">Competition</h3>
            <ol>
              <li>
                <h4>Leaderboards</h4>
                <p>Verified scores for each game.</p>
              </li>
              <li>
                <h4>Enter for cash prizes</h4>
                <p>Agree to research terms, then compete.</p>
              </li>
              <li>
                <h4>Return &amp; improve</h4>
                <p>Verified awards. New games and fresh competition.</p>
              </li>
            </ol>
            <div className="model-return">
              <CornerUpLeft size={16} aria-hidden="true" /> Back to the games
            </div>
          </section>
          <section
            className="model-lane model-research"
            aria-labelledby="research-path"
          >
            <h3 id="research-path">Research from prize play</h3>
            <ol>
              <li>
                <h4>Prize-entry agreement</h4>
                <p>
                  Research collection and commercial use, agreed before entry.
                </p>
              </li>
              <li>
                <h4>Learning records</h4>
                <p>Attempts, feedback and revisions. Checked for quality.</p>
              </li>
              <li>
                <h4>AI teams pay</h4>
                <p>Commissioned studies, dataset licenses and evaluations.</p>
              </li>
            </ol>
            <div className="model-revenue">
              <ArrowDown size={16} aria-hidden="true" /> Research revenue
            </div>
          </section>
        </div>
        <div className="model-reinvestment">
          <ArrowUp size={18} aria-hidden="true" />
          <div>
            <h3>Fund the next round.</h3>
            <p>Free access, new games and significant prizes.</p>
          </div>
        </div>
      </div>
      <p className="model-choice">
        Free practice requires no research participation. Cash-prize entry would
        require agreement to research data collection and commercial use.
      </p>
      <details className="model-details">
        <summary>
          Research &amp; funding <Plus size={16} aria-hidden="true" />
        </summary>
        <p>
          Customer research questions would guide new games and controlled
          variants. Separately consented records would support datasets,
          executable environments and human evaluations. Identity and
          prize-payment details would remain separate from research deliveries.
        </p>
        <p>
          Initial funding and event sponsorship would support early
          competitions. Customer revenue would cover game development, research,
          operations and prizes, with earnings reinvested in the platform.
        </p>
        <p>
          Research enrollment is not active. Tournaments and funded cash-prize
          events are in development.
        </p>
      </details>
    </figure>
  );
}
