import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { galleryRowToItem, listGallery } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isSupabaseConfigured()) return NextResponse.json({ items: [] });
  const rows = await listGallery({ publishedOnly: true });
  return NextResponse.json({ items: rows.map(galleryRowToItem) });
}
