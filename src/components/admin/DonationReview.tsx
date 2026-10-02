"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Proof = { id: string; file_name: string; url: string | null };

export default function DonationReview({
  id,
  status,
  proofs,
}: {
  id: string;
  status: string;
  proofs: Proof[];
}) {
  const router = useRouter();
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const review = async (action: "confirm" | "reject") => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/donations/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action, notes }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not update.");
        return;
      }
      router.refresh();
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-3 space-y-2">
      {proofs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {proofs.map((p) =>
            p.url ? (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-green-deep hover:bg-gold/20"
              >
                {p.file_name}
              </a>
            ) : (
              <span key={p.id} className="text-xs text-ink/50">{p.file_name}</span>
            )
          )}
        </div>
      )}
      {status === "needs_review" && (
        <>
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Review notes (optional)"
            className="w-full rounded-xl border-2 border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
          />
          {error && <p className="text-xs text-campaignred">{error}</p>}
          <div className="flex gap-2">
            <button type="button" disabled={busy} onClick={() => review("confirm")} className="btn-gold px-4 py-2 text-xs disabled:opacity-40">
              Confirm paid
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => review("reject")}
              className="rounded-full border-2 border-campaignred/30 px-4 py-2 text-xs font-semibold text-campaignred disabled:opacity-40"
            >
              Reject
            </button>
          </div>
        </>
      )}
    </div>
  );
}
