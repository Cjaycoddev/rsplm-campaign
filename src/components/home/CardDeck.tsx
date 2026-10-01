"use client";

import { useEffect, useState } from "react";
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
    // Strong, authoritative image (e.g., a leader speaking or a formal setting)
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "unity",
    icon: HeartHandshake,
    title: "Unity Builder",
    desc: "Bringing all communities together  bridging ethnic, regional, and generational divides for lasting national cohesion.",
    // Warm, communal image (e.g., people gathering or hands together)
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "youth",
    icon: Rocket,
    title: "Youth Advocate",
    desc: "Giving young South Sudanese a real stake in the country's future through opportunity, inclusion, and representation.",
    // Energetic, youthful image (e.g., young people collaborating or learning)
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "global",
    icon: Globe,
    title: "Global Vision",
    desc: "Reconnecting South Sudan to the world  empowering the diaspora and rebuilding international confidence.",
    // Sweeping, global image (e.g., a flag or a global landmark)
    image: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1200&auto=format&fit=crop",
  },
];

const POSITIONS = [
  { x: 0,  y: 0,   rotate: -2, scale: 1.00, z: 40 },
  { x: -8, y: -14, rotate:  2, scale: 0.97, z: 30 },
  { x:  8, y: -28, rotate: -1, scale: 0.94, z: 20 },
  { x:  0, y: -42, rotate:  3, scale: 0.91, z: 10 },
];

export default function CardDeck() {
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
    }, 5000);
    return () => clearInterval(id);
  }, [paused]);

  const sendToBack = (i: number) => {
    setOrder((o) => (o[0] === i ? [...o.slice(1), o[0]] : o));
  };

  return (
    <div
      className="relative mx-auto aspect-[4/5] w-full max-w-md select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {LEADERSHIP.map((card, i) => {
        const position = order.indexOf(i);
        const pos = POSITIONS[position];
        const isFront = position === 0;
        const Icon = card.icon;

        return (
          <motion.div
            key={card.id}
            onClick={() => sendToBack(i)}
            animate={{ x: pos.x, y: pos.y, rotate: pos.rotate, scale: pos.scale }}
            transition={{ type: "spring", damping: 20, stiffness: 220, mass: 0.8 }}
            style={{ zIndex: pos.z }}
            className={`absolute inset-0 overflow-hidden rounded-3xl border-2 border-gold/50 bg-white shadow-[0_25px_60px_-20px_rgba(11,93,42,0.35)] ${
              isFront ? "cursor-pointer" : "cursor-default"
            }`}
          >
            {/* Full-bleed background image */}
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
            />

            {/* Dark gradient overlay for text readability */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative flex h-full flex-col justify-between p-8 text-white">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white shadow-sm backdrop-blur-md">
                  <Icon className="h-7 w-7" />
                </div>
              </div>

              <div>
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                  People First
                </div>
                <h3 className="font-display text-3xl font-bold leading-tight drop-shadow-lg sm:text-4xl">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/85 drop-shadow-md">{card.desc}</p>
              </div>

              <div className="flex items-center justify-between border-t border-white/20 pt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                <span>R-SPLM/F  2026</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  Leadership Pillar
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}