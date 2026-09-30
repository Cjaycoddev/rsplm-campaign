import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Users, Vote, MapPin, UserCheck, TrendingUp, Info } from "lucide-react";
import { STATE_DATA, TOTALS, DATA_SOURCE_NOTE } from "@/lib/analytics";

const StateBarChart = dynamic(() => import("@/components/analytics/StateBarChart"), {
  loading: () => <ChartSkeleton h="h-[420px]" />,
});
const EngagementDonut = dynamic(() => import("@/components/analytics/EngagementDonut"), {
  loading: () => <ChartSkeleton h="h-[240px]" />,
});
const GrowthLineChart = dynamic(() => import("@/components/analytics/GrowthLineChart"), {
  loading: () => <ChartSkeleton h="h-[280px]" />,
});

function ChartSkeleton({ h }: { h: string }) {
  return <div className={`w-full animate-pulse rounded-2xl bg-ink/5 ${h}`} />;
}

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

export default function AnalyticsPage() {
  const stats = [
    { value: TOTALS.supporters, label: "Total Supporters", icon: Users },
    { value: TOTALS.voters, label: "Registered Voters", icon: Vote },
    { value: TOTALS.states, label: "States Covered", icon: MapPin, suffix: " / 10" },
    { value: TOTALS.agents, label: "Active Agents", icon: UserCheck },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-ivory">
        <section className="bg-hero-gradient pt-32 pb-16 text-white">
          <div className="container-x text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
              <TrendingUp className="h-3 w-3" /> Campaign Analytics
            </div>
            <h1 className="font-display text-4xl font-bold sm:text-5xl">
              The Movement is Growing
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Campaign-reported figures showing the reach of the People First movement across South Sudan.
            </p>
          </div>
        </section>

        <section className="container-x -mt-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="card-elevated">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-green-light text-green-deep">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="font-display text-2xl font-bold text-green-deep sm:text-3xl">
                    {fmt(s.value)}{s.suffix ?? ""}
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink/50">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Source note */}
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 text-xs text-ink/60">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-dark" />
            <p>{DATA_SOURCE_NOTE}</p>
          </div>
        </section>

        <section className="container-x mt-12 space-y-8 pb-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card title="Voters by State" sub="Campaign-reported pledged support across all ten states">
              <StateBarChart />
            </Card>
            <Card title="Engagement Breakdown" sub="How supporters are participating">
              <EngagementDonut />
            </Card>
          </div>

          <Card title="Projected Momentum" sub="Trajectory to election day  Q1 2026 through December 2026">
            <GrowthLineChart />
          </Card>

          <Card title="State-by-State Detail" sub="Every state. Every county. Every agent.">
            <div className="-mx-6 overflow-x-auto sm:mx-0">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-green-deep/10 text-left text-xs uppercase tracking-wider text-ink/50">
                    <th className="px-6 py-3 font-semibold sm:px-0">State</th>
                    <th className="px-4 py-3 font-semibold">Capital</th>
                    <th className="px-4 py-3 text-right font-semibold">Registered Voters</th>
                    <th className="px-4 py-3 text-right font-semibold">Pledged Supporters</th>
                    <th className="px-4 py-3 text-right font-semibold">Active Agents</th>
                  </tr>
                </thead>
                <tbody>
                  {STATE_DATA.map((s) => (
                    <tr key={s.full} className="border-b border-green-deep/5 transition-colors hover:bg-gold/5">
                      <td className="px-6 py-4 font-semibold text-green-deep sm:px-0">{s.full}</td>
                      <td className="px-4 py-4 text-ink/70">{s.capital}</td>
                      <td className="px-4 py-4 text-right font-mono text-ink/80">{fmt(s.voters)}</td>
                      <td className="px-4 py-4 text-right font-mono font-semibold text-green-deep">{fmt(s.supporters)}</td>
                      <td className="px-4 py-4 text-right font-mono text-ink/80">{fmt(s.agents)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Card({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-green-deep/10 bg-white p-6 shadow-card sm:p-8">
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold text-green-deep sm:text-2xl">{title}</h2>
        {sub && <p className="mt-1 text-sm text-ink/60">{sub}</p>}
      </div>
      {children}
    </div>
  );
}