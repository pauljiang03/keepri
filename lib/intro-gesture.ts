// A trackpad's momentum belongs to its original gesture, even after a transition ends.
export class IntroGestureGate {
  private wheelAt = -Infinity;
  private wheelUsed = false;
  private wheelDistance = 0;
  private touchUsed = false;

  continuingWheel(time: number) {
    return this.wheelUsed && time - this.wheelAt < 260;
  }

  wheel(delta: number, time: number, busy = false): -1 | 0 | 1 {
    if (time - this.wheelAt >= 260) {
      this.wheelUsed = false;
      this.wheelDistance = 0;
    }
    this.wheelAt = time;
    if (busy) this.wheelUsed = true;
    if (this.wheelUsed) return 0;
    this.wheelDistance += delta;
    if (Math.abs(this.wheelDistance) < 24) return 0;
    this.wheelUsed = true;
    return this.wheelDistance > 0 ? 1 : -1;
  }

  startTouch() {
    this.touchUsed = false;
  }

  touch(distance: number, busy = false): -1 | 0 | 1 {
    if (busy) this.touchUsed = true;
    if (this.touchUsed || Math.abs(distance) < 36) return 0;
    this.touchUsed = true;
    return distance > 0 ? 1 : -1;
  }
}
