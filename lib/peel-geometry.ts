type Point = { x: number; y: number };

// Keep the paper above a horizontal crease that travels from bottom to top.
export function clipPaper(points: Point[], edge: number): Point[] {
  const result: Point[] = [];
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const da = a.y - edge;
    const db = b.y - edge;
    if (da <= 0) result.push(a);
    if (da <= 0 !== db <= 0) {
      const t = da / (da - db);
      result.push({ x: a.x + (b.x - a.x) * t, y: edge });
    }
  }
  return result;
}

export function peelGeometry(width: number, height: number, progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  const edge = height * (1 - p);
  const curl = Math.min(
    edge,
    Math.min(width, height) * 0.16 * Math.sin(p * Math.PI),
  );
  // The lifted underside folds back above the moving bottom edge.
  const foldTop = Math.max(0, edge - curl);
  return {
    clip: `polygon(0px 0px,${width}px 0px,${width}px ${edge}px,0px ${edge}px)`,
    fold: `0,${foldTop} ${width},${foldTop} ${width},${edge} 0,${edge}`,
    edge,
    curl,
  };
}
