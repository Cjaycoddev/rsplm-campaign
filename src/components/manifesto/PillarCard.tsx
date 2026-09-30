"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import type { Pillar } from "@/lib/manifesto";

export default function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Cursor tracking
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  // Glow follows cursor
  const glowX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className="group relative rounded-3xl border border-green-deep/10 bg-white shadow-card transition-shadow duration-500 hover:shadow-[0_30px_80px_-20px_rgba(11,93,42,0.35)]"
    >
      {/* Cursor-following glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at var(--gx) var(--gy), rgba(201,162,39,0.14) 0%, transparent 45%)`,
          ["--gx" as any]: glowX,
          ["--gy" as any]: glowY,
        }}
      />

      {/* Gold shimmer line at top */}
      <div className="absolute inset-x-0 top-0 h-[3px] overflow-hidden rounded-t-3xl">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="relative flex w-full items-start gap-4 p-6 text-left sm:p-8"
        style={{ transform: "translateZ(20px)" }}
      >
        {/* Emoji tile with animated background */}
        <div className="relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gold/40 via-gold/10 to-transparent opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
          <motion.div
            animate={open ? { rotate: [0, -8, 8, 0], scale: [1, 1.12, 1] } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-green-deep/10 bg-gradient-to-br from-green-light to-white text-2xl shadow-inner"
          >
            {pillar.emoji}
          </motion.div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Pillar {pillar.n}
            </span>
            <Sparkles className="h-3 w-3 text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <h3 className="mt-1 font-display text-xl font-bold text-green-deep sm:text-2xl">
            {pillar.title}
          </h3>
          <p className="mt-1 text-sm italic text-ink/60">{pillar.tagline}</p>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0, color: open ? "#C9A227" : "#0E6B2F" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 flex-shrink-0"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>

      {/* Benchmark strip */}
      <div className="relative flex flex-wrap items-center gap-4 border-t border-green-deep/10 bg-gradient-to-r from-ivory via-ivory to-gold/[0.04] px-6 py-4 sm:px-8">
        <div className="flex items-baseline gap-2">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 + 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl font-bold text-gold"
          >
            {pillar.benchmark.value}
          </motion.span>
          <span className="text-xs font-semibold uppercase tracking-wider text-ink/60">
            {pillar.benchmark.label}
          </span>
        </div>
        <div className="ml-auto hidden text-[10px] font-semibold uppercase tracking-wider text-ink/30 sm:block">
          {open ? "Click to collapse" : "Click to expand"}
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-green-deep/10"
          >
            <div className="px-6 py-6 sm:px-8">
              <p className="text-sm text-ink/80">{pillar.desc}</p>
              <ul className="mt-5 space-y-3">
                {pillar.points.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-3 text-sm text-ink/80"
                  >
                    <span className="mt-1.5 flex h-1.5 w-1.5 flex-shrink-0 items-center justify-center rounded-full bg-gold">
                      <span className="h-full w-full animate-ping rounded-full bg-gold opacity-40" />
                    </span>
                    <span>{p}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}