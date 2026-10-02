import { NextResponse } from "next/server";
import { darajaCallbackUrl, isDarajaConfigured } from "@/lib/daraja";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export async function GET() {
  const callback = darajaCallbackUrl();
  const callbackPublic = callback.startsWith("https://") && !callback.includes("localhost");
  return NextResponse.json({
    supabase: isSupabaseConfigured(),
    daraja: isDarajaConfigured(),
    sandbox: process.env.DARAJA_ENV !== "production",
    till: process.env.NEXT_PUBLIC_MPESA_TILL || process.env.DARAJA_SHORTCODE || null,
    callbackPublic,
  });
}
