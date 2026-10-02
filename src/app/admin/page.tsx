import { isDarajaConfigured } from "@/lib/daraja";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase/admin";
import AdminDashboard, { type AdminDonation, type AdminSupporter } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-green-deep">Admin</h1>
        <p className="mt-4 text-ink/70">
          Add Supabase keys to <code>.env.local</code>, then run <code>supabase/schema.sql</code>.
        </p>
      </main>
    );
  }

  const db = supabaseAdmin();
  const [supportersRes, donationsRes, proofsRes, paidSumRes, pendingRes] = await Promise.all([
    db.from("supporters").select("id, display_name, phone_e164, phone_country, email, email_opt_in, state, county, role, created_at").order("created_at", { ascending: false }).limit(2000),
    db.from("donations").select("id, display_name, phone_e164, email, amount, currency, frequency, cause, method, status, reference, till_number, mpesa_receipt, created_at, paid_at").order("created_at", { ascending: false }).limit(2000),
    db.from("payment_proofs").select("id, donation_id, storage_path, file_name"),
    db.from("donations").select("amount").eq("status", "paid"),
    db.from("donations").select("id", { count: "exact", head: true }).eq("status", "needs_review"),
  ]);

  const supporters = (supportersRes.data ?? []) as AdminSupporter[];
  const donations = (donationsRes.data ?? []) as AdminDonation[];
  const proofs = proofsRes.data ?? [];
  const paidTotal = (paidSumRes.data ?? []).reduce((sum, row) => sum + Number(row.amount || 0), 0);

  const proofsByDonation: Record<string, { id: string; file_name: string; url: string | null }[]> = {};
  await Promise.all(
    proofs.map(async (p) => {
      const { data: signed } = await db.storage.from("payment-proofs").createSignedUrl(p.storage_path, 3600);
      const list = proofsByDonation[p.donation_id] ?? [];
      list.push({ id: p.id, file_name: p.file_name, url: signed?.signedUrl ?? null });
      proofsByDonation[p.donation_id] = list;
    })
  );

  return (
    <AdminDashboard
      supporters={supporters}
      donations={donations}
      proofsByDonation={proofsByDonation}
      pendingReview={pendingRes.count ?? 0}
      paidTotal={paidTotal}
      paidCount={(paidSumRes.data ?? []).length}
      daraja={{
        configured: isDarajaConfigured(),
        sandbox: process.env.DARAJA_ENV !== "production",
        till: process.env.NEXT_PUBLIC_MPESA_TILL || process.env.DARAJA_SHORTCODE || null,
      }}
    />
  );
}
