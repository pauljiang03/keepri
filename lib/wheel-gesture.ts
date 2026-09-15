/** Wheel events have no gesture-end signal; keep inertial tails in one gesture. */
export function createWheelGesture() {
  let lastTime = -Infinity;
  let direction = 0;
  let previous = 0;
  let peak = 0;
  let valley = 0;
  let rises = 0;
  let distance = 0;
  let used = false;

  return (delta: number, now: number, blocked = false) => {
    const magnitude = Math.abs(delta);
    if (!magnitude) return 0;
    const sign = Math.sign(delta);
    const idle = now - lastTime > 240;
    // Ignore tiny sign changes at the end of a trackpad's inertial tail.
    const reversed = sign !== direction && magnitude >= 12;
    if (idle || reversed) {
      direction = sign;
      previous = 0;
      peak = 0;
      rises = 0;
      distance = 0;
      used = blocked;
    }
    lastTime = now;
    if (sign !== direction) return 0;

    // A separate swipe must build a sustained impulse. A single noisy tail
    // sample (or a short delivery gap) must never queue another page.
    if (used && magnitude > previous + 1) {
      if (!rises) valley = previous;
      rises++;
      if (
        rises >= 3 &&
        valley <= peak * 0.4 &&
        magnitude >= Math.max(12, valley * 3, peak * 0.35)
      ) {
        used = blocked;
        distance = 0;
        peak = magnitude;
        rises = 0;
      }
    } else {
      rises = 0;
    }
    previous = magnitude;
    peak = Math.max(peak, magnitude);
    if (blocked) used = true;
    if (used) return 0;
    distance += magnitude;
    if (distance < 12) return 0;
    used = true;
    return direction;
  };
}
