"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Footer from "@/components/layout/Footer";
import CauseSelector from "@/components/donate/CauseSelector";
import AmountPicker from "@/components/donate/AmountPicker";
import PaymentTabs from "@/components/donate/PaymentTabs";
import { Check, Heart } from "lucide-react";
import { faqSchema } from "@/lib/seo";

export type Cause = "CAMPAIGN_OPS" | "COMMUNITY_OUTREACH" | "VOTER_EDUCATION" | "YOUTH_EMPOWERMENT" | "GENERAL_SUPPORT";
export type Frequency = "ONCE" | "MONTHLY";
export type Method = "MPESA" | "KCB" | "COOP" | "PAYPAL";

const steps = ["Cause", "Amount", "Payment"];

const donateFAQs = [
  {
    question: "How are donations used?",
    answer: "100% of donations go directly to verified grassroots mobilization, voter education kits, campaign agent training, and community outreach across all 64 counties of South Sudan. We publish quarterly financial reports for full transparency.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept M-Pesa, KCB Bank, Co-op Bank, and PayPal. M-Pesa is the primary method for contributors within Kenya and South Sudan. International donors can use PayPal or bank transfers.",
  },
  {
    question: "Is my donation tax-deductible?",
    answer: "Campaign contributions are not tax-deductible in most jurisdictions. Please consult your local tax advisor for specific guidance.",
  },
  {
    question: "Will I receive a receipt?",
    answer: "Yes. Every donation generates an official digital receipt with a unique transaction ID, sent immediately via email and SMS. Receipts include amount, date, cause, and payment method.",
  },
  {
    question: "Can I set up a recurring monthly donation?",
    answer: "Yes. You can choose between a one-time donation or a monthly recurring contribution. Monthly donors receive quarterly impact reports showing how their sustained support is making a difference.",
  },
  {
    question: "How do I verify my donation was received?",
    answer: "You can verify your donation using the M-Pesa confirmation code, KCB/Co-op transaction reference, or PayPal transaction ID. Our admin dashboard tracks all contributions in real-time with full audit trails.",
  },
];

export default function DonatePage() {
  const [step, setStep] = useState(1);
  const [cause, setCause] = useState<Cause | null>(null);
  const [amount, setAmount] = useState(0);
  const [frequency, setFrequency] = useState<Frequency>("ONCE");
  const [method, setMethod] = useState<Method | null>(null);

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <main className="min-h-screen bg-ivory pb-20">
        {/* Dark hero  fixes navbar contrast */}
        <section className="bg-hero-gradient pb-14 pt-32">
          <div className="container-x max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              <Heart className="h-3 w-3" fill="currentColor" /> Fuel the Movement
            </div>
            <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
              Contribute to the Future
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Every contribution powers our mission to unite, reform, and rebuild South Sudan.
            </p>
          </div>
        </section>

        <div className="container-x max-w-3xl -mt-6">

          <div className="mb-10 flex items-center justify-center gap-3">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all ${
                    step > i + 1
                      ? "bg-gold text-ink"
                      : step === i + 1
                      ? "bg-green-deep text-white shadow-card"
                      : "bg-ink/10 text-ink/40"
                  }`}
                >
                  {step > i + 1 ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`hidden text-sm font-medium sm:inline ${step === i + 1 ? "text-green-deep" : "text-ink/40"}`}>
                  {s}
                </span>
                {i < steps.length - 1 && <div className="h-px w-8 bg-ink/15" />}
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-green-deep/10 bg-white p-6 shadow-card sm:p-8">
            {step === 1 && (
              <CauseSelector
                value={cause}
                onChange={(v) => {
                  setCause(v);
                  setStep(2);
                }}
              />
            )}
            {step === 2 && (
              <AmountPicker
                amount={amount}
                frequency={frequency}
                onAmountChange={setAmount}
                onFrequencyChange={setFrequency}
                onBack={() => setStep(1)}
                onNext={() => setStep(3)}
              />
            )}
            {step === 3 && cause && (
              <PaymentTabs
                method={method}
                onMethodChange={setMethod}
                onBack={() => setStep(2)}
                cause={cause}
                amount={amount}
                frequency={frequency}
              />
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink/50">
            <span>100% to verified grassroots mobilization</span>
            <span>Official digital receipt</span>
            <span>Full audit trail</span>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="container-x py-16" aria-labelledby="donate-faq-heading">
          <div className="mx-auto max-w-3xl">
            <h2 id="donate-faq-heading" className="font-display text-2xl font-bold text-green-deep text-center sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-8 space-y-4">
              {donateFAQs.map((faq, i) => (
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(donateFAQs)) }}
        />
      </main>
      <Footer />
    </>
  );
}