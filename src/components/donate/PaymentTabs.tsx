"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowLeft, Smartphone, Building2, Globe, Copy, Check,
  ShieldCheck, Upload, AlertCircle,
} from "lucide-react";
import type { Cause, Frequency, Method } from "@/app/donate/page";
import { validateName, validateMpesaPhone, validateEmail, generateReference, capMpesaPhone, mpesaPhoneMaxLength } from "@/lib/validation";

export default function PaymentTabs({
  method,
  onMethodChange,
  onBack,
  cause,
  amount,
  currency,
  frequency,
}: {
  method: Method | null;
  onMethodChange: (m: Method) => void;
  onBack: () => void;
  cause: Cause;
  amount: number;
  currency: "KES" | "USD";
  frequency: Frequency;
}) {
  const [tab, setTabRaw] = useState<"MPESA" | "BANK" | "PAYPAL">("MPESA");
  const setTab = (t: "MPESA" | "BANK" | "PAYPAL") => {
    setTabRaw(t);
    onMethodChange(t === "MPESA" ? "MPESA" : t === "BANK" ? "KCB" : "PAYPAL");
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-green-deep">How would you like to pay?</h2>
      <p className="mt-1 text-sm text-ink/60">
        {currency === "KES" ? "KES" : "$"} {amount.toLocaleString()} {" "}
        {frequency === "ONCE" ? "One-time" : "Monthly"}
      </p>

      <div className="mt-6 flex gap-1 rounded-full bg-ink/5 p-1">
        <button onClick={() => setTab("MPESA")} className={tabCls(tab === "MPESA")}>
          <Smartphone className="h-4 w-4" /> M-Pesa
        </button>
        <button onClick={() => setTab("BANK")} className={tabCls(tab === "BANK")}>
          <Building2 className="h-4 w-4" /> Bank
        </button>
        <button onClick={() => setTab("PAYPAL")} className={tabCls(tab === "PAYPAL")}>
          <Globe className="h-4 w-4" /> Intl
        </button>
      </div>

      <div className="mt-8">
        {tab === "MPESA" && <MpesaForm amount={amount} currency={currency} onMethodChange={onMethodChange} />}
        {tab === "BANK" && <BankForm amount={amount} currency={currency} onMethodChange={onMethodChange} />}
        {tab === "PAYPAL" && <PaypalForm />}
      </div>

      <div className="mt-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-ink/60 transition-colors hover:text-green-deep"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      </div>
    </div>
  );
}

function tabCls(active: boolean) {
  return `flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
    active ? "bg-white text-green-deep shadow" : "text-ink/50 hover:text-green-deep"
  }`;
}

function MpesaForm({
  amount,
  currency,
  onMethodChange,
}: {
  amount: number;
  currency: "KES" | "USD";
  onMethodChange: (m: Method) => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [honeypot, setHoneypot] = useState("");
  const [formLoadedAt] = useState(() => Date.now());

  const errors = {
    name: validateName(name),
    phone: validateMpesaPhone(phone),
    email: validateEmail(email),
  };
  const valid = !errors.name && !errors.phone && !errors.email;

  const blur = (f: string) => setTouched({ ...touched, [f]: true });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (honeypot.trim() !== "") return;
    if (Date.now() - formLoadedAt < 2000) return;
    setTouched({ name: true, phone: true, email: true });
    if (!valid) return;
    onMethodChange("MPESA");
    alert(
      "M-Pesa details captured.\n\nNext step: wire Safaricom Daraja STK Push here.\n\n" +
        JSON.stringify({ name, phone, email, amount, currency }, null, 2)
    );
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        type="text"
        name="hp_mpesa"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
      <div className="rounded-2xl border-2 border-gold/40 bg-gold/5 p-4 text-sm">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-dark" />
          <div>
            <div className="font-semibold text-green-deep">Secure M-Pesa Prompt</div>
            <div className="text-ink/70">
              You will receive an STK push on your phone to confirm KES{" "}
              {currency === "KES" ? amount.toLocaleString() : (amount * 129).toLocaleString()}.
            </div>
          </div>
        </div>
      </div>

      <Field
        label="Full Name"
        value={name}
        onChange={setName}
        onBlur={() => blur("name")}
        error={touched.name ? errors.name : undefined}
        placeholder="Nathaniel Garang Aduotdit"
      />
      <Field
        label="M-Pesa Phone (10 digits, starts 01 or 07)"
        helper="Examples: 0712345678  0112345678  +254712345678"
        value={phone}
        onChange={setPhone}
        onBlur={() => blur("phone")}
        error={touched.phone ? errors.phone : undefined}
        placeholder="0712345678"
      />
      <Field
        label="Email (for receipt)"
        value={email}
        onChange={setEmail}
        onBlur={() => blur("email")}
        error={touched.email ? errors.email : undefined}
        type="email"
        placeholder="you@example.com"
      />

      <button
        type="submit"
        disabled={!valid}
        className="btn-gold w-full justify-center disabled:cursor-not-allowed disabled:opacity-40"
      >
        Send M-Pesa Prompt
      </button>
    </form>
  );
}

function BankForm({
  amount,
  currency,
  onMethodChange,
}: {
  amount: number;
  currency: "KES" | "USD";
  onMethodChange: (m: Method) => void;
}) {
  const [ref] = useState(() => generateReference());
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const accounts = [
    { bank: "KCB Bank", acc: "1142057259", name: "Diphihan Misoy", till: null as string | null },
    { bank: "Co-operative Bank", acc: "01109040816100", name: "Eston Kinyua", till: "4053712 / 4055902" },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-green-deep/20 bg-green-deep/5 p-4">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-green-deep">
          Your Reference Code
        </div>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="font-mono text-base font-bold text-green-deep sm:text-lg">{ref}</span>
          <button
            type="button"
            onClick={() => copy(ref, "ref")}
            className="rounded-lg bg-white p-2 transition-colors hover:bg-gold/20"
          >
            {copied === "ref" ? <Check className="h-4 w-4 text-green-deep" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        <div className="mt-2 text-xs text-ink/60">
          Include this in your transfer description. Save it for your receipt.
        </div>
      </div>

      {accounts.map((a) => (
        <div key={a.bank} className="rounded-2xl border border-ink/10 bg-white p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-green-deep">{a.bank}</div>
              <div className="mt-1 font-mono text-sm text-ink">{a.acc}</div>
              <div className="text-xs text-ink/60">Name: {a.name}</div>
              {a.till && <div className="text-xs text-ink/60">Till: {a.till}</div>}
            </div>
            <button
              type="button"
              onClick={() => copy(a.acc, a.bank)}
              className="rounded-lg bg-ink/5 p-2 transition-colors hover:bg-gold/20"
            >
              {copied === a.bank ? <Check className="h-4 w-4 text-green-deep" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>
      ))}

      <div className="rounded-2xl border border-green-deep/20 bg-green-deep/5 p-4 text-center">
        <p className="text-sm text-ink/80">
          Transferred <span className="font-semibold text-green-deep">{currency === "KES" ? "KES" : "$"} {amount.toLocaleString()}</span>?
          Upload your proof below to complete the donation.
        </p>
      </div>

      <ProofUpload reference={ref} />
    </div>
  );
}

function PaypalForm() {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-8 text-center">
      <Globe className="mx-auto h-10 w-10 text-green-deep" />
      <div className="mt-3 font-display text-xl font-bold text-green-deep">
        International Payments
      </div>
      <p className="mt-2 text-sm text-ink/60">
        PayPal gateway is being deployed. In the meantime, use bank transfer or
        contact the Diaspora Desk for alternative payment options.
      </p>
      <button
        type="button"
        className="btn-outline mt-6 justify-center border-ink/20 text-green-deep hover:border-gold"
      >
        Contact Diaspora Desk
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  required,
  placeholder,
  error,
  helper,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string | null;
  helper?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-ink/70">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => {
          const isPhone = label.toLowerCase().includes("phone");
          const next = isPhone ? capMpesaPhone(e.target.value) : e.target.value;
          onChange(next);
        }}
        onKeyDown={(e) => {
          const isPhone = label.toLowerCase().includes("phone");
          if (!isPhone) return;

          // Block whitespace & separators
          if ([" ", "-", "(", ")"].includes(e.key)) {
            e.preventDefault();
            return;
          }

          // Block further digits/plus once we've hit the cap for the current prefix
          if (/^\d$/.test(e.key) || e.key === "+") {
            const el = e.target as HTMLInputElement;
            const selLen = (el.selectionEnd ?? 0) - (el.selectionStart ?? 0);
            const projected = value.length - selLen + 1;
            const max = mpesaPhoneMaxLength(value);
            if (projected > max) e.preventDefault();
          }
        }}
        onPaste={(e) => {
          const isPhone = label.toLowerCase().includes("phone");
          if (isPhone) {
            e.preventDefault();
            const pasted = e.clipboardData.getData("text");
            onChange(capMpesaPhone(pasted));
          }
        }}
        onBlur={onBlur}
        placeholder={placeholder}
        inputMode={label.toLowerCase().includes("phone") ? "numeric" : undefined}
        autoComplete={label.toLowerCase().includes("phone") ? "tel" : label.toLowerCase().includes("email") ? "email" : "off"}
        maxLength={label.toLowerCase().includes("phone") ? 13 : undefined}
        className={`mt-1 w-full rounded-xl border-2 bg-white px-4 py-3 outline-none transition-colors placeholder:text-ink/30 ${
          error ? "border-campaignred focus:border-campaignred" : "border-ink/10 focus:border-gold"
        }`}
      />
      {error ? (
        <div className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-campaignred">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      ) : helper ? (
        <div className="mt-1.5 text-xs text-ink/50">{helper}</div>
      ) : null}
    </div>
  );
}