import Image from "next/image";
import Link from "next/link";
import { Quote, ArrowRight, Award, Calendar, MapPin, Newspaper, User, Heart, HeartHandshake, ExternalLink } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Timeline from "@/components/about/Timeline";
import InternationalRecognition from "@/components/about/InternationalRecognition";
import { QUICK_FACTS, STORY_PARAGRAPHS, AWARD, PRESS } from "@/lib/biography";

export const metadata = {
  title: "Biography  Hon. Nathaniel Garang Aduotdit",
  description: "Chairman of R-SPLM/F, ordained Anglican priest, and 2026 presidential candidate for South Sudan.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden bg-hero-gradient pt-32 pb-20 text-white">
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/rally-juba.jpg" alt="" fill className="object-cover" priority />
        </div>
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
              <User className="h-3 w-3" /> Biography
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Hon. Nathaniel<br />
              <span className="text-gold">Garang Aduotdit</span>
            </h1>
            <p className="mt-6 text-lg font-medium text-white/90">
              Chairman, R-SPLM/F  Chairman, East Africa Religious Council
            </p>
            <p className="mt-2 text-sm text-white/70">
              Ordained Anglican Priest  International Peace Award Laureate 2025  Presidential Candidate for the 2026 South Sudan General Elections
            </p>
            <p className="mt-6 max-w-2xl text-base text-white/80">
              Born in Payom, Kongor Area, South Sudan  a reform-driven leader who bridges faith, diplomacy, and governance to champion a new era of peace, justice, and opportunity for the world&apos;s youngest nation.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/join" className="btn-gold">Join the Movement <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/manifesto" className="btn-outline">Read the Manifesto</Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm">
              <div className="absolute -inset-4 rounded-3xl bg-gold/20 blur-3xl" />
              <div className="relative h-full overflow-hidden rounded-3xl border-2 border-gold/40 shadow-2xl">
                <Image src="/images/nathaniel-portrait.jpg" alt="Hon. Nathaniel Garang Aduotdit" fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-green-deep/10 bg-white">
        <div className="container-x grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
          {QUICK_FACTS.map((f) => (
            <div key={f.label} className="text-center">
              <div className="text-3xl">{f.icon}</div>
              <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">{f.label}</div>
              <div className="mt-1 font-display text-sm font-bold text-green-deep sm:text-base">{f.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ivory py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="relative aspect-[904/1280] overflow-hidden rounded-3xl shadow-2xl">
                <Image src="/images/poster-plate-1_opt.jpg" alt="Official Campaign Poster" fill className="object-contain" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">The Story</div>
            <h2 className="mt-3 font-display text-3xl font-bold text-green-deep sm:text-4xl">From the people, for the people.</h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-ink/80">
              {STORY_PARAGRAPHS.map((p, i) => (
                <p key={i} className={i === 0 ? "text-lg text-ink" : ""}>{p}</p>
              ))}
            </div>
            <div className="mt-10 rounded-3xl border-l-4 border-gold bg-white p-6 shadow-card">
              <Quote className="h-6 w-6 text-gold" />
              <blockquote className="mt-3 font-display text-lg font-bold italic text-green-deep sm:text-xl">
                &ldquo;I believe South Sudan&apos;s future is built by putting people first  protecting peace, restoring trust, and creating opportunities that reach every community.&rdquo;
              </blockquote>
              <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-gold-dark"> Hon. Nathaniel Garang Aduotdit</div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERNATIONAL RECOGNITION */}
      <InternationalRecognition />


      <section className="bg-white py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Documented Journey</div>
            <h2 className="mt-3 font-display text-3xl font-bold text-green-deep sm:text-4xl">Milestones of Leadership</h2>
            <p className="mt-4 text-ink/70">
              From Payom, Kongor Area to the international stage  a timeline of advocacy, faith leadership, and political reform.
            </p>
          </div>
          <Timeline />
        </div>
      </section>

      <section className="bg-ivory py-20">
        <div className="container-x">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">In the Press</div>
              <h2 className="mt-3 font-display text-3xl font-bold text-green-deep sm:text-4xl">Media Coverage</h2>
            </div>
            <Link href="/media" className="inline-flex items-center gap-2 text-sm font-semibold text-green-deep transition-colors hover:text-gold">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRESS.map((article, i) => {
              const Card = article.url ? "a" : "article";
              const props = article.url
                ? { href: article.url, target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <Card
                  key={i}
                  {...props}
                  className="group flex flex-col rounded-3xl border border-green-deep/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                >
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gold">
                    <Newspaper className="h-3 w-3" /> {article.source}
                  </div>
                  <div className="mt-2 text-xs text-ink/50">{article.date}</div>
                  <h3 className="mt-3 flex-1 font-display text-base font-bold leading-snug text-green-deep transition-colors group-hover:text-gold-dark">
                    {article.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-1.5 border-t border-green-deep/10 pt-4 text-xs font-semibold text-gold-dark">
                    Read full article <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-green-deep py-20 text-white">
        <div className="container-x grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Be Part of the Story</div>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
              Together, we write the next chapter of South Sudan.
            </h2>
            <p className="mt-4 text-white/80">
              Register as a Supporter, Volunteer, Campaign Agent, or Donor. Every contribution builds the movement.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
            <Link href="/join" className="btn-gold"><HeartHandshake className="h-4 w-4" strokeWidth={2} /> Join the Movement</Link>
            <Link href="/donate" className="btn-outline"><Heart className="h-4 w-4" fill="currentColor" /> Donate</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}