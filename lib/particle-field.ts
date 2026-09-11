// Independently implemented from the measured reference's grid/wave parameters.
export function installParticleField(
  canvas: HTMLCanvasElement,
  exit: { value: number },
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  let width = 0,
    height = 0,
    frame = 0,
    visible = true;
  let staticPainted = false;
  let pointerX = -1000,
    pointerY = -1000,
    x = -1000,
    y = -1000,
    lastMove = -1000,
    idle = 1;
  let dots: {
    x: number;
    y: number;
    trail: number;
    dx: number;
    dy: number;
    distance: number;
    delay: number;
  }[] = [];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function resize() {
    staticPainted = false;
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    const dpr = Math.min(devicePixelRatio, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    dots = [];
    for (let row = 0; row < Math.ceil(height / 26) + 2; row++)
      for (let col = 0; col < Math.ceil(width / 26) + 2; col++) {
        const seed = Math.abs(Math.sin(row * 127.1 + col * 311.7));
        dots.push({
          x: col * 26,
          y: row * 26,
          trail: 0,
          dx: seed * 2 - 1,
          dy: -1.6 + seed * 0.9,
          distance: 0.6 + seed * 1.2,
          delay: seed * 0.3,
        });
      }
  }
  function pointer(event: PointerEvent) {
    const box = canvas.getBoundingClientRect();
    pointerX = event.clientX - box.left;
    pointerY = event.clientY - box.top;
    lastMove = performance.now();
  }
  function draw(time: number) {
    frame = requestAnimationFrame(draw);
    if (
      !visible ||
      document.hidden ||
      document.documentElement.dataset.motion === 'paused'
    )
      return;
    if (reduced.matches && staticPainted) return;
    if (reduced.matches) time = 1000;
    x += (pointerX - x) * 0.12;
    y += (pointerY - y) * 0.12;
    idle += ((time - lastMove < 200 ? 0 : 1) - idle) * 0.04;
    ctx!.clearRect(0, 0, width, height);
    const ax = width * (0.5 + 0.3 * Math.sin(0.00012 * time)),
      ay = height * (0.5 + 0.3 * Math.cos(0.0001 * time));
    const bx = width * (0.5 + 0.34 * Math.cos(0.00008 * time)),
      by = height * (0.5 + 0.28 * Math.sin(0.00014 * time));
    for (const dot of dots) {
      const wave =
        0.5 *
        (Math.sin(0.022 * Math.hypot(dot.x - ax, dot.y - ay) - 0.0016 * time) +
          Math.sin(0.026 * Math.hypot(dot.x - bx, dot.y - by) - 0.0013 * time));
      const energy =
        Math.exp(-((dot.x - x) ** 2 + (dot.y - y) ** 2) / (2 * 130 ** 2)) *
        (1 - idle);
      dot.trail = Math.max(dot.trail * 0.99, energy);
      const level = Math.min(
        1,
        Math.max(0, Math.max(Math.max(0, wave) * idle * 1.4, dot.trail)),
      );
      const shimmer =
        0.5 + 0.5 * Math.sin(0.016 * dot.x + 0.016 * dot.y + 0.00035 * time);
      const fade = Math.min(1, Math.max(0, (height - dot.y) / 300));
      const progress = Math.max(
        0,
        Math.min(1, (exit.value - dot.delay) / (1 - dot.delay)),
      );
      const travel =
        progress ** 2 * 1.05 * Math.hypot(width, height) * dot.distance;
      const alpha =
        (0.2 + 0.03 * shimmer + 0.24 * level) * fade * (1 - progress ** 2);
      const radius =
        (0.8 + 0.18 * shimmer + 1.5 * level) * fade * (1 - 0.3 * progress);
      if (alpha < 0.005 || radius < 0.1) continue;
      ctx!.fillStyle = `rgba(${Math.round(100 + level * 135)},${Math.round(119 + level * 124)},${Math.round(91 + level * 130)},${alpha})`;
      ctx!.beginPath();
      ctx!.arc(
        dot.x + dot.dx * travel,
        dot.y + dot.dy * travel,
        radius,
        0,
        Math.PI * 2,
      );
      ctx!.fill();
    }
    staticPainted = reduced.matches;
  }
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  intersection.observe(canvas);
  window.addEventListener('pointermove', pointer, { passive: true });
  resize();
  frame = requestAnimationFrame(draw);
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    intersection.disconnect();
    window.removeEventListener('pointermove', pointer);
  };
}
