import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PillarCard from "@/components/manifesto/PillarCard";
import { PILLARS } from "@/lib/manifesto";
import { BookOpen, Quote } from "lucide-react";

export default function ManifestoPage() {
  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="relative overflow-hidden bg-hero-gradient pb-20 pt-32 text-white">
        <div className="container-x max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
            <BookOpen className="h-3 w-3" /> Our Manifesto
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Nine Pillars of Change
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            A bold, actionable plan to transform South Sudan  rooted in reform, unity, and the aspirations of its people.
            This is not a wish list. This is a binding commitment to every South Sudanese citizen.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-ivory py-16">
        <div className="container-x max-w-5xl">
          <div className="space-y-6">
            {PILLARS.map((p, i) => (<PillarCard key={p.n} pillar={p} index={i} />))}
          </div>
        </div>
      </section>

      {/* Pledge */}
      <section className="bg-green-deep py-20 text-white">
        <div className="container-x max-w-3xl text-center">
          <Quote className="mx-auto h-10 w-10 text-gold" />
          <div className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            The Manifesto Pledge
          </div>
          <blockquote className="mt-4 font-display text-2xl font-bold italic leading-snug sm:text-3xl">
            "This manifesto is a covenant with the people of South Sudan.
            Every promise here will be measured, tracked, and publicly reported."
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