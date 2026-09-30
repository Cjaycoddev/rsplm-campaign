"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { Home, GraduationCap, Church, Globe, Flag, Gavel, Trophy, Landmark, ShieldAlert, Star, type LucideIcon } from "lucide-react";
import { TIMELINE } from "@/lib/biography";

const ICONS: Record<string, LucideIcon> = { Home, GraduationCap, Church, Globe, Flag, Gavel, Trophy, Landmark, ShieldAlert, Star };

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className="relative mx-auto mt-16 max-w-4xl">
      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-green-deep/10 sm:left-1/2 sm:-translate-x-px" />
      <motion.div style={{ scaleY: lineProgress }} className="absolute left-5 top-0 bottom-0 w-0.5 origin-top bg-gradient-to-b from-gold via-gold to-gold/30 sm:left-1/2 sm:-translate-x-px" />
      <div className="space-y-12 sm:space-y-16">
        {TIMELINE.map((event, i) => <TimelineCard key={i} event={event} index={i} />)}
      </div>
    </div>
  );
}

function TimelineCard({ event, index }: { event: (typeof TIMELINE)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-30% 0px -30% 0px" });
  const Icon = ICONS[event.icon] ?? Star;
  const right = index % 2 === 1;

  return (
    <div ref={ref} className={`relative flex items-start gap-6 sm:gap-8 ${right ? "sm:flex-row-reverse" : "sm:flex-row"}`}>
      <motion.div
        animate={inView ? { backgroundColor: "#C9A227", borderColor: "#C9A227", scale: 1 } : { backgroundColor: "#FFFFFF", borderColor: "#0E6B2F33", scale: 0.85 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-5 top-6 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 shadow-md sm:left-1/2"
      >
        <motion.div animate={inView ? { color: "#111418", scale: 1 } : { color: "#0E6B2F", scale: 0.85 }} transition={{ duration: 0.35 }}>
          <Icon className="h-4 w-4" />
        </motion.div>
      </motion.div>

      <div className="hidden sm:block sm:flex-1" />

      <motion.div
        initial={{ opacity: 0, x: right ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className={`group ml-12 flex-1 sm:ml-0 sm:max-w-[calc(50%-2.5rem)] ${right ? "sm:mr-10" : "sm:ml-10"}`}
      >
        <motion.div
          animate={inView ? { borderColor: "#C9A227", boxShadow: "0 12px 40px -8px rgba(201,162,39,0.35)", y: -4 } : { borderColor: "#0E6B2F1A", boxShadow: "0 4px 24px -8px rgba(11,93,42,0.15)", y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border-2 bg-white p-5 sm:p-6"
        >
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-gold-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {event.date}
          </div>
          <h3 className="font-display text-lg font-bold leading-snug text-green-deep sm:text-xl">{event.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/75">{event.body}</p>
          <div className="pointer-events-none absolute -right-px -top-px h-16 w-16 rounded-tr-3xl bg-gradient-to-bl from-gold/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </motion.div>
      </motion.div>
    </div>
  );
}