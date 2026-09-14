import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  betaDensity,
  posterior,
  createSurface,
  linePath,
  SURFACE_LAYERS,
  SURFACE_SAMPLES,
} from '../lib/bayesian-surface.ts';
const close = (actual, expected, tolerance = 1e-10) =>
  assert(Math.abs(actual - expected) < tolerance, `${actual} != ${expected}`);

test('beta densities match uniform and polynomial cases, including endpoints', () => {
  for (const x of [0, 0.1, 0.5, 0.9, 1]) {
    close(betaDensity(x, 1, 1), 1);
    close(betaDensity(x, 2, 2), 6 * x * (1 - x));
    close(betaDensity(x, 1, 3), 3 * (1 - x) ** 2);
  }
  assert.equal(betaDensity(-0.1, 2, 2), 0);
  assert.equal(betaDensity(1.1, 2, 2), 0);
});

test('densities integrate to one at symmetric and extreme control settings', () => {
  for (const [alpha, beta] of [
    [1, 1],
    [2, 2],
    [30, 14],
    [1, 81],
    [81, 1],
    [92, 92],
  ]) {
    const steps = 10000;
    let sum = (betaDensity(0, alpha, beta) + betaDensity(1, alpha, beta)) / 2;
    for (let i = 1; i < steps; i++) sum += betaDensity(i / steps, alpha, beta);
    close(sum / steps, 1, 0.00001);
  }
});

test('posterior moments reflect the prior and observed counts', () => {
  const model = posterior(28, 12, 4);
  assert.equal(model.alpha, 30);
  assert.equal(model.beta, 14);
  close(model.mean, 30 / 44);
  close(model.deviation, Math.sqrt((30 * 14) / (44 * 44 * 45)));
  const mirrored = posterior(12, 28, 4);
  close(model.mean + mirrored.mean, 1);
  close(model.deviation, mirrored.deviation);
  close(posterior(0, 0, 2).mean, 0.5);
  assert(posterior(40, 40, 4).deviation < posterior(4, 4, 4).deviation);
});

test('surface remains finite at all boundary combinations and includes the exact posterior', () => {
  for (const successes of [0, 28, 80])
    for (const failures of [0, 12, 80])
      for (const strength of [2, 4, 24]) {
        const surface = createSurface(successes, failures, strength);
        assert.equal(surface.curves.length, SURFACE_LAYERS);
        assert(
          surface.curves.every((curve) => curve.length === SURFACE_SAMPLES),
        );
        const end = surface.curves.at(-1);
        for (let i = 0; i < end.length; i++) {
          const expected = betaDensity(
            i / (SURFACE_SAMPLES - 1),
            surface.alpha,
            surface.beta,
          );
          close(((100 - end[i][1]) * surface.peak) / 190, expected);
        }
        for (const path of [...surface.curves, ...surface.rails, surface.means])
          assert(!/NaN|Infinity/.test(linePath(path)));
      }
});
