import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase/admin";
import { sendTransactionalEmail, donationThanksHtml } from "@/lib/brevo";

type CallbackBody = {
  Body?: {
    stkCallback?: {
      MerchantRequestID?: string;
      CheckoutRequestID?: string;
      ResultCode?: number;
      ResultDesc?: string;
      CallbackMetadata?: { Item?: { Name: string; Value?: string | number }[] };
    };
  };
};

function meta(items: { Name: string; Value?: string | number }[] | undefined, name: string) {
  return items?.find((i) => i.Name === name)?.Value;
}

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });

  let payload: CallbackBody = {};
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }

  const cb = payload.Body?.stkCallback;
  if (!cb?.CheckoutRequestID) {
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }

  const items = cb.CallbackMetadata?.Item;
  const receipt = meta(items, "MpesaReceiptNumber");
  const paid = cb.ResultCode === 0;
  const db = supabaseAdmin();

  const { data: row } = await db
    .from("donations")
    .select("id, display_name, email, amount, currency, reference")
    .eq("checkout_request_id", cb.CheckoutRequestID)
    .maybeSingle();

  await db
    .from("donations")
    .update({
      status: paid ? "paid" : "failed",
      mpesa_receipt: receipt ? String(receipt) : null,
      mpesa_result_code: String(cb.ResultCode ?? ""),
      mpesa_payload: payload as object,
      paid_at: paid ? new Date().toISOString() : null,
    })
    .eq("checkout_request_id", cb.CheckoutRequestID);

  if (paid && row?.email) {
    void sendTransactionalEmail({
      to: row.email,
      toName: row.display_name,
      subject: "Thank you for your contribution",
      html: donationThanksHtml(
        row.display_name,
        row.reference,
        `KES ${Number(row.amount).toLocaleString()}`
      ),
    });
  }

  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
