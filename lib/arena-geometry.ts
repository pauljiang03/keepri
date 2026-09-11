// Original conceptual arena, independent of any KeepRI game or player result.
export const arenaStages = [
  {
    heights: [12, 24, 12],
    angles: [155, 209, 253, 28, 67, 107],
    award: 0,
    trace: 0.82,
    viewBox: '40 145 820 435',
  },
  {
    heights: [30, 56, 22],
    angles: [208, 270, 324, 79, 124, 171],
    award: 0,
    trace: 0.42,
    viewBox: '25 95 850 485',
  },
  {
    heights: [46, 90, 34],
    angles: [300, 352, 410, 176, 235, 279],
    award: 0,
    trace: 0.08,
    viewBox: '10 35 880 545',
  },
  {
    heights: [56, 110, 40],
    angles: [360, 412, 470, 235, 295, 339],
    award: 1,
    trace: 0,
    viewBox: '0 0 900 580',
  },
];

export function trackPoint(angle: number, lane = 0) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: 450 + (322 - lane * 26) * Math.cos(radians),
    y: 365 + (134 - lane * 13) * Math.sin(radians),
  };
}

export function podiumFaces(x: number, height: number) {
  const y = 365 - height;
  return {
    top: `${x},${y - 32} ${x + 64},${y} ${x},${y + 32} ${x - 64},${y}`,
    left: `${x - 64},${y} ${x},${y + 32} ${x},397 ${x - 64},365`,
    right: `${x},${y + 32} ${x + 64},${y} ${x + 64},365 ${x},397`,
  };
}
