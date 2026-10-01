"use client";

import { Award, Calendar, MapPin, User, Quote } from "lucide-react";
import { AWARD } from "@/lib/biography";

export default function InternationalRecognition() {
  return (
    <section className="relative overflow-hidden bg-green-forest py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.07] blur-3xl" />
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gold/[0.05] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-campaignred/[0.05] blur-3xl" />
      </div>

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            <Award className="h-3 w-3" /> International Recognition
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            The{" "}
            <span className="bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-transparent">
              International Peace Award
            </span>
            <br />
            2025
          </h2>
          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <p className="font-display text-lg italic text-gold/90">For Inter-Faith Leadership</p>
            <span className="h-px w-8 bg-gold/60" />
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <span className="pointer-events-none absolute -left-3 -top-3 h-10 w-10 border-l-2 border-t-2 border-gold/70" />
          <span className="pointer-events-none absolute -right-3 -top-3 h-10 w-10 border-r-2 border-t-2 border-gold/70" />
          <span className="pointer-events-none absolute -bottom-3 -left-3 h-10 w-10 border-b-2 border-l-2 border-gold/70" />
          <span className="pointer-events-none absolute -bottom-3 -right-3 h-10 w-10 border-b-2 border-r-2 border-gold/70" />

          <div className="grid overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-br from-white/[0.05] to-white/[0.01] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] backdrop-blur-sm lg:grid-cols-[340px_1fr]">
            <div className="relative flex items-center justify-center border-b border-gold/15 px-10 pb-10 pt-20 lg:border-b-0 lg:border-r lg:py-14">

              <div className="relative">
                {/* Red ribbons behind the medal */}
                <div className="absolute -top-10 left-1/2 z-0 flex -translate-x-1/2">
                  <div className="h-20 w-3.5 -skew-x-[20deg] bg-gradient-to-b from-campaignred to-campaignred/60" />
                  <div className="h-20 w-3.5 skew-x-[20deg] bg-gradient-to-b from-campaignred to-campaignred/60" />
                </div>

                {/* Medal  solid gold, with looping shine overlay */}
                <div className="relative z-10 flex h-52 w-52 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark p-1.5">
                  <div className="flex h-full w-full items-center justify-center rounded-full border-4 border-white/25 bg-gradient-to-br from-gold to-gold-dark">
                    <div className="relative flex h-[82%] w-[82%] flex-col items-center justify-center overflow-hidden rounded-full border-2 border-white/20 bg-gradient-to-br from-gold via-gold to-gold-dark">
                      <Award className="relative z-10 h-5 w-5 text-white/90" strokeWidth={1.8} />
                      <div className="relative z-10 mt-1.5 font-display text-[9px] font-bold uppercase tracking-[0.3em] text-white/85">
                        Peace
                      </div>
                      <div className="relative z-10 font-display text-4xl font-bold leading-none text-white drop-shadow">
                        2025
                      </div>
                      <div className="relative z-10 mt-1 text-[8px] font-bold uppercase tracking-[0.3em] text-white/60">
                        ICOPS
                      </div>

                      {/* Looping diagonal shine */}
                      <div
                        className="animate-shine pointer-events-none absolute inset-0 z-20"
                        style={{
                          background:
                            "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.0) 42%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0.0) 58%, transparent 70%)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <MetaItem icon={<Calendar className="h-4 w-4" />} label="Date" value={AWARD.date} />
                <MetaItem icon={<MapPin className="h-4 w-4" />} label="Location" value={AWARD.location} />
                <MetaItem icon={<Award className="h-4 w-4" />} label="Conferred By" value={AWARD.conferredBy} sub={AWARD.affiliatedWith} />
                <MetaItem icon={<User className="h-4 w-4" />} label="Hosted By" value={AWARD.host} />
              </div>

              <div className="my-8 flex items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-white/75">
                {AWARD.paragraphs.map((p, i) => (
                  <p key={i} className={i === 0 ? "text-white/90" : ""}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-24 max-w-4xl">
          <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 select-none font-display text-[180px] leading-none text-gold/[0.08]">
            &ldquo;
          </div>

          <div className="relative text-center">
            <Quote className="mx-auto h-10 w-10 text-gold/60" />
            <blockquote className="mt-6 font-display text-2xl font-bold italic leading-snug text-white sm:text-3xl lg:text-4xl">
              &ldquo;{AWARD.quote}&rdquo;
            </blockquote>

            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-gold/60" />
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
                {AWARD.quoteSource}
              </span>
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
              <span className="h-px w-12 bg-gold/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetaItem({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gold/15">
        <span className="text-gold">{icon}</span>
      </div>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/70">{label}</div>
        <div className="mt-0.5 text-sm font-semibold text-white">{value}</div>
        {sub && <div className="mt-0.5 text-xs text-white/50">{sub}</div>}
      </div>
    </div>
  );
}