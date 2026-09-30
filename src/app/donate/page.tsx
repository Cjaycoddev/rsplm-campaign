"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CauseSelector from "@/components/donate/CauseSelector";
import AmountPicker from "@/components/donate/AmountPicker";
import PaymentTabs from "@/components/donate/PaymentTabs";
import { Check, Heart } from "lucide-react";

export type Cause = "CAMPAIGN_OPS" | "COMMUNITY_OUTREACH" | "VOTER_EDUCATION" | "YOUTH_EMPOWERMENT" | "GENERAL_SUPPORT";
export type Frequency = "ONCE" | "MONTHLY";
export type Method = "MPESA" | "KCB" | "COOP" | "PAYPAL";

const steps = ["Cause", "Amount", "Payment"];

export default function DonatePage() {
  const [step, setStep] = useState(1);
  const [cause, setCause] = useState<Cause | null>(null);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState<"KES" | "USD">("KES");
  const [frequency, setFrequency] = useState<Frequency>("ONCE");
  const [method, setMethod] = useState<Method | null>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory pb-20 pt-32">
        <div className="container-x max-w-3xl">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
              <Heart className="h-3 w-3" fill="currentColor" /> Fuel the Movement
            </div>
            <h1 className="font-display text-4xl font-bold text-green-deep sm:text-5xl">
              Contribute to the Future
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-ink/70">
              Every contribution powers our mission to unite, reform, and rebuild South Sudan.
            </p>
          </div>

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
                currency={currency}
                frequency={frequency}
                onAmountChange={setAmount}
                onCurrencyChange={setCurrency}
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
                currency={currency}
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
      </main>
      <Footer />
    </>
  );
}
