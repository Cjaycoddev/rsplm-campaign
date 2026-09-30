import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, MapPin, Phone, MessageSquare, Globe, Users } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact  R-SPLM/F Campaign",
  description: "Reach the People First campaign. Offices, diaspora hubs, and direct lines.",
};

const OFFICES = [
  { city: "Juba", country: "South Sudan", role: "Headquarters", phone: "+211 9XX XXX XXX", email: "juba@rsplm-peoplefirst.org" },
  { city: "Nairobi", country: "Kenya", role: "Regional Coordination", phone: "+254 7XX XXX XXX", email: "nairobi@rsplm-peoplefirst.org" },
  { city: "Kampala", country: "Uganda", role: "Diaspora Desk", phone: "+256 7XX XXX XXX", email: "kampala@rsplm-peoplefirst.org" },
  { city: "London", country: "United Kingdom", role: "Europe & Diaspora", phone: "+44 7XXX XXXXXX", email: "london@rsplm-peoplefirst.org" },
  { city: "Washington", country: "United States", role: "North America", phone: "+1 (XXX) XXX-XXXX", email: "usa@rsplm-peoplefirst.org" },
  { city: "Melbourne", country: "Australia", role: "Oceania", phone: "+61 4XX XXX XXX", email: "australia@rsplm-peoplefirst.org" },
];

const DEPARTMENTS = [
  { icon: Users, title: "Grassroots & Membership", desc: "Register supporters, volunteers, and campaign agents.", email: "members@rsplm-peoplefirst.org" },
  { icon: Globe, title: "Diaspora Relations", desc: "Connect with South Sudanese abroad and diaspora investments.", email: "diaspora@rsplm-peoplefirst.org" },
  { icon: MessageSquare, title: "Media & Press", desc: "Press inquiries, interviews, and media partnerships.", email: "press@rsplm-peoplefirst.org" },
  { icon: Mail, title: "Donations & Finance", desc: "Receipts, contribution verification, and finance questions.", email: "finance@rsplm-peoplefirst.org" },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-ivory">
        <section className="bg-hero-gradient pt-32 pb-20 text-white">
          <div className="container-x text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
              <MessageSquare className="h-3 w-3" /> Contact
            </div>
            <h1 className="font-display text-4xl font-bold sm:text-5xl">Get In Touch</h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Reach the campaign through our offices in South Sudan, the region, and the global diaspora.
            </p>
          </div>
        </section>

        {/* Departments */}
        <section className="container-x -mt-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DEPARTMENTS.map(({ icon: Icon, title, desc, email }) => (
              <a
                key={title}
                href={`mailto:${email}`}
                className="card-elevated group block"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-green-light text-green-deep transition-colors group-hover:bg-gold group-hover:text-ink">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-bold text-green-deep">{title}</h3>
                <p className="mt-1 text-xs text-ink/60">{desc}</p>
                <div className="mt-3 truncate text-xs font-semibold text-gold-dark">{email}</div>
              </a>
            ))}
          </div>
        </section>

        {/* Offices */}
        <section className="container-x py-16">
          <div className="mb-10">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Global Footprint</div>
            <h2 className="mt-3 font-display text-3xl font-bold text-green-deep sm:text-4xl">Our Offices</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OFFICES.map((o) => (
              <div key={o.city} className="rounded-3xl border border-green-deep/10 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-green-deep">{o.city}</h3>
                    <div className="text-xs text-ink/60">{o.country}</div>
                  </div>
                  <span className="rounded-full bg-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-dark">
                    {o.role}
                  </span>
                </div>
                <div className="mt-5 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-ink/70">
                    <Phone className="h-4 w-4 text-gold" /> {o.phone}
                  </div>
                  <div className="flex items-center gap-2 text-ink/70">
                    <Mail className="h-4 w-4 text-gold" /> {o.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container-x pb-20">
          <div className="rounded-3xl bg-green-deep p-10 text-center text-white sm:p-14">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Prefer to reach us directly?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">
              Write to the campaign office. We respond to every serious inquiry within 48 hours.
            </p>
            <a
              href="mailto:contact@rsplm-peoplefirst.org"
              className="btn-gold mt-6 inline-flex"
            >
              <Mail className="h-4 w-4" /> contact@rsplm-peoplefirst.org
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}