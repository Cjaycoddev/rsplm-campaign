"use client";

import { useMemo, useState } from "react";
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  Download, Search, Users, Heart, Banknote, Clock, Filter,
  LayoutDashboard, Mail, Images, X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import LogoutButton from "@/components/admin/LogoutButton";
import DonationReview from "@/components/admin/DonationReview";
import MessageComposer from "@/components/admin/MessageComposer";
import AdminContent from "@/components/admin/AdminContent";
import { AdminToastProvider } from "@/components/admin/AdminToast";
import type { GalleryRow, MediaRow, ManifestoRow } from "@/lib/cms";

type Tab = "overview" | "people" | "money" | "email" | "content";

const NAV: { id: Tab; label: string; hint: string; icon: typeof Users }[] = [
  { id: "overview", label: "Overview", hint: "Charts and totals", icon: LayoutDashboard },
  { id: "people", label: "People", hint: "Supporters list", icon: Users },
  { id: "money", label: "Donations", hint: "KES and proofs", icon: Banknote },
  { id: "email", label: "Email", hint: "Brevo broadcasts", icon: Mail },
  { id: "content", label: "Site content", hint: "Gallery, press, blog, manifesto", icon: Images },
];

export type AdminSupporter = {
  id: string;
  display_name: string;
  phone_e164: string;
  phone_country: string | null;
  email: string | null;
  email_opt_in: boolean;
  state: string;
  county: string;
  role: string;
  created_at: string;
};

export type AdminDonation = {
  id: string;
  display_name: string;
  phone_e164: string | null;
  email: string | null;
  amount: number;
  currency: string;
  frequency: string;
  cause: string;
  method: string;
  status: string;
  reference: string;
  till_number: string | null;
  mpesa_receipt: string | null;
  created_at: string;
  paid_at: string | null;
};

type Proof = { id: string; file_name: string; url: string | null };

function fmtKes(n: number) {
  return `KES ${n.toLocaleString("en-KE")}`;
}
function fmtWhen(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-KE");
}
function csvEscape(v: unknown) {
  return `"${String(v ?? "").replace(/"/g, '""')}"`;
}
function downloadCsv(filename: string, rows: Record<string, unknown>[]) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const body = [keys.join(","), ...rows.map((r) => keys.map((k) => csvEscape(r[k])).join(","))].join("\n");
  const blob = new Blob([body], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function AdminDashboard({
  supporters,
  donations,
  proofsByDonation,
  pendingReview,
  paidTotal,
  paidCount,
  daraja,
  gallery,
  media,
  manifestos,
}: {
  supporters: AdminSupporter[];
  donations: AdminDonation[];
  proofsByDonation: Record<string, Proof[]>;
  pendingReview: number;
  paidTotal: number;
  paidCount: number;
  daraja: { configured: boolean; sandbox: boolean; till: string | null };
  gallery: GalleryRow[];
  media: MediaRow[];
  manifestos: ManifestoRow[];
}) {
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("all");
  const [region, setRegion] = useState("all");
  const [role, setRole] = useState("all");
  const [donStatus, setDonStatus] = useState("all");
  const [tab, setTab] = useState<Tab>("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const active = NAV.find((n) => n.id === tab)!;

  const regions = useMemo(
    () => Array.from(new Set(supporters.map((s) => s.state))).sort(),
    [supporters]
  );

  const filteredPeople = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return supporters.filter((s) => {
      if (country !== "all" && s.phone_country !== country) return false;
      if (region !== "all" && s.state !== region) return false;
      if (role !== "all" && s.role !== role) return false;
      if (!needle) return true;
      return [s.display_name, s.phone_e164, s.email, s.county, s.state].some((v) =>
        String(v ?? "").toLowerCase().includes(needle)
      );
    });
  }, [supporters, q, country, region, role]);

  const filteredMoney = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return donations.filter((d) => {
      if (donStatus !== "all" && d.status !== donStatus) return false;
      if (!needle) return true;
      return [d.display_name, d.email, d.phone_e164, d.reference, d.mpesa_receipt].some((v) =>
        String(v ?? "").toLowerCase().includes(needle)
      );
    });
  }, [donations, q, donStatus]);

  const byRegion = useMemo(() => {
    const acc: Record<string, number> = {};
    for (const s of filteredPeople) acc[s.state] = (acc[s.state] || 0) + 1;
    return Object.entries(acc)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 12);
  }, [filteredPeople]);

  const byRole = useMemo(() => {
    const acc: Record<string, number> = {};
    for (const s of filteredPeople) acc[s.role] = (acc[s.role] || 0) + 1;
    return Object.entries(acc).map(([name, count]) => ({ name: name.replaceAll("_", " "), count }));
  }, [filteredPeople]);

  const keCount = supporters.filter((s) => s.phone_country === "KE").length;
  const ssCount = supporters.filter((s) => s.phone_country === "SS").length;

  return (
    <AdminToastProvider>
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#F4EFE2,_#E8F0EA_45%,_#F7F4EC)] pb-16">
      <header className="bg-hero-gradient px-4 py-6 text-white sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Hamburger open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">Hon. Nathaniel Garang&apos; Aduot</div>
              <h1 className="font-display text-2xl font-bold sm:text-3xl">Campaign command</h1>
              <p className="text-xs text-white/70 sm:text-sm">{active.label} · {active.hint}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${daraja.configured ? "bg-gold/20 text-gold" : "bg-white/10 text-white/70"}`}>
              M-Pesa {daraja.configured ? (daraja.sandbox ? `sandbox · ${daraja.till || "174379"}` : `live · ${daraja.till}`) : "not configured"}
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed bottom-0 left-0 top-0 z-50 flex w-[min(20rem,86vw)] flex-col bg-green-deep text-white shadow-[12px_0_40px_-12px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">Menu</div>
                  <div className="font-display text-xl font-bold">Navigate</div>
                </div>
                <button type="button" onClick={() => setMenuOpen(false)} className="rounded-full bg-white/10 p-2 hover:bg-gold hover:text-ink" aria-label="Close">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                {NAV.map((item, i) => {
                  const Icon = item.icon;
                  const on = tab === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      initial={{ x: -16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.04 * i }}
                      onClick={() => {
                        setTab(item.id);
                        setMenuOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors ${
                        on ? "bg-gold text-ink shadow-gold" : "text-white/85 hover:bg-white/10"
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span>
                        <span className="block text-sm font-semibold">{item.label}</span>
                        <span className={`block text-[11px] ${on ? "text-ink/60" : "text-white/50"}`}>{item.hint}</span>
                      </span>
                    </motion.button>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi icon={Users} label="Supporters" value={String(supporters.length)} sub={`${ssCount} SS · ${keCount} KE`} />
          <Kpi icon={Heart} label="Confirmed gifts" value={String(paidCount)} sub="Status: paid" />
          <Kpi icon={Banknote} label="KES in" value={fmtKes(paidTotal)} sub="Confirmed only" />
          <Kpi icon={Clock} label="Need review" value={String(pendingReview)} sub="Bank proofs" />
        </div>

        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-green-deep/10 bg-white/80 p-3 shadow-card backdrop-blur">
          <Filter className="h-4 w-4 text-green-deep" />
          <div className="relative min-w-[180px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, phone, email, reference"
              className="w-full rounded-xl border-2 border-ink/10 py-2 pl-9 pr-3 text-sm outline-none focus:border-gold"
            />
          </div>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="rounded-xl border-2 border-ink/10 px-3 py-2 text-sm">
            <option value="all">All countries</option>
            <option value="SS">South Sudan</option>
            <option value="KE">Kenya</option>
          </select>
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="rounded-xl border-2 border-ink/10 px-3 py-2 text-sm">
            <option value="all">All regions / states</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-xl border-2 border-ink/10 px-3 py-2 text-sm">
            <option value="all">All roles</option>
            <option value="SUPPORTER">Supporter</option>
            <option value="VOLUNTEER">Volunteer</option>
            <option value="CAMPAIGN_AGENT">Campaign agent</option>
            <option value="DONOR">Donor</option>
          </select>
          {tab === "money" && (
            <select value={donStatus} onChange={(e) => setDonStatus(e.target.value)} className="rounded-xl border-2 border-ink/10 px-3 py-2 text-sm">
              <option value="all">All gift statuses</option>
              <option value="paid">Paid</option>
              <option value="needs_review">Needs review</option>
              <option value="stk_sent">STK sent</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="rejected">Rejected</option>
            </select>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="mr-auto font-display text-lg font-bold text-green-deep">{active.label}</div>
          <div className="flex flex-wrap gap-2">
            <CsvBtn
              label="Contacts CSV"
              onClick={() =>
                downloadCsv(
                  "rsplm-contacts.csv",
                  filteredPeople.map((s) => ({
                    name: s.display_name,
                    phone: s.phone_e164,
                    country: s.phone_country,
                    email: s.email,
                    email_opt_in: s.email_opt_in,
                    region: s.state,
                    county: s.county,
                    role: s.role,
                    registered: s.created_at,
                  }))
                )
              }
            />
            <CsvBtn
              label="Donations CSV"
              onClick={() =>
                downloadCsv(
                  "rsplm-donations.csv",
                  filteredMoney.map((d) => ({
                    when: d.created_at,
                    name: d.display_name,
                    phone: d.phone_e164,
                    email: d.email,
                    amount: d.amount,
                    currency: d.currency,
                    method: d.method,
                    status: d.status,
                    reference: d.reference,
                    receipt: d.mpesa_receipt,
                    paid_at: d.paid_at,
                  }))
                )
              }
            />
            <CsvBtn
              label="Full report CSV"
              onClick={() =>
                downloadCsv("rsplm-full-report.csv", [
                  { metric: "supporters", value: supporters.length },
                  { metric: "kenya", value: keCount },
                  { metric: "south_sudan", value: ssCount },
                  { metric: "paid_donations", value: paidCount },
                  { metric: "kes_confirmed", value: paidTotal },
                  { metric: "pending_review", value: pendingReview },
                ])
              }
            />
          </div>
        </div>

        {tab === "overview" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-green-deep/10 bg-white p-6 shadow-card">
              <h2 className="font-display text-xl font-bold text-green-deep">People by area</h2>
              <p className="text-xs text-ink/50">Uses the current filters.</p>
              <div className="mt-4 h-72">
                {byRegion.length ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={byRegion} layout="vertical" margin={{ left: 8, right: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#0E6B2F" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="pt-16 text-center text-sm text-ink/50">No registrations match these filters.</p>
                )}
              </div>
            </div>
            <div className="rounded-3xl border border-green-deep/10 bg-white p-6 shadow-card">
              <h2 className="font-display text-xl font-bold text-green-deep">Roles</h2>
              <ul className="mt-4 space-y-3">
                {byRole.map((r) => (
                  <li key={r.name}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>{r.name}</span>
                      <span className="font-semibold">{r.count}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-ink/10">
                      <div
                        className="h-full rounded-full bg-gold"
                        style={{ width: `${Math.max(8, (r.count / Math.max(filteredPeople.length, 1)) * 100)}%` }}
                      />
                    </div>
                  </li>
                ))}
                {!byRole.length && <li className="text-sm text-ink/50">No data yet.</li>}
              </ul>
            </div>
          </div>
        )}

        {tab === "people" && (
          <section className="overflow-hidden rounded-3xl border border-green-deep/10 bg-white shadow-card">
            <div className="border-b border-ink/5 px-6 py-4">
              <h2 className="font-display text-xl font-bold text-green-deep">Supporters ({filteredPeople.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase tracking-wider text-ink/50">
                    <th className="px-4 py-3">Registered</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPeople.map((s) => (
                    <tr key={s.id} className="border-b border-ink/5 hover:bg-ivory/60">
                      <td className="px-4 py-3 text-xs text-ink/60">{fmtWhen(s.created_at)}</td>
                      <td className="px-4 py-3 font-medium">{s.display_name}</td>
                      <td className="px-4 py-3">
                        {s.phone_e164}
                        <div className="text-[10px] uppercase text-ink/40">{s.phone_country || "—"}</div>
                      </td>
                      <td className="px-4 py-3">{s.email || "—"}{s.email && !s.email_opt_in ? " (no bulk)" : ""}</td>
                      <td className="px-4 py-3">{s.county}, {s.state}</td>
                      <td className="px-4 py-3">{s.role.replaceAll("_", " ")}</td>
                    </tr>
                  ))}
                  {!filteredPeople.length && (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-ink/50">No supporters match.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "money" && (
          <section className="overflow-hidden rounded-3xl border border-green-deep/10 bg-white shadow-card">
            <div className="border-b border-ink/5 px-6 py-4">
              <h2 className="font-display text-xl font-bold text-green-deep">Donations ({filteredMoney.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase tracking-wider text-ink/50">
                    <th className="px-4 py-3">When</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Method</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Proof / review</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMoney.map((d) => (
                    <tr key={d.id} className="border-b border-ink/5 align-top hover:bg-ivory/60">
                      <td className="px-4 py-3 text-xs text-ink/60">{fmtWhen(d.created_at)}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{d.display_name}</div>
                        <div className="text-xs text-ink/50">{d.email || d.phone_e164 || d.reference}</div>
                      </td>
                      <td className="px-4 py-3 font-semibold">{fmtKes(Number(d.amount))}</td>
                      <td className="px-4 py-3">
                        {d.method}
                        {d.mpesa_receipt ? <div className="text-xs text-ink/50">{d.mpesa_receipt}</div> : null}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs font-semibold">{d.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <DonationReview id={d.id} status={d.status} proofs={proofsByDonation[d.id] ?? []} />
                      </td>
                    </tr>
                  ))}
                  {!filteredMoney.length && (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-ink/50">No donations match.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "email" && (
          <section className="rounded-3xl border border-green-deep/10 bg-white p-6 shadow-card">
            <h2 className="font-display text-xl font-bold text-green-deep">Send email</h2>
            <p className="mt-1 text-sm text-ink/60">Brevo. Opt-in lists, except monthly pledges which use donation emails.</p>
            <div className="mt-4">
              <MessageComposer />
            </div>
          </section>
        )}

        {tab === "content" && <AdminContent gallery={gallery} media={media} manifestos={manifestos} />}
      </div>
    </main>
    </AdminToastProvider>
  );
}

function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      className="relative flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/10 transition-transform duration-300 hover:border-gold hover:bg-gold/20 active:scale-95"
    >
      <span
        className={`absolute h-0.5 w-6 rounded-full bg-gold transition-all duration-300 ${
          open ? "translate-y-0 rotate-45" : "-translate-y-2"
        }`}
      />
      <span
        className={`absolute h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${
          open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
        }`}
      />
      <span
        className={`absolute h-0.5 w-6 rounded-full bg-gold transition-all duration-300 ${
          open ? "translate-y-0 -rotate-45" : "translate-y-2"
        }`}
      />
    </button>
  );
}

function Kpi({ icon: Icon, label, value, sub }: { icon: typeof Users; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-green-deep/10 bg-white/90 p-5 shadow-card">
      <div className="flex items-center gap-2 text-green-deep">
        <Icon className="h-4 w-4" />
        <div className="text-xs font-semibold uppercase tracking-wider text-ink/50">{label}</div>
      </div>
      <div className="mt-2 font-display text-2xl font-bold text-green-deep">{value}</div>
      <div className="mt-1 text-xs text-ink/50">{sub}</div>
    </div>
  );
}

function CsvBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-1.5 rounded-full border border-green-deep/20 bg-white px-3 py-2 text-xs font-semibold text-green-deep hover:border-gold">
      <Download className="h-3.5 w-3.5" /> {label}
    </button>
  );
}
