import { useRef, useEffect } from 'react';

export default function ParticleCanvas({ children, quantity = 80, staticity = 50, ease = 50 }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const circles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animationFrame = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let w, h;

    const resize = () => {
      w = container.clientWidth;
      h = container.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      // Reset any existing transforms and apply DPR scaling once
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initCircles();
    };

    const circleParams = () => ({
      x: Math.floor(Math.random() * w),
      y: Math.floor(Math.random() * h),
      size: Math.random() * 2 + 1,
      alpha: 0,
      targetAlpha: Math.random() * 0.6 + 0.1,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      magnetism: 0.1 + Math.random() * 4,
      translateX: 0,
      translateY: 0,
    });

    const initCircles = () => {
      circles.current = Array.from({ length: quantity }, circleParams);
    };

    const remap = (val, s1, e1, s2, e2) => {
      const r = (val - s1) * (e2 - s2) / (e1 - s1) + s2;
      return r > 0 ? r : 0;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      circles.current = circles.current.filter(circle => {
        // fade near edges
        const edges = [
          circle.x - circle.size,
          w - circle.x - circle.size,
          circle.y - circle.size,
          h - circle.y - circle.size,
        ];
        const closest = Math.min(...edges);
        const factor = remap(closest, 0, 20, 0, 1).toFixed(2);

        circle.alpha = factor > 1
          ? Math.min(circle.targetAlpha, circle.alpha + 0.02)
          : circle.targetAlpha * factor;

        circle.x += circle.dx;
        circle.y += circle.dy;

        // mouse interaction (magnetism)
        circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
        circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

        // out of bounds → replace
        if (circle.x < -circle.size || circle.x > w + circle.size ||
            circle.y < -circle.size || circle.y > h + circle.size) {
          return false; // remove
        }

        // draw
        ctx.beginPath();
        ctx.arc(circle.x + circle.translateX, circle.y + circle.translateY, circle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${circle.alpha})`;
        ctx.fill();
        return true;
      });

      // add missing circles
      while (circles.current.length < quantity) {
        circles.current.push(circleParams());
      }

      animationFrame.current = requestAnimationFrame(draw);
    };

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left - w / 2;
      mouse.current.y = e.clientY - rect.top - h / 2;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouse);
    animationFrame.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(animationFrame.current);
    };
  }, [quantity, staticity, ease]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}