"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Newspaper, PenLine, ArrowRight, Calendar, Clock, User, Filter , ExternalLink } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MEDIA_ITEMS, CATEGORIES, type MediaItem } from "@/lib/media";

type Tab = "all" | "press" | "blog";

export default function MediaPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [category, setCategory] = useState<string>("All");
  const [uploaded, setUploaded] = useState<MediaItem[]>([]);

  useEffect(() => {
    fetch("/api/content/media")
      .then((r) => r.json())
      .then((d) => setUploaded(Array.isArray(d.items) ? d.items : []))
      .catch(() => setUploaded([]));
  }, []);

  const catalog = useMemo(() => [...uploaded, ...MEDIA_ITEMS], [uploaded]);
  const categories = useMemo(() => {
    const extra = catalog.map((m) => m.category).filter(Boolean);
    return Array.from(new Set(["All", ...CATEGORIES.filter((c) => c !== "All"), ...extra]));
  }, [catalog]);

  const filtered = useMemo(() => {
    return catalog.filter((m) => {
      const tabOk = tab === "all" || m.type === tab;
      const catOk = category === "All" || m.category === category;
      return tabOk && catOk;
    });
  }, [tab, category, catalog]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-ivory">
        {/* HERO */}
        <section className="bg-hero-gradient pt-32 pb-16 text-white">
          <div className="container-x text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
              <Newspaper className="h-3 w-3" /> Press &amp; Media
            </div>
            <h1 className="font-display text-4xl font-bold sm:text-5xl">
              News, Events &amp; Ideas
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Stay informed about campaign rallies, policy deep-dives, and reflections from the People First agenda.
            </p>
          </div>
        </section>

        {/* FILTERS */}
        <section className="container-x -mt-8">
          <div className="rounded-3xl border border-green-deep/10 bg-white p-4 shadow-card sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Tabs */}
              <div className="inline-flex rounded-full bg-ink/5 p-1">
                {([
                  { id: "all",   label: "All",       icon: null },
                  { id: "press", label: "Press",     icon: Newspaper },
                  { id: "blog",  label: "Blog",      icon: PenLine },
                ] as const).map((t) => {
                  const Icon = t.icon;
                  const active = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                        active
                          ? "bg-white text-green-deep shadow"
                          : "text-ink/50 hover:text-green-deep"
                      }`}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      {t.label}
                    </button>
                  );
                })}
              </div>

              {/* Category pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <Filter className="h-4 w-4 flex-shrink-0 text-ink/40" />
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                      category === c
                        ? "bg-gold text-ink"
                        : "bg-ink/5 text-ink/60 hover:bg-ink/10"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEED */}
        <section className="container-x pb-20 pt-12">
          {filtered.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl border-2 border-dashed border-ink/15 bg-white p-12 text-center">
              <div className="text-4xl"></div>
              <div className="mt-4 font-display text-xl font-bold text-green-deep">
                Nothing here yet
              </div>
              <p className="mt-2 text-sm text-ink/60">
                Campaign updates coming soon. Stay tuned!
              </p>
              <Link href="/join" className="btn-gold mt-6">
                Register for Updates <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((m) => (
                <MediaCard key={m.id} item={m} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

function MediaCard({ item }: { item: typeof MEDIA_ITEMS[number] }) {
  const isPress = item.type === "press";
  const isClickable = !!item.url;

  const inner = (
    <>
      <div className={`flex items-center justify-between px-6 pt-6 ${isPress ? "text-green-deep" : "text-gold-dark"}`}>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
          {isPress ? <Newspaper className="h-3.5 w-3.5" /> : <PenLine className="h-3.5 w-3.5" />}
          {isPress ? "Press" : "Blog"}
        </div>
        <span className="rounded-full bg-ink/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink/60">
          {item.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-6 py-5">
        <h3 className="font-display text-lg font-bold leading-snug text-green-deep transition-colors group-hover:text-gold-dark">
          {item.title}
        </h3>
        <p className="mt-3 flex-1 text-sm text-ink/70">{item.excerpt}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-green-deep/10 pt-4 text-xs text-ink/50">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> {item.date}
          </span>
          {item.author && (
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> {item.author}
            </span>
          )}
          {item.readTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {item.readTime}
            </span>
          )}
          {isClickable && (
            <span className="ml-auto flex items-center gap-1.5 font-semibold text-gold-dark">
              Read article <ExternalLink className="h-3 w-3" />
            </span>
          )}
        </div>
      </div>
    </>
  );

  const baseClass =
    "group flex flex-col overflow-hidden rounded-3xl border border-green-deep/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover";

  if (isClickable) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass + " cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"}
        aria-label={`Read: ${item.title}`}
      >
        {inner}
      </a>
    );
  }

  return <article className={baseClass}>{inner}</article>;
}