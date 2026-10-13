import Navbar from "@/components/layout/Navbar";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Footer from "@/components/layout/Footer";
import JoinForm from "@/components/join/JoinForm";
import { generateMetadata, faqSchema } from "@/lib/seo";
import { Users } from "lucide-react";

export const metadata = generateMetadata({
  title: "Join the Movement",
  description: "Register as a Supporter, Volunteer, Campaign Agent, or Donor for the R-SPLM/F People First movement. Every supporter counts in the 2026 South Sudan general elections.",
  path: "/join",
  images: [
    {
      url: "/images/nathaniel-portrait.jpg",
      alt: "Join the People First Movement - Support Nathaniel Garang Aduotdit for President 2026",
      width: 1200,
      height: 630,
    },
  ],
});

const joinFAQs = [
  {
    question: "Who can join the R-SPLM/F People First movement?",
    answer: "Any South Sudanese citizen aged 18 and above who supports the values of unity, reform, and people-first governance can join as a Supporter, Volunteer, Campaign Agent, or Donor.",
  },
  {
    question: "What happens after I register?",
    answer: "Once registered, you will be assigned to your local boma and payam coordination committee. A campaign agent will contact you within 48 hours with next steps for engagement.",
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes. We use encrypted storage and comply with data protection standards. Your information is used only for campaign coordination and is never shared with third parties without consent.",
  },
  {
    question: "Can I volunteer from outside South Sudan?",
    answer: "Absolutely. Our diaspora network spans Kenya, Uganda, UK, USA, Australia, and more. Diaspora volunteers play a vital role in advocacy, fundraising, and voter outreach.",
  },
  {
    question: "What is the difference between a Supporter and a Campaign Agent?",
    answer: "A Supporter registers to show solidarity and receive updates. A Campaign Agent takes on active responsibilities: mobilizing voters, organizing events, and coordinating at the boma/payam level.",
  },
];

export default function JoinPage() {
  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <main className="min-h-screen bg-ivory pb-20">
        {/* Dark header strip for navbar contrast */}
        <section className="bg-hero-gradient pb-12 pt-32">
          <div className="container-x max-w-2xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
              <Users className="h-3 w-3" /> Grassroots Mobilization
            </div>
            <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
              Join the Movement
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Every supporter counts. Register today to stand with Hon. Nathaniel Garang Aduotdit and the People First movement.
            </p>
          </div>
        </section>

        <div className="container-x max-w-2xl -mt-6">
          <JoinForm />
          <p className="mt-6 text-center text-xs text-ink/50">
            Registered supporters are assigned to local boma and payam coordination committees.
          </p>
        </div>

        {/* FAQ Section */}
        <section className="container-x py-16" aria-labelledby="join-faq-heading">
          <div className="mx-auto max-w-3xl">
            <h2 id="join-faq-heading" className="font-display text-2xl font-bold text-green-deep text-center sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-8 space-y-4">
              {joinFAQs.map((faq, i) => (
                <details key={i} className="group rounded-2xl border border-green-deep/10 bg-white p-6 shadow-card transition-all hover:shadow-card-hover">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-green-deep list-none">
                    {faq.question}
                    <span className="ml-4 text-gold transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <div className="mt-4 text-ink/70 leading-relaxed">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(joinFAQs)) }}
        />
      </main>
      <Footer />
    </>
  );
}