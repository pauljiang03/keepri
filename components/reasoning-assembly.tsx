import {
  assemblyPieces,
  assemblyPosition,
  assemblyTransform,
  pointList,
  projectAssembly,
} from '@/lib/assembly-geometry';

export function ReasoningAssembly({ stage = 0 }: { stage?: number }) {
  const rim: [number, number][] = [
    [-204, -204],
    [204, -204],
    [204, 204],
    [-204, 204],
  ];
  return (
    <svg
      className="reasoning-assembly"
      viewBox="0 0 900 570"
      fill="none"
      aria-hidden="true"
      focusable="false"
      data-stage={stage}
    >
      <g className="assembly-guides">
        <path d="M32 350 H868 M450 158 V544" />
        <polygon
          points={pointList(
            rim.map((p) => projectAssembly([p[0] * 1.12, p[1] * 1.12])),
          )}
          strokeDasharray="2 9"
        />
      </g>
      <path
        className="assembly-base-side"
        d="M83 350 L450 525 L817 350 V370 L450 545 L83 370Z"
      />
      <g className="assembly-ribs">
        {Array.from({ length: 43 }, (_, i) => {
          const x = -204 + (i * 408) / 42;
          const [a, b] = projectAssembly([x, 204]);
          const [c, d] = projectAssembly([204, x]);
          return <path key={i} d={`M${a} ${b} v19 M${c} ${d} v19`} />;
        })}
      </g>
      <polygon
        className="assembly-base-top"
        points={pointList(rim.map((p) => projectAssembly(p)))}
      />
      <g className="assembly-grid">
        {[-180, -120, -60, 0, 60, 120, 180].map((value) => (
          <path
            key={value}
            d={`M${projectAssembly([value, -180]).join(' ')} L${projectAssembly([value, 180]).join(' ')} M${projectAssembly([-180, value]).join(' ')} L${projectAssembly([180, value]).join(' ')}`}
          />
        ))}
        {assemblyPieces.map((piece) => (
          <polygon
            key={piece.index}
            points={pointList(piece.polygon.map((p) => projectAssembly(p)))}
          />
        ))}
      </g>
      {[...assemblyPieces]
        .sort((a, b) => a.anchor[1] - b.anchor[1])
        .map((piece) => {
          const position = assemblyPosition(piece.index, stage);
          return (
            <g
              key={piece.index}
              className={`assembly-piece assembly-piece-${piece.index}`}
              data-piece={piece.index}
              data-x={position.x}
              data-y={position.y}
              data-rotation={position.rotation}
              transform={assemblyTransform(piece.index, position)}
            >
              {piece.sides.map((side, i) => (
                <polygon
                  key={i}
                  className={
                    side.light ? 'assembly-side-light' : 'assembly-side-dark'
                  }
                  points={side.points}
                />
              ))}
              <polygon className="assembly-piece-top" points={piece.top} />
              <polygon className="assembly-inlay" points={piece.inlay} />
              <g
                className="assembly-mark"
                transform={`translate(${piece.anchor.join(' ')})`}
              >
                <ellipse rx="12" ry="6" />
                <path d="M-19 0 H-7 M7 0 H19 M0 -10 V-4 M0 4 V10" />
              </g>
            </g>
          );
        })}
      <g className="assembly-complete" opacity={stage === 2 ? 1 : 0}>
        <path d="M450 506 L774 351 M126 351 L450 506" pathLength="1" />
        <path d="M433 526 L445 532 L470 520" />
      </g>
    </svg>
  );
}
