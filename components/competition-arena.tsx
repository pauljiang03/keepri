import { arenaStages, podiumFaces, trackPoint } from '@/lib/arena-geometry';

function Player({ index, angle }: { index: number; angle: number }) {
  const point = trackPoint(angle, index % 3);
  return (
    <g
      className={`arena-player player-${index}`}
      data-player={index}
      data-angle={angle}
      transform={`translate(${point.x} ${point.y})`}
    >
      <ellipse className="arena-piece-ground" cy="2" rx="16" ry="7" />
      <path
        className="arena-piece-side"
        d="M-11 -5 Q-10 -18 -5 -22 H5 Q10 -18 11 -5 Q0 4 -11 -5Z"
      />
      <path
        className="arena-piece-light"
        d="M-11 -5 Q-10 -18 -5 -22 H0 V0 Q-8 -1 -11 -5Z"
      />
      <ellipse className="arena-piece-top" cy="-24" rx="8" ry="9" />
      <path className="arena-piece-glint" d="M-4 -28 Q-6 -24 -4 -22" />
      <ellipse className="arena-piece-ring" cy="-5" rx="11" ry="5" />
    </g>
  );
}

export function CompetitionArena({ stage = 0 }: { stage?: number }) {
  const state = arenaStages[stage];
  return (
    <svg
      className="competition-arena"
      viewBox={state.viewBox}
      fill="none"
      aria-hidden="true"
      focusable="false"
      data-stage={stage}
    >
      <g className="arena-drafting">
        <path d="M28 365 H872 M450 46 V556" />
        <ellipse cx="450" cy="365" rx="412" ry="180" strokeDasharray="2 10" />
        {[0, 90, 180, 270].map((angle) => {
          const radians = (angle * Math.PI) / 180;
          const x = 450 + 412 * Math.cos(radians),
            y = 365 + 180 * Math.sin(radians);
          return (
            <path key={angle} d={`M${x - 5} ${y} h10 M${x} ${y - 5} v10`} />
          );
        })}
      </g>
      <path
        className="arena-foundation"
        d="M76 365 A374 163 0 0 0 824 365 V395 A374 163 0 0 1 76 395Z"
      />
      <g className="arena-ribs">
        {Array.from({ length: 57 }, (_, i) => {
          const angle = (i * Math.PI) / 56,
            x = 450 + 374 * Math.cos(angle),
            y = 365 + 163 * Math.sin(angle);
          return <path key={i} d={`M${x} ${y} v29`} />;
        })}
      </g>
      <ellipse className="arena-floor" cx="450" cy="365" rx="374" ry="163" />
      <g className="arena-terraces">
        {[0, 1, 2].map((i) => (
          <ellipse
            key={i}
            cx="450"
            cy="365"
            rx={365 - i * 7}
            ry={158 - i * 4}
          />
        ))}
        {Array.from({ length: 80 }, (_, i) => {
          const angle = (i * Math.PI) / 40;
          return (
            <path
              key={i}
              d={`M${450 + 365 * Math.cos(angle)} ${365 + 158 * Math.sin(angle)} L${450 + 351 * Math.cos(angle)} ${365 + 150 * Math.sin(angle)}`}
            />
          );
        })}
      </g>
      <g className="arena-tracks">
        {[0, 1, 2, 3].map((i) => (
          <ellipse
            key={i}
            cx="450"
            cy="365"
            rx={322 - i * 26}
            ry={134 - i * 13}
          />
        ))}
      </g>
      <g className="arena-traces">
        {[0, 1, 2].map((i) => (
          <ellipse
            className={`arena-trace trace-${i}`}
            transform="rotate(180 450 365)"
            key={i}
            cx="450"
            cy="365"
            rx={322 - i * 26}
            ry={134 - i * 13}
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={state.trace + i * 0.04}
          />
        ))}
      </g>
      <g className="arena-infield">
        <ellipse cx="450" cy="365" rx="212" ry="81" />
        <path d="M263 365 H637 M450 297 V432 M319 313 L581 417 M319 417 L581 313" />
        <ellipse cx="450" cy="365" rx="193" ry="71" />
      </g>
      <g className="arena-players-rear">
        {state.angles.map((angle, index) =>
          trackPoint(angle, index % 3).y < 365 ? (
            <Player key={index} index={index} angle={angle} />
          ) : null,
        )}
      </g>
      <g className="arena-podiums">
        {[314, 586, 450].map((x, index) => {
          const heightIndex = index === 2 ? 1 : index === 1 ? 2 : 0;
          const height = state.heights[heightIndex],
            faces = podiumFaces(x, height);
          return (
            <g
              className={`arena-podium podium-${heightIndex}`}
              data-podium={heightIndex}
              data-x={x}
              data-height={height}
              key={x}
            >
              <polygon className="podium-left" points={faces.left} />
              <polygon className="podium-right" points={faces.right} />
              <polygon className="podium-top" points={faces.top} />
              <g
                className="podium-inlay"
                transform={`translate(${x} ${365 - height})`}
              >
                <path d="M0 -24 L48 0 L0 24 L-48 0Z M0 -19 V19 M-38 0 H38" />
                <ellipse rx="22" ry="11" />
              </g>
            </g>
          );
        })}
      </g>
      <g
        className="arena-award-lift"
        transform={`translate(450 ${353 - state.heights[1]})`}
      >
        <g className="arena-award" opacity={state.award}>
          <g className="award-laurels">
            <path d="M-37 -26 Q-100 -63 -80 -132 M37 -26 Q100 -63 80 -132" />
            {[-1, 1].map((side) => (
              <g key={side} transform={`scale(${side} 1)`}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <path
                    key={i}
                    d={`M${64 + i * 4} ${-46 - i * 16} q-23 -1 -20 -18 q18 1 20 18 q22 -5 18 -24 q-18 7 -18 24Z`}
                  />
                ))}
              </g>
            ))}
          </g>
          <path
            className="award-handle"
            d="M-42 -138 C-93 -158 -80 -86 -31 -95 M42 -138 C93 -158 80 -86 31 -95"
          />
          <path className="award-base-left" d="M-38 -12 L0 0 V12 L-38 0Z" />
          <path className="award-base-right" d="M0 0 L38 -12 V0 L0 12Z" />
          <path className="award-base-top" d="M-38 -12 L0 -26 L38 -12 L0 0Z" />
          <path
            className="award-stem"
            d="M-7 -81 H7 V-35 Q8 -25 21 -22 L0 -14 L-21 -22 Q-8 -25 -7 -35Z"
          />
          <path
            className="award-cup"
            d="M-44 -146 H44 Q40 -91 0 -75 Q-40 -91 -44 -146Z"
          />
          <path className="award-cup-facet" d="M0 -146 H44 Q40 -91 0 -75Z" />
          <ellipse className="award-rim" cy="-146" rx="44" ry="12" />
          <ellipse className="award-inside" cy="-146" rx="34" ry="7" />
          <path
            className="award-engraving"
            d="M-28 -130 Q-23 -98 -6 -90 M28 -130 Q23 -98 6 -90"
          />
          <g className="award-emblem">
            <circle cy="-116" r="16" />
            <path d="M-5 -125 H5 M0 -125 V-107 M-5 -107 H5" />
          </g>
        </g>
      </g>
      <g className="arena-players-front">
        {state.angles.map((angle, index) =>
          trackPoint(angle, index % 3).y >= 365 ? (
            <Player key={index} index={index} angle={angle} />
          ) : null,
        )}
      </g>
      <g className="arena-start-line">
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={i}
            d={`M${682 + (i % 4) * 13} ${393 + Math.floor(i / 4) * 6} l10 3 l-5 3 l-10 -3Z`}
            opacity={i % 2 ? 0.4 : 1}
          />
        ))}
      </g>
    </svg>
  );
}
