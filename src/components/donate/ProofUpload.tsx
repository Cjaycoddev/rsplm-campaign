"use client";

import { useState, useRef } from "react";
import { Upload, X, Check, AlertCircle, FileText, Image as ImageIcon } from "lucide-react";
import { validateEmail, validateName } from "@/lib/validation";
import type { Cause, Frequency, Method } from "@/app/donate/page";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const ALLOWED_EXT = [".jpg", ".jpeg", ".png", ".pdf"];
const MAX_SIZE = 5 * 1024 * 1024;
const MAX_FILES = 3;

interface PickedFile {
  file: File;
  id: string;
  error?: string;
}

export default function ProofUpload({
  reference,
  amount,
  cause,
  frequency,
  method,
}: {
  reference: string;
  amount: number;
  cause: Cause;
  frequency: Frequency;
  method: Method;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState<PickedFile[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (f: File): string | null => {
    const ext = "." + (f.name.split(".").pop() || "").toLowerCase();
    if (!ALLOWED_EXT.includes(ext)) return "Only JPG, PNG, or PDF files are accepted.";
    if (!ALLOWED_TYPES.includes(f.type) && f.type !== "") return "File type not recognized. Use JPG, PNG, or PDF.";
    if (f.size > MAX_SIZE) return "File must be under 5 MB.";
    if (f.size === 0) return "File is empty.";
    return null;
  };

  const pick = (picked: FileList | null) => {
    if (!picked) return;
    const incoming: PickedFile[] = [];
    for (const f of Array.from(picked)) {
      incoming.push({
        file: f,
        id: Math.random().toString(36).slice(2),
        error: validateFile(f) ?? undefined,
      });
    }
    setFiles((prev) => [...prev, ...incoming].slice(0, MAX_FILES));
  };

  const remove = (id: string) => setFiles((f) => f.filter((x) => x.id !== id));

  const nameErr = validateName(name);
  const emailErr = validateEmail(email);
  const allValid = files.length > 0 && files.every((f) => !f.error) && !nameErr && !emailErr;

  const submit = async () => {
    if (!allValid) return;
    setSubmitting(true);
    setFormError(null);
    try {
      const fd = new FormData();
      fd.set("name", name);
      fd.set("email", email);
      fd.set("amount", String(amount));
      fd.set("currency", "KES");
      fd.set("cause", cause);
      fd.set("frequency", frequency);
      fd.set("method", method);
      fd.set("reference", reference);
      for (const f of files) fd.append("files", f.file);

      const res = await fetch("/api/donate/bank", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Upload failed.");
        return;
      }
      setSuccess(data.reference || reference);
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border-2 border-green-deep/20 bg-green-deep/5 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-deep text-white">
          <Check className="h-6 w-6" />
        </div>
        <div className="mt-3 font-display text-lg font-bold text-green-deep">Proof received</div>
        <p className="mt-1 text-sm text-ink/70">
          Your transfer is queued for review. Keep this reference for your records.
        </p>
        <div className="mt-3 font-mono text-xs text-ink/50">Ref: {success}</div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-dashed border-ink/20 bg-ink/[0.02] p-6">
      <Upload className="mx-auto h-6 w-6 text-green-deep" />
      <div className="mt-3 text-center text-sm font-semibold text-green-deep">Upload your proof of payment</div>
      <p className="mt-1 text-center text-xs text-ink/60">Screenshot or PDF. Max 3 files, 5 MB each.</p>

      <div className="mt-4 space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name as on the transfer"
          className="w-full rounded-xl border-2 border-ink/10 bg-white px-4 py-3 outline-none focus:border-gold"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email for receipt (optional)"
          type="email"
          className="w-full rounded-xl border-2 border-ink/10 bg-white px-4 py-3 outline-none focus:border-gold"
        />
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
        onChange={(e) => pick(e.target.files)}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={files.length >= MAX_FILES}
        className="mt-4 w-full rounded-xl border-2 border-green-deep/20 bg-white py-3 text-sm font-semibold text-green-deep transition-colors hover:border-gold disabled:opacity-40"
      >
        {files.length >= MAX_FILES ? "Maximum files reached" : "Choose files"}
      </button>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((f) => (
            <li
              key={f.id}
              className={`flex items-start gap-3 rounded-xl border-2 bg-white p-3 ${
                f.error ? "border-campaignred/40" : "border-ink/10"
              }`}
            >
              <span className={`mt-0.5 ${f.error ? "text-campaignred" : "text-green-deep"}`}>
                {f.file.type === "application/pdf" ? <FileText className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-ink">{f.file.name}</div>
                <div className="text-xs text-ink/50">{(f.file.size / 1024).toFixed(0)} KB</div>
                {f.error && (
                  <div className="mt-1 flex items-start gap-1.5 text-xs font-medium text-campaignred">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                    <span>{f.error}</span>
                  </div>
                )}
              </div>
              <button type="button" onClick={() => remove(f.id)} className="rounded-lg p-1.5 text-ink/40 hover:text-campaignred" aria-label="Remove file">
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 rounded-xl bg-gold/10 px-3 py-2 text-xs text-ink/70">
        Reference code: <span className="font-mono font-bold text-green-deep">{reference}</span>
      </div>
      {formError && (
        <div className="mt-3 flex items-start gap-1.5 text-xs font-medium text-campaignred">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <button type="button" onClick={submit} disabled={!allValid || submitting} className="btn-gold mt-4 w-full justify-center disabled:cursor-not-allowed disabled:opacity-40">
        {submitting ? "Uploading..." : "Submit Proof"}
      </button>
    </div>
  );
}
