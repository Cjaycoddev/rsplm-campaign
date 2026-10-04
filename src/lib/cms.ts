import { supabaseAdmin } from "@/lib/supabase/admin";
import type { GalleryItem } from "@/lib/gallery";
import type { MediaItem } from "@/lib/media";
import type { Pillar } from "@/lib/manifesto";

function missingTable(error: { message?: string; code?: string } | null): boolean {
  if (!error) return false;
  const msg = `${error.code ?? ""} ${error.message ?? ""}`.toLowerCase();
  return msg.includes("pgrst") || msg.includes("does not exist") || msg.includes("schema cache");
}

export const PUBLIC_BUCKET = "campaign-public";

export const GALLERY_CATS = ["Press", "People", "Places", "Culture", "Nation"] as const;
export const MEDIA_CATS = [
  "Campaign",
  "Award",
  "Justice",
  "Diplomacy",
  "Diaspora",
  "Vision",
  "Policy",
  "Agriculture",
] as const;

export function publicObjectUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) return path;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base.replace(/\/$/, "")}/storage/v1/object/public/${PUBLIC_BUCKET}/${path}`;
}

export type GalleryRow = {
  id: string;
  title: string;
  caption: string;
  location: string | null;
  category: string;
  span: "wide" | "tall" | "normal";
  storage_path: string;
  published: boolean;
  created_at: string;
};

export type MediaRow = {
  id: string;
  kind: "press" | "blog";
  title: string;
  excerpt: string;
  category: string;
  author: string | null;
  url: string | null;
  date_label: string | null;
  cover_path: string | null;
  published: boolean;
  created_at: string;
};

export type ManifestoRow = {
  id: string;
  title: string;
  intro: string;
  pledge: string;
  pillars: Pillar[];
  status: "draft" | "live" | "archived";
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export function galleryRowToItem(row: GalleryRow): GalleryItem & { id: string } {
  const src = publicObjectUrl(row.storage_path) || row.storage_path;
  return {
    id: row.id,
    src,
    title: row.title,
    caption: row.caption,
    span: row.span,
    category: (row.category as GalleryItem["category"]) || "People",
    location: row.location || undefined,
  };
}

export function mediaRowToItem(row: MediaRow): MediaItem {
  return {
    id: row.id,
    type: row.kind,
    title: row.title,
    excerpt: row.excerpt,
    date: row.date_label || new Date(row.created_at).toLocaleDateString("en-GB", { month: "long", day: "numeric", year: "numeric" }),
    category: row.category,
    author: row.author || undefined,
    url: row.url || undefined,
  };
}

export async function listGallery(opts: { publishedOnly?: boolean } = {}): Promise<GalleryRow[]> {
  const db = supabaseAdmin();
  let q = db.from("gallery_items").select("*").order("created_at", { ascending: false });
  if (opts.publishedOnly) q = q.eq("published", true);
  const { data, error } = await q;
  if (error) {
    if (!missingTable(error)) console.error("gallery_items", error);
    return [];
  }
  return (data ?? []) as GalleryRow[];
}

export async function listMedia(opts: { publishedOnly?: boolean } = {}): Promise<MediaRow[]> {
  const db = supabaseAdmin();
  let q = db.from("media_posts").select("*").order("created_at", { ascending: false });
  if (opts.publishedOnly) q = q.eq("published", true);
  const { data, error } = await q;
  if (error) {
    if (!missingTable(error)) console.error("media_posts", error);
    return [];
  }
  return (data ?? []) as MediaRow[];
}

export async function listManifestos(): Promise<ManifestoRow[]> {
  const db = supabaseAdmin();
  const { data, error } = await db.from("manifesto_versions").select("*").order("updated_at", { ascending: false });
  if (error) {
    if (!missingTable(error)) console.error("manifesto_versions", error);
    return [];
  }
  return (data ?? []) as ManifestoRow[];
}

export async function liveManifesto(): Promise<ManifestoRow | null> {
  try {
    const db = supabaseAdmin();
    const { data, error } = await db.from("manifesto_versions").select("*").eq("status", "live").maybeSingle();
    if (error) {
      if (!missingTable(error)) console.error("live manifesto", error);
      return null;
    }
    return (data as ManifestoRow) ?? null;
  } catch {
    return null;
  }
}

export async function uploadPublicFile(folder: string, file: File): Promise<string> {
  const db = supabaseAdmin();
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `${folder}/${crypto.randomUUID()}.${ext || "jpg"}`;
  const buf = Buffer.from(await file.arrayBuffer());
  const { error } = await db.storage.from(PUBLIC_BUCKET).upload(path, buf, {
    contentType: file.type || "image/jpeg",
    upsert: false,
  });
  if (error) throw new Error(error.message);
  return path;
}
