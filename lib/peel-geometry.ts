type Point = { x: number; y: number };

// Clip against a diagonal fold in viewport coordinates. Unlike percentage
// triangles, this keeps the paper edge at 45 degrees at every aspect ratio.
export function clipPaper(points: Point[], edge: number): Point[] {
  const result: Point[] = [];
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const da = a.x - a.y - edge;
    const db = b.x - b.y - edge;
    if (da <= 0) result.push(a);
    if (da <= 0 !== db <= 0) {
      const t = da / (da - db);
      result.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
    }
  }
  return result;
}

export function peelGeometry(width: number, height: number, progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  const curl = Math.min(width, height) * 0.16 * Math.sin(p * Math.PI);
  const edge = width - (width + height) * p;
  const rectangle = [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
  ];
  const paper = clipPaper(rectangle, edge);
  // Reflect the narrow strip on the lifted side back across the crease.
  const strip = clipPaper(rectangle, edge + curl);
  const lifted = clipPaper(
    strip.map(({ x, y }) => ({ x: -x, y: -y })),
    -edge,
  ).map(({ x, y }) => ({ x: -y + edge, y: -x - edge }));
  const points = (vertices: Point[]) =>
    vertices.map(({ x, y }) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
  return {
    clip: `polygon(${paper.length >= 3 ? paper.map(({ x, y }) => `${x.toFixed(2)}px ${y.toFixed(2)}px`).join(',') : '0px 0px,0px 0px,0px 0px'})`,
    fold: points(lifted),
    edge,
    curl,
  };
}
