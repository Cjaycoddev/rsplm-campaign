import Image from "next/image";
import Link from "next/link";
import {
  Users, Vote, MapPin, UserCheck, Heart, ArrowRight, Quote,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatCounter from "@/components/home/StatCounter";
import CardDeck from "@/components/home/CardDeck";

const PILLARS_MANIFESTO = [
  { n: "01", t: "Unite the Nation", d: "Heal the past. End tribalism. One South Sudan.", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop" },
  { n: "02", t: "Power to the People", d: "Free, fair, transparent elections.", img: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=800&auto=format&fit=crop" },
  { n: "03", t: "Jobs, Not Promises", d: "70% youth focus. 50,000 start-ups a year.", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop" },
  { n: "04", t: "End Corruption", d: "Zero tolerance. Full asset declaration.", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop" },
  { n: "05", t: "Back to the World", d: "Global partnerships. Diaspora compact.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop" },
  { n: "06", t: "Feed the Nation", d: "30M hectares. Agricultural revolution.", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop" },
  { n: "07", t: "Social Benefit Fund", d: "Safety net for every citizen.", img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop" },
  { n: "08", t: "Free Healthcare", d: "Free at point of care.", img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop" },
  { n: "09", t: "Free Education", d: "Nursery to university.", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop" },
];

const PEOPLE_FIRST = ["Unite", "Democracy", "Jobs", "Accountability", "Diplomacy"];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-hero-gradient pt-24">
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/rally-juba.jpg" alt="" fill className="object-cover" priority />
        </div>
        <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
              Next President  South Sudan 2026
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Hon. Nathaniel<br />
              <span className="text-gold">Garang&apos; Aduot</span>
            </h1>
            <p className="mt-6 text-xl font-medium text-white/90 sm:text-2xl">
              Serving with Honor. Leading with Heart.
            </p>
            <p className="mt-6 max-w-xl text-base text-white/70">
              South Sudan&apos;s future is built by putting people first  protecting peace, restoring trust, and creating opportunities that reach every community. When unity guides our choices, progress becomes real and shared by all.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/join" className="btn-gold">
                Join the Movement <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/manifesto" className="btn-outline">
                Our Manifesto
              </Link>
            </div>
          </div>

          <div className="relative animate-fade-up">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md">
              <div className="absolute -inset-4 rounded-3xl bg-gold/20 blur-3xl" />
              <div className="relative h-full overflow-hidden rounded-3xl border-2 border-gold/40 shadow-2xl">
                <Image src="/images/nathaniel-portrait.png" alt="Hon. Nathaniel Garang Aduot" fill className="object-cover" priority />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-6 py-2 text-xs font-bold uppercase tracking-wider text-ink shadow-gold">
                For President  South Sudan 2026
              </div>
            </div>
          </div>
        </div>

        {/* People First strip */}
        <div className="relative border-t border-white/10 bg-black/30 backdrop-blur-sm">
          <div className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 text-xs font-bold uppercase tracking-[0.25em] text-gold sm:text-sm">
            {PEOPLE_FIRST.map((p, i) => (
              <span key={p} className="flex items-center gap-4">
                {p}
                {i < PEOPLE_FIRST.length - 1 && <span className="h-1 w-1 rounded-full bg-gold/50" />}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MOVEMENT BANNER */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src="/images/rally-juba.jpg" alt="The People's Movement" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Juba Rally</div>
              <div className="mt-1 font-display text-2xl font-bold">The People Have Spoken</div>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">The People&apos;s Movement</div>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              A Nation Ready<br />for Change
            </h2>
            <p className="mt-6 text-lg text-white/70">
              From every county and every state, South Sudanese are rising together to demand reform, unity, and a future they can believe in.
            </p>
            <Link href="/join" className="btn-gold mt-8">
              Stand With Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-ivory py-20">
        <div className="container-x">
          <div className="mb-12 text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">The Movement is Growing</div>
            <h2 className="mt-2 font-display text-3xl font-bold text-green-deep sm:text-4xl">Real numbers. Real people. Real change.</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCounter value={6000250} label="Total Supporters" icon={<Users className="h-6 w-6" />} />
            <StatCounter value={4350226} label="Registered Voters" icon={<Vote className="h-6 w-6" />} />
            <StatCounter value={10} label="States Covered" suffix=" / 10" icon={<MapPin className="h-6 w-6" />} />
            <StatCounter value={12402} label="Active Agents" icon={<UserCheck className="h-6 w-6" />} />
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="bg-white py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <CardDeck />
          </div>
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">About the Candidate</div>
            <h2 className="mt-3 font-display text-3xl font-bold text-green-deep sm:text-4xl">
              A New Generation of Leadership
            </h2>
            <p className="mt-6 text-ink/80">
              Hon. Nathaniel Garang&apos; Aduot represents the next generation of South Sudanese leadership. From a nation shaped by conflict and fragile governance, he stands for change and reform  rebuilding national unity, strengthening democratic institutions, and giving young people a real stake in South Sudan&apos;s future.
            </p>
            <p className="mt-4 text-ink/70">
              His visibility has grown through diaspora engagement, political advocacy, and a policy-oriented approach to governance  transitioning South Sudan from instability to structured, people-centered leadership.
            </p>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-green-deep transition-colors hover:text-gold">
              Read Full Biography <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </section>

      {/* MANIFESTO PREVIEW */}
      <section className="bg-ivory py-20">
        <div className="container-x">
          <div className="mb-12 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Our Manifesto</div>
            <h2 className="mt-2 font-display text-3xl font-bold text-green-deep sm:text-4xl">
              Nine Pillars of Change
            </h2>
            <p className="mt-4 text-ink/70">
              A bold, actionable plan to transform South Sudan. Not a wish list  a binding commitment to every citizen.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS_MANIFESTO.map((p) => (
              <div key={p.n} className="group relative overflow-hidden rounded-2xl border border-green-deep/10 bg-white shadow-card transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-card-hover">
                <div className="relative h-32 overflow-hidden">
                  <Image src={p.img} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-deep/80 to-black/10" />
                  <div className="absolute bottom-3 left-4 font-display text-2xl font-bold text-gold">{p.n}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-green-deep">{p.t}</h3>
                  <p className="mt-2 text-sm text-ink/70">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/manifesto" className="btn-gold">
              Read the Full Manifesto <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PLEDGE */}
      <section className="bg-green-deep py-20 text-white">
        <div className="container-x max-w-3xl text-center">
          <Quote className="mx-auto h-10 w-10 text-gold" />
          <div className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold">The Pledge</div>
          <blockquote className="mt-4 font-display text-2xl font-bold italic leading-snug sm:text-3xl">
            &ldquo;This manifesto is a covenant with the people of South Sudan. Every promise here will be measured, tracked, and publicly reported.&rdquo;
          </blockquote>
          <div className="mt-6 text-sm font-semibold uppercase tracking-wider text-gold">
             Hon. Nathaniel Garang&apos; Aduot
          </div>
        </div>
      </section>

      {/* CTA  JOIN + DONATE */}
      <section className="bg-ivory py-20">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl bg-green-deep p-8 text-white sm:p-10">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
            <Heart className="h-8 w-8 text-gold" fill="currentColor" />
            <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">Fuel the Movement</h3>
            <p className="mt-3 text-white/80">
              100% of donated capital goes to verified grassroots mobilization, voter education kits, and agent training across 64 counties.
            </p>
            <Link href="/donate" className="btn-gold mt-6">Donate Now <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-gold p-8 text-ink sm:p-10">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
            <Users className="h-8 w-8" />
            <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">Join the Movement</h3>
            <p className="mt-3 text-ink/80">
              Register as a Supporter, Volunteer, Campaign Agent, or Donor. Every supporter counts.
            </p>
            <Link href="/join" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-black">
              Register Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}