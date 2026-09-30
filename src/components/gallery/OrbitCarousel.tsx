"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface OrbitItem {
  src: string;
  title: string;
  caption: string;
}

export default function OrbitCarousel({ items }: { items: OrbitItem[] }) {
  const [angle, setAngle] = useState(0);
  const [radius, setRadius] = useState(420);
  const [cardW, setCardW] = useState(240);
  const [cardH, setCardH] = useState(325);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setRadius(150); setCardW(120); setCardH(165);
      } else if (w < 768) {
        setRadius(230); setCardW(160); setCardH(220);
      } else if (w < 1280) {
        setRadius(340); setCardW(200); setCardH(275);
      } else {
        setRadius(460); setCardW(240); setCardH(325);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const step = (t: number) => {
      if (lastRef.current === 0) lastRef.current = t;
      const dt = t - lastRef.current;
      lastRef.current = t;
      if (!pausedRef.current) {
        setAngle((a) => (a + dt * 0.008) % 360);
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const count = items.length;
  const anglePer = count > 0 ? 360 / count : 0;

  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden"
      style={{ height: cardH + 200 }}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
        style={{ width: radius * 2 + 260, height: radius * 2 + 260 }}
      />

      <div className="relative" style={{ width: 0, height: 0 }}>
        {items.map((item, i) => {
          const a = ((anglePer * i + angle) * Math.PI) / 180;
          const x = Math.cos(a) * radius;
          const z = Math.sin(a) * radius;

          const depth = (z + radius) / (2 * radius);
          const scale = 0.7 + depth * 0.45;
          const opacity = 0.55 + depth * 0.45;
          const zIndex = Math.round(depth * 100);
          const isFront = depth > 0.75;

          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%, -50%) translateX(${x}px) scale(${scale})`,
                width: cardW,
                height: cardH,
                opacity,
                zIndex,
                willChange: "transform, opacity",
                boxShadow: isFront
                  ? "0 25px 60px -20px rgba(11,93,42,0.7)"
                  : "0 10px 30px -15px rgba(0,0,0,0.4)",
                borderRadius: "1rem",
                transition: "box-shadow 400ms ease-out",
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="600px"
                  quality={95}
                  priority={isFront}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-4">
                  <div className="font-display text-xs font-bold leading-tight sm:text-sm">
                    {item.title}
                  </div>
                  <div className="mt-0.5 line-clamp-1 text-[10px] text-white/70">
                    {item.caption}
                  </div>
                </div>
                <div className="pointer-events-none absolute right-2 top-2 h-6 w-6 rounded-full border border-gold/60 bg-gold/20 backdrop-blur-md" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}