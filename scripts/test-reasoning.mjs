import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  acceptsSequence,
  parseSequence,
  remainingHypotheses,
} from '../lib/reasoning-challenge.ts';

test('input accepts bounded whole numbers, including negatives and zero', () => {
  assert.deepEqual(parseSequence(['-999', '0', '999']), [-999, 0, 999]);
  assert.deepEqual(parseSequence([' 2 ', '4', '6']), [2, 4, 6]);
  for (const fields of [
    ['', '4', '6'],
    ['1.5', '4', '6'],
    ['NaN', '4', '6'],
    ['1000', '4', '6'],
    ['1e2', '4', '6'],
    ['2', '4'],
  ]) {
    assert.equal(parseSequence(fields), null);
  }
});

test('the hidden rule accepts strictly increasing triples, regardless of parity or spacing', () => {
  for (const values of [
    [1, 2, 9],
    [-9, -8, 0],
    [2, 4, 6],
  ])
    assert.equal(acceptsSequence(values), true);
  for (const values of [
    [6, 4, 2],
    [2, 2, 6],
    [3, 7, 5],
  ])
    assert.equal(acceptsSequence(values), false);
});

test('confirming examples do not falsely eliminate alternative explanations', () => {
  const remaining = remainingHypotheses([true, true, true], [8, 10, 12]);
  assert.deepEqual(remaining, [true, true, true]);
});

test('disconfirming tests eliminate explanations permanently while retaining the real rule', () => {
  let remaining = remainingHypotheses([true, true, true], [6, 4, 2]);
  assert.deepEqual(remaining, [false, true, true]);
  remaining = remainingHypotheses(remaining, [1, 2, 9]);
  assert.deepEqual(remaining, [false, false, true]);
  assert.deepEqual(remainingHypotheses(remaining, [2, 4, 6]), [
    false,
    false,
    true,
  ]);
});
