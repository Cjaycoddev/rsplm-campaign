"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, HeartHandshake, Rocket, Globe, type LucideIcon } from "lucide-react";

interface LeadershipCard {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  image: string;
}

const LEADERSHIP: LeadershipCard[] = [
  {
    id: "reform",
    icon: Shield,
    title: "Reform-Driven",
    desc: "Championing governance reform to transition South Sudan from instability to structured, accountable leadership.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "unity",
    icon: HeartHandshake,
    title: "Unity Builder",
    desc: "Bringing all communities together, bridging ethnic, regional, and generational divides for lasting national cohesion.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "youth",
    icon: Rocket,
    title: "Youth Advocate",
    desc: "Giving young South Sudanese a real stake in the country's future through opportunity, inclusion, and representation.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "global",
    icon: Globe,
    title: "Global Vision",
    desc: "Reconnecting South Sudan to the world, empowering the diaspora and rebuilding international confidence.",
    image: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1200&auto=format&fit=crop",
  },
];

const DESKTOP_POS = [
  { x: 0, y: 0, rotate: -2, scale: 1, z: 40 },
  { x: -8, y: -14, rotate: 2, scale: 0.97, z: 30 },
  { x: 8, y: -28, rotate: -1, scale: 0.94, z: 20 },
  { x: 0, y: -42, rotate: 3, scale: 0.91, z: 10 },
];

const MOBILE_POS = [
  { x: 0, y: 0, rotate: 0, scale: 1, z: 40 },
  { x: 0, y: -8, rotate: 1.2, scale: 0.97, z: 30 },
  { x: 0, y: -16, rotate: -1, scale: 0.94, z: 20 },
  { x: 0, y: -24, rotate: 0.8, scale: 0.91, z: 10 },
];

const SWIPE = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

export default function CardDeck() {
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [paused, setPaused] = useState(false);
  const [compact, setCompact] = useState(true);
  const skipTap = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setCompact(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
    }, 4500);
    return () => window.clearInterval(id);
  }, [paused]);

  const sendToBack = (i: number) => {
    setOrder((o) => (o[0] === i ? [...o.slice(1), o[0]] : o));
  };

  const bringToFront = (i: number) => {
    setOrder((o) => [i, ...o.filter((x) => x !== i)]);
  };

  const stack = compact ? MOBILE_POS : DESKTOP_POS;

  return (
    <div
      className="relative mx-auto w-full max-w-md select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="relative aspect-[4/5] overflow-visible">
        {LEADERSHIP.map((card, i) => {
          const position = order.indexOf(i);
          const pos = stack[position] ?? stack[stack.length - 1];
          const isFront = position === 0;
          const Icon = card.icon;

          return (
            <motion.div
              key={card.id}
              drag={isFront ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.85}
              dragSnapToOrigin
              onDragStart={() => setPaused(true)}
              onDragEnd={(_, info) => {
                setPaused(false);
                if (Math.abs(info.offset.x) > 72 || Math.abs(info.velocity.x) > 500) {
                  skipTap.current = true;
                  sendToBack(i);
                }
              }}
              onTap={() => {
                if (skipTap.current) {
                  skipTap.current = false;
                  return;
                }
                if (isFront) sendToBack(i);
              }}
              animate={{ x: pos.x, y: pos.y, rotate: pos.rotate, scale: pos.scale }}
              transition={SWIPE}
              style={{ zIndex: pos.z, willChange: "transform" }}
              className={`absolute inset-0 touch-pan-y overflow-hidden rounded-3xl border-2 border-gold/50 bg-white shadow-[0_25px_60px_-20px_rgba(11,93,42,0.35)] ${
                isFront ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
              }`}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                className="pointer-events-none object-cover"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="relative flex h-full flex-col justify-between p-6 text-white sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white shadow-sm backdrop-blur-md sm:h-14 sm:w-14">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <div>
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                    People First
                  </div>
                  <h3 className="font-display text-2xl font-bold leading-tight drop-shadow-lg sm:text-4xl">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/85 drop-shadow-md sm:mt-4">
                    {card.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-white/20 pt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  <span>R-SPLM/F 2026</span>
                  <span>Swipe or tap</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-5 flex justify-center gap-2">
        {LEADERSHIP.map((card, i) => {
          const isFront = order[0] === i;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => bringToFront(i)}
              className={`relative h-11 w-11 overflow-hidden rounded-xl border-2 transition-transform duration-300 ease-out sm:h-12 sm:w-12 ${
                isFront ? "scale-110 border-gold" : "border-ink/15 opacity-80"
              }`}
              aria-label={card.title}
            >
              <Image src={card.image} alt="" fill className="object-cover" sizes="48px" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
