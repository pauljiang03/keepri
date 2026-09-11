// Original interlocking geometry for the idea of building your own understanding.
// This is a conceptual illustration, not a screen or puzzle from the app.
type Point = [number, number];
const grid: Point[][] = [
  [
    [-180, -180],
    [-55, -180],
    [65, -180],
    [180, -180],
  ],
  [
    [-180, -60],
    [-80, -70],
    [50, -40],
    [180, -60],
  ],
  [
    [-180, 65],
    [-45, 50],
    [80, 80],
    [180, 65],
  ],
  [
    [-180, 180],
    [-65, 180],
    [55, 180],
    [180, 180],
  ],
];

function edge(a: Point, b: Point, keyed: boolean): Point[] {
  if (!keyed) return [a, b];
  const dx = b[0] - a[0],
    dy = b[1] - a[1],
    length = Math.hypot(dx, dy);
  return [
    a,
    [a[0] + dx * 0.35, a[1] + dy * 0.35],
    [
      a[0] + dx * 0.35 - (dy / length) * 16,
      a[1] + dy * 0.35 + (dx / length) * 16,
    ],
    [
      a[0] + dx * 0.65 - (dy / length) * 16,
      a[1] + dy * 0.65 + (dx / length) * 16,
    ],
    [a[0] + dx * 0.65, a[1] + dy * 0.65],
    b,
  ];
}

export function projectAssembly([x, y]: Point, height = 0): Point {
  return [450 + (x - y) * 0.9, 350 + (x + y) * 0.43 - height];
}
export const pointList = (points: Point[]) =>
  points.map((p) => p.join(',')).join(' ');

export const assemblyPieces = Array.from({ length: 9 }, (_, index) => {
  const row = Math.floor(index / 3),
    col = index % 3;
  const a = grid[row][col],
    b = grid[row][col + 1],
    c = grid[row + 1][col + 1],
    d = grid[row + 1][col];
  const polygon = [
    ...edge(a, b, row > 0).slice(0, -1),
    ...edge(b, c, col < 2).slice(0, -1),
    ...edge(d, c, row < 2)
      .reverse()
      .slice(0, -1),
    ...edge(a, d, col > 0)
      .reverse()
      .slice(0, -1),
  ];
  const center: Point = [
    (a[0] + b[0] + c[0] + d[0]) / 4,
    (a[1] + b[1] + c[1] + d[1]) / 4,
  ];
  const anchor = projectAssembly(center, 26);
  const top = polygon.map((p) => projectAssembly(p, 26));
  const sides = polygon.map((p, i) => {
    const next = polygon[(i + 1) % polygon.length];
    return {
      points: pointList([
        projectAssembly(p, 26),
        projectAssembly(next, 26),
        projectAssembly(next),
        projectAssembly(p),
      ]),
      light: next[0] - p[0] > next[1] - p[1],
    };
  });
  const inlay = polygon.map((p) =>
    projectAssembly(
      [
        center[0] + (p[0] - center[0]) * 0.78,
        center[1] + (p[1] - center[1]) * 0.78,
      ],
      26,
    ),
  );
  return {
    index,
    polygon,
    anchor,
    top: pointList(top),
    sides,
    inlay: pointList(inlay),
  };
});

export function assemblyPosition(index: number, stage: number) {
  const anchor = assemblyPieces[index].anchor;
  if (stage === 2) return { x: 0, y: 0, rotation: 0 };
  if (stage === 1)
    return index === 4
      ? { x: 36, y: -128, rotation: 9 }
      : { x: (anchor[0] - 450) * 0.07, y: -12, rotation: 0 };
  return index === 4
    ? { x: 210, y: -202, rotation: -14 }
    : {
        x: (anchor[0] - 450) * 0.32,
        y: (anchor[1] - 324) * 0.3 - 20,
        rotation: ((index % 3) - 1) * 7,
      };
}

export function assemblyTransform(
  index: number,
  position: { x: number; y: number; rotation: number },
) {
  const [x, y] = assemblyPieces[index].anchor;
  return `translate(${position.x} ${position.y}) rotate(${position.rotation} ${x} ${y})`;
}
