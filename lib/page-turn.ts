import { peelGeometry } from './peel-geometry';

export const PAGE_TURN_DURATION = 720;

export function pageTurnFrame(width: number, height: number, progress: number) {
  const { edge, curl } = peelGeometry(width, height, progress);
  const lift = height - edge;
  return {
    paper: `translate3d(0, ${-lift}px, 0)`,
    content: `translate3d(0, ${lift}px, 0)`,
    fold: `translate3d(0, ${-lift}px, 0) scaleY(${curl / height})`,
    curl: curl / height,
  };
}

/** A curved vertical crease, with the page's underside rolling toward the spine. */
export function bookTurnFrame(width: number, height: number, progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  const edge = width * (1 - p);
  const curl = Math.min(
    edge,
    Math.min(width * 0.18, 140) * Math.sin(p * Math.PI),
  );
  const points = Array.from({ length: 25 }, (_, index) => {
    const y = (height * index) / 24;
    const bend = Math.sin((index / 24) * Math.PI) * curl * 0.28;
    return `${Math.max(0, edge - bend)}px ${y}px`;
  });
  const inner = Array.from({ length: 25 }, (_, index) => {
    const y = (height * (24 - index)) / 24;
    const bend = Math.sin(((24 - index) / 24) * Math.PI) * curl * 0.28;
    return `${Math.max(0, edge - bend - curl)}px ${y}px`;
  });
  return {
    clip: `polygon(0px 0px, ${points.join(',')}, 0px ${height}px)`,
    foldClip: `polygon(${points.join(',')},${inner.join(',')})`,
    edge,
    curl,
  };
}
