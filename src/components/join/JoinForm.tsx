"use client";

import { useState } from "react";
import { Check, ArrowRight, ArrowLeft, User, Phone, Mail, Briefcase, AlertCircle } from "lucide-react";
import { STATES, STATE_LIST, ROLES, type Role } from "@/lib/states";
import { validateName, validatePhone, validateEmail, validateState, validateCounty, validateRole } from "@/lib/validation";

type Errors = Partial<Record<"name" | "phone" | "email" | "state" | "county" | "role", string>>;

export default function JoinForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [county, setCounty] = useState("");
  const [role, setRole] = useState<Role | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [formLoadedAt] = useState(() => Date.now());

  const counties = state ? STATES[state] : [];

  const runValidate = (fields: (keyof Errors)[]) => {
    const next: Errors = { ...errors };
    for (const f of fields) {
      let err: string | null = null;
      if (f === "name") err = validateName(name);
      else if (f === "phone") err = validatePhone(phone);
      else if (f === "email") err = validateEmail(email);
      else if (f === "state") err = validateState(state);
      else if (f === "county") err = validateCounty(county);
      else if (f === "role") err = validateRole(role ?? "");
      if (err) next[f] = err; else delete next[f];
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const blur = (field: keyof Errors) => {
    setTouched({ ...touched, [field]: true });
    runValidate([field]);
  };

  const step1Valid = !validateName(name) && !validatePhone(phone) && !validateEmail(email);
  const step2Valid = !validateState(state) && !validateCounty(county);
  const step3Valid = !validateRole(role ?? "");

  const goStep2 = () => { if (runValidate(["name", "phone", "email"])) setStep(2); };
  const goStep3 = () => { if (runValidate(["state", "county"])) setStep(3); };

  const submit = async () => {
    // Anti-bot: honeypot must be empty
    if (honeypot.trim() !== "") return;
    // Anti-bot: humans take >2s to fill a form
    if (Date.now() - formLoadedAt < 2000) return;

    if (!runValidate(["name", "phone", "email", "state", "county", "role"])) return;
    setSubmitting(true);
    try {
      // TODO: POST to /api/join when backend is wired
      await new Promise((r) => setTimeout(r, 600));
      alert(
        "Registration captured.\n\n" +
          JSON.stringify({ name, phone, email, state, county, role }, null, 2)
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-green-deep/10 bg-white p-6 shadow-card sm:p-8">
      {/* Honeypot  bots fill this, humans don't see it */}
      <input
        type="text"
        name="hp_website"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
      {/* Progress */}
      <div className="mb-8 flex items-center justify-center gap-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all ${
                step > n ? "bg-gold text-ink" : step === n ? "bg-green-deep text-white shadow-card" : "bg-ink/10 text-ink/40"
              }`}
            >
              {step > n ? <Check className="h-4 w-4" /> : n}
            </div>
            {n < 3 && <div className="h-px w-8 bg-ink/15" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <div>
            <h2 className="font-display text-2xl font-bold text-green-deep">Tell us about you</h2>
            <p className="mt-1 text-sm text-ink/60">Basic details so we can reach you.</p>
          </div>

          <Field
            icon={<User className="h-4 w-4" />}
            label="Full Legal Name"
            value={name}
            onChange={setName}
            onBlur={() => blur("name")}
            placeholder="Nathaniel Garang Aduotdit"
            error={touched.name ? errors.name : undefined}
          />
          <Field
            icon={<Phone className="h-4 w-4" />}
            label="Phone Number"
            value={phone}
            onChange={setPhone}
            onBlur={() => blur("phone")}
            placeholder="+211 912 345 678"
            error={touched.phone ? errors.phone : undefined}
          />
          <Field
            icon={<Mail className="h-4 w-4" />}
            label="Email (optional  recommended for receipts)"
            value={email}
            onChange={setEmail}
            onBlur={() => blur("email")}
            placeholder="you@example.com"
            type="email"
            error={touched.email ? errors.email : undefined}
          />

          <div className="flex justify-end pt-2">
            <button
              onClick={goStep2}
              disabled={!step1Valid}
              className="btn-gold disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <div>
            <h2 className="font-display text-2xl font-bold text-green-deep">Where are you based?</h2>
            <p className="mt-1 text-sm text-ink/60">We assign you to your local coordination committee.</p>
          </div>

          <div>
            <label className="text-sm font-medium text-ink/70">State of Residence</label>
            <select
              value={state}
              onChange={(e) => { setState(e.target.value); setCounty(""); }}
              onBlur={() => blur("state")}
              className={`mt-1 w-full rounded-xl border-2 bg-white px-4 py-3 outline-none transition-colors focus:border-gold ${
                touched.state && errors.state ? "border-campaignred" : "border-ink/10"
              }`}
            >
              <option value="">Select a state</option>
              {STATE_LIST.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            {touched.state && errors.state && <FieldError msg={errors.state} />}
          </div>

          <div>
            <label className="text-sm font-medium text-ink/70">County</label>
            <select
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              onBlur={() => blur("county")}
              disabled={!state}
              className={`mt-1 w-full rounded-xl border-2 bg-white px-4 py-3 outline-none transition-colors focus:border-gold disabled:bg-ink/5 ${
                touched.county && errors.county ? "border-campaignred" : "border-ink/10"
              }`}
            >
              <option value="">{state ? "Select a county" : "Select a state first"}</option>
              {counties.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {touched.county && errors.county && <FieldError msg={errors.county} />}
          </div>

          <div className="flex justify-between pt-2">
            <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-ink/60 hover:text-green-deep">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              onClick={goStep3}
              disabled={!step2Valid}
              className="btn-gold disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div>
            <h2 className="font-display text-2xl font-bold text-green-deep">How will you serve?</h2>
            <p className="mt-1 text-sm text-ink/60">Choose your role in the movement.</p>
          </div>

          <div className="space-y-3">
            {ROLES.map((r) => {
              const selected = role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => { setRole(r.id); setTouched({ ...touched, role: true }); setErrors((e) => { const c = { ...e }; delete c.role; return c; }); }}
                  className={`flex w-full items-start gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
                    selected ? "border-gold bg-gold/5 shadow-gold" : "border-ink/10 hover:border-gold/50 hover:shadow-card"
                  }`}
                >
                  <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full transition-colors ${selected ? "bg-gold text-ink" : "bg-green-light text-green-deep"}`}>
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-green-deep">{r.label}</div>
                    <div className="mt-0.5 text-sm text-ink/60">{r.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
          {touched.role && errors.role && <FieldError msg={errors.role} />}

          <div className="flex justify-between pt-2">
            <button onClick={() => setStep(2)} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-ink/60 hover:text-green-deep">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              onClick={submit}
              disabled={!step3Valid || submitting}
              className="btn-gold disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "Submitting..." : "Complete Registration"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  icon, label, value, onChange, onBlur, placeholder, type = "text", error,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-ink/70">{label}</label>
      <div className={`mt-1 flex items-center gap-3 rounded-xl border-2 bg-white px-4 transition-colors ${error ? "border-campaignred" : "border-ink/10 focus-within:border-gold"}`}>
        <span className={error ? "text-campaignred" : "text-ink/40"}>{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className="w-full bg-transparent py-3 outline-none placeholder:text-ink/30"
        />
      </div>
      {error && <FieldError msg={error} />}
    </div>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <div className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-campaignred">
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
      <span>{msg}</span>
    </div>
  );
}