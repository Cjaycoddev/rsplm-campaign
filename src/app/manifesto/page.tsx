import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PillarCard from "@/components/manifesto/PillarCard";
import { PILLARS, type Pillar } from "@/lib/manifesto";
import { liveManifesto, publicObjectUrl } from "@/lib/cms";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { BookOpen, Quote } from "lucide-react";

export const dynamic = "force-dynamic";

function resolvePillars(raw: Pillar[]): Pillar[] {
  return raw.map((p) => ({
    ...p,
    image: publicObjectUrl(p.image) || p.image,
    points: Array.isArray(p.points) ? p.points : [],
  }));
}

export default async function ManifestoPage() {
  const live = isSupabaseConfigured() ? await liveManifesto() : null;
  const pillars = resolvePillars(live?.pillars?.length ? live.pillars : PILLARS);
  const title = live?.title || "Nine Pillars of Change";
  const intro =
    live?.intro ||
    "A bold, actionable plan to transform South Sudan  rooted in reform, unity, and the aspirations of its people. This is not a wish list. This is a binding commitment to every South Sudanese citizen.";
  const pledge =
    live?.pledge ||
    "This manifesto is a covenant with the people of South Sudan. Every promise here will be measured, tracked, and publicly reported.";

  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden bg-hero-gradient pb-20 pt-32 text-white">
        <div className="container-x max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
            <BookOpen className="h-3 w-3" /> Our Manifesto
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">{intro}</p>
        </div>
      </section>

      <section className="bg-ivory py-16">
        <div className="container-x max-w-5xl">
          <div className="space-y-6">
            {pillars.map((p, i) => (
              <PillarCard key={`${p.n}-${i}`} pillar={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-green-deep py-20 text-white">
        <div className="container-x max-w-3xl text-center">
          <Quote className="mx-auto h-10 w-10 text-gold" />
          <div className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            The Manifesto Pledge
          </div>
          <blockquote className="mt-4 font-display text-2xl font-bold italic leading-snug sm:text-3xl">
            &ldquo;{pledge}&rdquo;
          </blockquote>
          <div className="mt-6 text-sm font-semibold uppercase tracking-wider text-gold">
            Hon. Nathaniel Garang&apos; Aduot
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
