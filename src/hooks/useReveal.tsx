"use client";
import { useRef, useEffect, useState, type ReactNode } from "react";

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, delay = 0, rotate = 0 }: { children: ReactNode; delay?: number; rotate?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? `translateY(0) rotate(${rotate}deg)` : `translateY(30px) rotate(${rotate + 2}deg)`,
      transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

export { useReveal, Reveal };
