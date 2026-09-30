"use client";
import { memo } from "react";
import { Shield, HandHeart, Rocket, Globe, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = { Shield, HandHeart, Rocket, Globe };

interface Props {
  icon: string;
  title: string;
  tagline: string;
  body: string;
  focus: readonly string[];
}

function LeadershipPillarBase({ icon, title, tagline, body, focus }: Props) {
  const Icon = ICONS[icon] ?? Shield;
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-green-deep/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:p-8">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/5 blur-2xl transition-all group-hover:bg-gold/10" />

      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-green-light text-green-deep transition-colors group-hover:bg-gold group-hover:text-ink">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="relative mt-5 font-display text-xl font-bold text-green-deep sm:text-2xl">
        {title}
      </h3>
      <p className="relative mt-1 text-sm italic text-gold-dark">{tagline}</p>
      <p className="relative mt-4 text-sm text-ink/75">{body}</p>

      <ul className="relative mt-5 space-y-2 border-t border-green-deep/10 pt-5">
        {focus.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-ink/70">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(LeadershipPillarBase);