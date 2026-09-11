// Closed, matching cubic contours can interpolate without a morphing plugin.
// This is an abstract brand illustration, not a product view or a data chart.
export const SIGNAL_THREADS = 32;
type Point = [number, number];

export function signalPath(thread: number, chapter = 0) {
  const points: Point[] = [];
  const count = 36;
  const depth = thread / (SIGNAL_THREADS - 1);
  const radius = 158 + depth * 218;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    let x: number;
    let y: number;
    if (chapter === 1) {
      x = radius * (Math.cos(t) + 0.3 * Math.sin(2 * t));
      y = radius * (0.94 * Math.sin(t) + 0.19 * Math.cos(3 * t));
    } else if (chapter === 2) {
      x = radius * 1.7 * Math.cos(t);
      y = radius * (0.42 * Math.sin(t) + 0.21 * Math.sin(3 * t));
    } else if (chapter === 3) {
      x = radius * (1.18 * Math.cos(t) + 0.16 * Math.cos(5 * t));
      y = radius * (0.77 * Math.sin(t) + 0.1 * Math.sin(4 * t));
    } else {
      x = radius * (1.35 * Math.cos(t) + 0.23 * Math.cos(3 * t));
      y = radius * (0.62 * Math.sin(t) + 0.18 * Math.sin(2 * t));
    }
    const angle =
      (chapter === 1 ? -0.47 : chapter === 2 ? 0.12 : -0.2) + depth * 0.13;
    points.push([
      800 + x * Math.cos(angle) - y * Math.sin(angle),
      500 + x * Math.sin(angle) + y * Math.cos(angle),
    ]);
  }
  const format = (value: number) => value.toFixed(2);
  let path = `M${points[0].map(format).join(',')}`;
  for (let i = 0; i < count; i++) {
    const before = points[(i + count - 1) % count];
    const start = points[i];
    const end = points[(i + 1) % count];
    const after = points[(i + 2) % count];
    const first: Point = [
      start[0] + (end[0] - before[0]) / 6,
      start[1] + (end[1] - before[1]) / 6,
    ];
    const second: Point = [
      end[0] - (after[0] - start[0]) / 6,
      end[1] - (after[1] - start[1]) / 6,
    ];
    path += `C${[...first, ...second, ...end].map(format).join(',')}`;
  }
  return `${path}Z`;
}
