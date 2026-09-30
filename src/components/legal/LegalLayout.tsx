import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Section {
  heading: string;
  body: string[];
}

export default function LegalLayout({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory">
        <section className="bg-hero-gradient pt-32 pb-16 text-white">
          <div className="container-x max-w-3xl text-center">
            <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h1>
            <p className="mt-4 text-sm text-white/60">Last updated: {updated}</p>
            <p className="mx-auto mt-6 max-w-2xl text-base text-white/80">{intro}</p>
          </div>
        </section>

        <section className="container-x py-16">
          <div className="mx-auto max-w-3xl space-y-10">
            {sections.map((s, i) => (
              <div key={i}>
                <h2 className="font-display text-xl font-bold text-green-deep sm:text-2xl">
                  {i + 1}. {s.heading}
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink/75">
                  {s.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}