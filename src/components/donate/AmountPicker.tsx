"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Repeat, Zap, AlertCircle } from "lucide-react";
import type { Frequency } from "@/app/donate/page";
import { validateAmount } from "@/lib/validation";

const presetsKES = [500, 1000, 5000, 10000, 50000, 100000];
const presetsUSD = [5, 10, 25, 50, 100, 250];

export default function AmountPicker({
  amount, currency, frequency, onAmountChange, onCurrencyChange, onFrequencyChange, onBack, onNext,
}: {
  amount: number;
  currency: "KES" | "USD";
  frequency: Frequency;
  onAmountChange: (n: number) => void;
  onCurrencyChange: (c: "KES" | "USD") => void;
  onFrequencyChange: (f: Frequency) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [touched, setTouched] = useState(false);
  const error = touched ? validateAmount(amount, currency) : null;
  const valid = !validateAmount(amount, currency);

  const presets = currency === "KES" ? presetsKES : presetsUSD;
  const symbol = currency === "KES" ? "KES" : "$";
  const approx = currency === "KES" ? ` $${(amount / 129).toFixed(2)}` : ` KES ${(amount * 129).toLocaleString()}`;

  const handleNext = () => {
    setTouched(true);
    if (valid) onNext();
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-green-deep">How much would you like to give?</h2>

      <div className="mt-4 inline-flex rounded-full bg-ink/5 p-1">
        {(["KES", "USD"] as const).map((c) => (
          <button
            key={c}
            onClick={() => { onCurrencyChange(c); onAmountChange(0); setTouched(false); }}
            className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-all ${currency === c ? "bg-white text-green-deep shadow" : "text-ink/50 hover:text-green-deep"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => { onAmountChange(p); setTouched(false); }}
            className={`rounded-xl border-2 py-4 text-sm font-semibold transition-all ${
              amount === p ? "border-gold bg-gold/10 text-green-deep shadow-gold" : "border-ink/10 text-ink hover:border-gold/50"
            }`}
          >
            {symbol} {p.toLocaleString()}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium text-ink/70">Or enter a custom amount</label>
        <div className={`mt-1 flex items-center rounded-xl border-2 bg-white px-4 transition-colors ${error ? "border-campaignred" : "border-ink/10 focus-within:border-gold"}`}>
          <span className={`text-sm font-bold ${error ? "text-campaignred" : "text-ink/50"}`}>{symbol}</span>
          <input
            type="number"
            min={1}
            value={amount || ""}
            onChange={(e) => onAmountChange(Number(e.target.value))}
            onBlur={() => setTouched(true)}
            placeholder="0"
            className="w-full bg-transparent py-3 pl-3 text-lg font-semibold outline-none"
          />
        </div>
        {amount > 0 && !error && (
          <div className="mt-1.5 text-xs text-ink/50">{approx}</div>
        )}
        {error && (
          <div className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-campaignred">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => onFrequencyChange("ONCE")}
          className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${frequency === "ONCE" ? "border-gold bg-gold/5" : "border-ink/10 hover:border-gold/40"}`}
        >
          <Zap className="h-5 w-5 flex-shrink-0 text-green-deep" />
          <div>
            <div className="text-sm font-semibold text-green-deep">One-time</div>
            <div className="text-xs text-ink/60">Single contribution</div>
          </div>
        </button>
        <button
          onClick={() => onFrequencyChange("MONTHLY")}
          className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${frequency === "MONTHLY" ? "border-gold bg-gold/5" : "border-ink/10 hover:border-gold/40"}`}
        >
          <Repeat className="h-5 w-5 flex-shrink-0 text-green-deep" />
          <div>
            <div className="text-sm font-semibold text-green-deep">Monthly</div>
            <div className="text-xs text-ink/60">Sustained support</div>
          </div>
        </button>
      </div>

      {frequency === "MONTHLY" && (
        <div className="mt-3 rounded-2xl border border-gold/30 bg-gold/5 p-3 text-xs text-ink/70">
          Monthly support via M-Pesa is a standing order  our team will send you a reminder each month.
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button onClick={onBack} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-ink/60 hover:text-green-deep">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button
          onClick={handleNext}
          disabled={!valid}
          className="btn-gold disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}