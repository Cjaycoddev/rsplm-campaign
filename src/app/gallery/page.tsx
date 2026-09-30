"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, MapPin, Maximize2, Filter, Orbit } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OrbitCarousel from "@/components/gallery/OrbitCarousel";
import { GALLERY_ITEMS, ORBIT_ITEMS, CATEGORIES, type GalleryCategory } from "@/lib/gallery";

export default function GalleryPage() {
  const [filter, setFilter] = useState<GalleryCategory>("All");
  const [index, setIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const items = useMemo(() => {
    return filter === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.category === filter);
  }, [filter]);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length)),
    [items.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, prev, next]);

  useEffect(() => { setIndex(null); }, [filter]);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 60) { if (dx > 0) prev(); else next(); }
    touchStartX.current = null;
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-ivory">
        {/* HERO */}
        <section className="bg-hero-gradient pt-32 pb-16 text-white">
          <div className="container-x text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold"
            >
              <Camera className="h-3 w-3" /> Campaign Gallery
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-display text-4xl font-bold sm:text-5xl"
            >
              Moments of Unity
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mt-4 max-w-2xl text-white/80"
            >
              Snapshots of the real South Sudan  its people, places, culture, and pride.
            </motion.p>
          </div>
        </section>

        {/* ORBIT */}
        <section className="relative overflow-hidden bg-ink py-16">
          <div className="container-x mb-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
              <Orbit className="h-3 w-3" /> In Motion
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
              The Movement in Orbit
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-white/60">
              Hover to pause. Every face, every place  circling around the People First agenda.
            </p>
          </div>
          <OrbitCarousel items={[...ORBIT_ITEMS]} />
        </section>

        {/* FILTER BAR */}
        <section className="container-x pt-12">
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-3xl border border-green-deep/10 bg-white p-3 shadow-card sm:p-4">
            <Filter className="ml-2 hidden h-4 w-4 text-ink/40 sm:block" />
            {CATEGORIES.map((c) => {
              const active = filter === c;
              const count = c === "All" ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter((g) => g.category === c).length;
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    active ? "bg-green-deep text-white shadow" : "text-ink/60 hover:bg-ink/5 hover:text-green-deep"
                  }`}
                >
                  {c}
                  <span className={`ml-1.5 text-xs ${active ? "text-gold" : "text-ink/40"}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* GRID */}
        <section className="container-x py-12">
          <motion.div layout className="grid grid-cols-2 gap-3 [grid-auto-flow:dense] auto-rows-[160px] sm:grid-cols-3 sm:gap-4 sm:auto-rows-[200px] lg:grid-cols-4 lg:auto-rows-[220px] xl:auto-rows-[240px]">
            
              {items.map((item, i) => (
                <motion.button
                  key={item.src + item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setIndex(i)}
                  className={`group relative overflow-hidden rounded-3xl border border-green-deep/10 bg-ink/5 text-left shadow-card transition-shadow hover:shadow-card-hover ${
                    item.span === "wide" ? "col-span-2" : ""
                  } ${item.span === "tall" ? "row-span-2" : ""}`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                    {item.category}
                  </div>
                  <div className="absolute right-4 top-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-gold text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                    <div className="font-display text-sm font-bold leading-tight sm:text-base">{item.title}</div>
                    {item.location && (
                      <div className="mt-1 flex items-center gap-1 text-[11px] text-gold">
                        <MapPin className="h-3 w-3" /> {item.location}
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </motion.div>
        </section>
      </main>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {index !== null && items[index] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
            onClick={close}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-gold hover:text-ink sm:right-6 sm:top-6"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="absolute left-4 top-6 z-20 rounded-full bg-white/10 px-4 py-2 text-xs font-mono font-semibold text-white backdrop-blur-md sm:left-6">
              {index + 1} / {items.length}
            </div>

            {items.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-gold hover:text-ink sm:left-6"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-gold hover:text-ink sm:right-6"
                  aria-label="Next"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <motion.div
              key={index}
              initial={{ scale: 0.94, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[88vh] w-full max-w-5xl px-4 sm:px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl">
                <Image src={items[index].src} alt={items[index].title} fill sizes="100vw" className="object-contain" priority />
              </div>
              <div className="mt-4 flex flex-col gap-2 rounded-2xl bg-white/5 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="min-w-0">
                  <div className="font-display text-base font-bold text-white sm:text-lg">{items[index].title}</div>
                  <div className="mt-0.5 text-xs text-white/70">{items[index].caption}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-gold/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">
                    {items[index].category}
                  </span>
                  {items[index].location && (
                    <span className="flex items-center gap-1 text-[11px] text-white/70">
                      <MapPin className="h-3 w-3" /> {items[index].location}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}