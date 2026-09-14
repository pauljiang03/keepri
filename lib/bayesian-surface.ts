export type Vector3 = [number, number, number];
export const SURFACE_LAYERS = 25;
export const SURFACE_SAMPLES = 65;

// Integer-shape beta densities evaluated in log space. UI controls keep both
// shapes in [1, 92]. Formula: NIST e-Handbook, section 1.3.6.6.17.
const logFactorial = [0];
for (let n = 1; n <= 200; n++)
  logFactorial[n] = logFactorial[n - 1] + Math.log(n);
export function betaDensity(x: number, alpha: number, beta: number) {
  if (x < 0 || x > 1) return 0;
  if (x === 0) return alpha === 1 ? beta : 0;
  if (x === 1) return beta === 1 ? alpha : 0;
  return Math.exp(
    (alpha - 1) * Math.log(x) +
      (beta - 1) * Math.log1p(-x) -
      logFactorial[alpha - 1] -
      logFactorial[beta - 1] +
      logFactorial[alpha + beta - 1],
  );
}
export function posterior(
  successes: number,
  failures: number,
  strength: number,
) {
  const alpha = strength / 2 + successes;
  const beta = strength / 2 + failures;
  const total = alpha + beta;
  return {
    alpha,
    beta,
    mean: alpha / total,
    deviation: Math.sqrt((alpha * beta) / (total * total * (total + 1))),
  };
}
export function createSurface(
  successes: number,
  failures: number,
  strength: number,
) {
  const distributions = Array.from({ length: SURFACE_LAYERS }, (_, layer) => {
    const fraction = layer / (SURFACE_LAYERS - 1);
    // Proportional accumulation is a visualization path, not a claimed order
    // of real observations. Each displayed slice uses integer observations.
    const model = posterior(
      Math.round(successes * fraction),
      Math.round(failures * fraction),
      strength,
    );
    const densities = Array.from({ length: SURFACE_SAMPLES }, (_, i) =>
      betaDensity(i / (SURFACE_SAMPLES - 1), model.alpha, model.beta),
    );
    return { ...model, densities, fraction };
  });
  const peak = Math.max(
    1,
    ...distributions.flatMap((layer) => layer.densities),
  );
  const scale = 190 / peak;
  const curves: Vector3[][] = distributions.map((layer) =>
    layer.densities.map((density, i) => [
      -185 + (i / (SURFACE_SAMPLES - 1)) * 370,
      100 - density * scale,
      -145 + layer.fraction * 260,
    ]),
  );
  const rails = Array.from({ length: 17 }, (_, i) =>
    curves.map((curve) => curve[i * 4]),
  );
  const means: Vector3[] = distributions.map((layer) => [
    -185 + layer.mean * 370,
    100 - betaDensity(layer.mean, layer.alpha, layer.beta) * scale,
    -145 + layer.fraction * 260,
  ]);
  return {
    curves,
    rails,
    means,
    peak,
    ...posterior(successes, failures, strength),
  };
}
export function project([x, y, z]: Vector3, yaw = -0.48, pitch = 0.34) {
  const dx = x * Math.cos(yaw) + z * Math.sin(yaw);
  const dz = -x * Math.sin(yaw) + z * Math.cos(yaw);
  const dy = y * Math.cos(pitch) - dz * Math.sin(pitch);
  const depth = y * Math.sin(pitch) + dz * Math.cos(pitch);
  const scale = 850 / (850 - depth);
  return { x: 300 + dx * scale, y: 245 + dy * scale, scale };
}
export function linePath(points: Vector3[], yaw = -0.48, pitch = 0.34) {
  return points
    .map((point, i) => {
      const projected = project(point, yaw, pitch);
      return `${i ? 'L' : 'M'}${projected.x.toFixed(2)},${projected.y.toFixed(2)}`;
    })
    .join(' ');
}
