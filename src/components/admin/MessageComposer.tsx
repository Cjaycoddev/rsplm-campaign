"use client";

import { useState } from "react";
import { useAdminToast } from "@/components/admin/AdminToast";

const AUDIENCES = [
  { id: "all", label: "All with email opt-in" },
  { id: "supporters", label: "Supporters" },
  { id: "volunteers", label: "Volunteers" },
  { id: "agents", label: "Campaign agents" },
  { id: "donors", label: "Registered as donor" },
  { id: "monthly", label: "Monthly pledges" },
];

export default function MessageComposer() {
  const [audience, setAudience] = useState("all");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const toast = useAdminToast();

  const send = async () => {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/admin/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audience, subject, body }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not send.");
        toast(data.error || "Could not send email.", "err");
        return;
      }
      setResult(`Sent ${data.sent} of ${data.total} emails.`);
      toast(`Sent ${data.sent} of ${data.total} emails.`);
      setSubject("");
      setBody("");
    } catch {
      setError("Network error.");
      toast("Could not send email.", "err");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3">
      <select
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
        className="w-full rounded-xl border-2 border-ink/10 px-4 py-3 outline-none focus:border-gold"
      >
        {AUDIENCES.map((a) => (
          <option key={a.id} value={a.id}>{a.label}</option>
        ))}
      </select>
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        className="w-full rounded-xl border-2 border-ink/10 px-4 py-3 outline-none focus:border-gold"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Message body (HTML allowed). Greeting is added automatically."
        rows={6}
        className="w-full rounded-xl border-2 border-ink/10 px-4 py-3 outline-none focus:border-gold"
      />
      {error && <p className="text-xs text-campaignred">{error}</p>}
      {result && <p className="text-xs text-green-deep">{result}</p>}
      <button type="button" disabled={busy || subject.length < 3 || body.length < 3} onClick={send} className="btn-gold disabled:opacity-40">
        {busy ? "Sending..." : "Send email"}
      </button>
    </div>
  );
}
