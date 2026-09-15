export const PAGE_TURN_DURATION = 720;
export const pageTurnTransform = (progress: number) =>
  `perspective(2800px) rotateX(${-90 * Math.max(0, Math.min(1, progress))}deg)`;
