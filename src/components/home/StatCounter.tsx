"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
export default function StatCounter({ value, label, icon, suffix = "" }: { value: number; label: string; icon: React.ReactNode; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <div ref={ref} className="card-elevated text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-light text-green-deep">{icon}</div>
      <div className="font-display text-3xl font-bold text-green-deep sm:text-4xl">{count.toLocaleString()}{suffix}</div>
      <div className="mt-2 text-sm font-medium uppercase tracking-wider text-ink/60">{label}</div>
    </div>
  );
}