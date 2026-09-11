// A conceptual decision path: options, feedback, revision, and another question.
export function ReasoningPaths({
  className = '',
  stage = 0,
}: {
  className?: string;
  stage?: number;
}) {
  return (
    <svg
      className={`reasoning-paths ${className}`}
      viewBox="0 0 720 400"
      fill="none"
      aria-hidden="true"
      focusable="false"
      data-stage={stage}
    >
      <g className="reasoning-options">
        <path d="M80 200 C145 200 160 85 250 85 H440" />
        <path d="M80 200 H595" />
        <path d="M80 200 C145 200 160 315 250 315 H430" />
      </g>
      <path
        className="reasoning-trace reasoning-attempt"
        pathLength={1}
        d="M80 200 C145 200 160 85 250 85 H440"
      />
      <path
        className="reasoning-trace reasoning-revision"
        pathLength={1}
        d="M440 85 C485 85 485 145 425 145 H305 C270 145 255 175 255 200 H595"
      />
      <path
        className="reasoning-trace reasoning-return"
        pathLength={1}
        d="M595 200 V325 Q595 365 555 365 H120 Q80 365 80 325 V240"
      />
      <g className="reasoning-junctions">
        <circle cx="80" cy="200" r="14" />
        <circle cx="250" cy="85" r="8" />
        <circle cx="255" cy="200" r="8" />
        <circle cx="250" cy="315" r="8" />
      </g>
      <g className="reasoning-feedback">
        <circle cx="455" cy="85" r="16" />
        <path d="M449 79 L461 91 M461 79 L449 91" />
      </g>
      <g className="reasoning-insight">
        <circle cx="615" cy="200" r="20" />
        <path d="M606 200 L612 206 L624 193" />
      </g>
      <path className="reasoning-return-tip" d="M72 251 L80 240 L88 251" />
    </svg>
  );
}
