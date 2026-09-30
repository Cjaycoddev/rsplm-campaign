"use client";

import { Truck, HeartHandshake, BookOpen, Rocket, Flag } from "lucide-react";
import type { Cause } from "@/app/donate/page";

const causes: { id: Cause; label: string; desc: string; icon: any }[] = [
  { id: "CAMPAIGN_OPS", label: "Campaign Operations", desc: "Logistics, rallies, and transport across all 10 states.", icon: Truck },
  { id: "COMMUNITY_OUTREACH", label: "Community Outreach", desc: "County-level engagement with local leaders and families.", icon: HeartHandshake },
  { id: "VOTER_EDUCATION", label: "Voter Education", desc: "Civic kits, training materials, and peaceful engagement.", icon: BookOpen },
  { id: "YOUTH_EMPOWERMENT", label: "Youth Empowerment", desc: "Skills programs, seed grants, and entrepreneurship support.", icon: Rocket },
  { id: "GENERAL_SUPPORT", label: "General Campaign Support", desc: "Where the movement needs it most right now.", icon: Flag },
];

export default function CauseSelector({
  value,
  onChange,
}: {
  value: Cause | null;
  onChange: (c: Cause) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-green-deep">What are you supporting?</h2>
      <p className="mt-1 text-sm text-ink/60">Choose where your contribution goes.</p>

      <div className="mt-6 space-y-3">
        {causes.map((c) => {
          const Icon = c.icon;
          const selected = value === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onChange(c.id)}
              className={`group flex w-full items-start gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
                selected
                  ? "border-gold bg-gold/5 shadow-gold"
                  : "border-ink/10 bg-white hover:border-gold/50 hover:shadow-card"
              }`}
            >
              <div
                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
                  selected ? "bg-gold text-ink" : "bg-green-light text-green-deep group-hover:bg-gold/20"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-green-deep">{c.label}</div>
                <div className="mt-0.5 text-sm text-ink/60">{c.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
