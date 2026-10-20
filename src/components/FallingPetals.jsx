import { useEffect, useRef } from "react";

const COLORS = ["#fbcfe8", "#f9a8d4", "#fecdd3", "#fda4af", "#fce7f3"];

export default function FallingPetals() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0,
      h = 0,
      raf = 0,
      t = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const make = (initial) => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : -30,
      s: 7 + Math.random() * 9,
      vy: 0.4 + Math.random() * 0.8,
      sway: 0.4 + Math.random() * 1.1,
      phase: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.03,
      flip: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 0.45 + Math.random() * 0.4,
    });

    const count = w < 640 ? 14 : 26;
    const petals = Array.from({ length: count }, () => make(true));

    const draw = (p) => {
      const s = p.s;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(1, Math.abs(Math.cos(p.flip)) * 0.7 + 0.3);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.9, -s * 0.6, s * 0.8, s * 0.7, 0, s);
      ctx.bezierCurveTo(-s * 0.8, s * 0.7, -s * 0.9, -s * 0.6, 0, -s);
      ctx.fill();
      ctx.restore();
    };

    const loop = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.y += p.vy;
        p.x += Math.sin(t * 0.01 + p.phase) * p.sway * 0.6;
        p.rot += p.vr;
        p.flip += 0.02;
        if (p.y > h + 30) Object.assign(p, make(false));
        draw(p);
      }
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
