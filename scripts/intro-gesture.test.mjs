import { test } from 'node:test';
import assert from 'node:assert/strict';
import { IntroGestureGate } from '../lib/intro-gesture.ts';

test('a large wheel fling and its long momentum tail advance only one statement', () => {
  const gate = new IntroGestureGate();
  const steps = [gate.wheel(3000, 0)];
  for (let time = 16; time < 1600; time += 16)
    steps.push(gate.wheel(3000 / (time + 1), time));
  assert.equal(
    steps.reduce((sum, step) => sum + step, 0),
    1,
  );
});

test('separate deliberate gestures can advance successive statements', () => {
  const gate = new IntroGestureGate();
  assert.equal(gate.wheel(100, 0), 1);
  assert.equal(gate.wheel(20, 100), 0);
  assert.equal(gate.wheel(100, 700), 1);
  assert.equal(gate.wheel(100, 1400), 1);
});

test('a gesture started during a transition cannot skip the next statement when it ends', () => {
  const gate = new IntroGestureGate();
  assert.equal(gate.wheel(100, 0, true), 0);
  assert.equal(gate.wheel(100, 100, false), 0);
  assert.equal(gate.wheel(100, 500, false), 1);
});

test('tiny wheel noise does not advance; intentional reverse scrolling does', () => {
  const gate = new IntroGestureGate();
  assert.equal(gate.wheel(3, 0), 0);
  assert.equal(gate.wheel(-3, 30), 0);
  assert.equal(gate.wheel(-10, 60), 0);
  assert.equal(gate.wheel(-20, 90), -1);
  assert.equal(gate.wheel(-1000, 120), 0);
});

test('the final gesture is still recognized as momentum after entering the main site', () => {
  const gate = new IntroGestureGate();
  gate.wheel(100, 0);
  assert.equal(gate.continuingWheel(200), true);
  assert.equal(gate.wheel(20, 200, true), 0);
  assert.equal(gate.continuingWheel(400), true);
  assert.equal(gate.continuingWheel(500), false);
});

test('one long touch swipe advances only once, including direction changes', () => {
  const gate = new IntroGestureGate();
  gate.startTouch();
  assert.equal(gate.touch(20), 0);
  assert.equal(gate.touch(80), 1);
  assert.equal(gate.touch(900), 0);
  assert.equal(gate.touch(-100), 0);
  gate.startTouch();
  assert.equal(gate.touch(-80), -1);
});

test('touch input during a transition stays consumed until the next touch', () => {
  const gate = new IntroGestureGate();
  gate.startTouch();
  assert.equal(gate.touch(80, true), 0);
  assert.equal(gate.touch(180, false), 0);
  gate.startTouch();
  assert.equal(gate.touch(80, false), 1);
});
