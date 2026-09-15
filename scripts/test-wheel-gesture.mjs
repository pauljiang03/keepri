import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const source = ts.transpileModule(
  readFileSync(new URL('../lib/wheel-gesture.ts', import.meta.url), 'utf8'),
  { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } },
).outputText.replace('export function', 'function');
const create = runInNewContext(`${source}\ncreateWheelGesture`);
function trace(samples) {
  const gesture = create();
  let now = 0;
  return samples.flatMap(([delta, gap = 16, blocked = false]) => {
    now += gap;
    const direction = gesture(delta, now, blocked);
    return direction ? [direction] : [];
  });
}

test('one long swipe with sparse momentum advances only once', () => {
  assert.deepEqual(trace([90, 70, 55, 40, 30, 22, 16, 12, 8, 4, 2].map(d => [d, 120])), [1]);
});
test('noisy momentum and tiny sign changes do not become new swipes', () => {
  assert.deepEqual(trace([90, 50, 20, 3, 10, 2, -2, 9, 1, 8, 2, 4, 6, 8].map(d => [d])), [1]);
});
test('a separate building impulse can advance before momentum expires', () => {
  assert.deepEqual(trace([60, 40, 20, 5, 2, 8, 16, 28, 40, 20, 8, 2].map(d => [d])), [1, 1]);
});
test('a deliberate reversal is responsive', () => {
  assert.deepEqual(trace([[14], [-14]]), [1, -1]);
});
test('a new small swipe after silence stays sensitive', () => {
  assert.deepEqual(trace([[14], [4, 260], [4], [4]]), [1, 1]);
});
test('momentum from the intro cannot advance the reading pages', () => {
  assert.deepEqual(trace([[60, 16, true], [40], [20], [8], [2], [14, 260]]), [1]);
});
