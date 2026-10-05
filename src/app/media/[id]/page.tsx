import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, ExternalLink, Newspaper, PenLine, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getPublishedMedia, mediaRowToItem, publicObjectUrl } from "@/lib/cms";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function MediaArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isSupabaseConfigured()) notFound();
  const row = await getPublishedMedia(id);
  if (!row) notFound();

  const item = mediaRowToItem(row);
  const cover = publicObjectUrl(row.cover_path);
  const isPress = row.kind === "press";
  const paragraphs = (row.body || row.excerpt || "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory">
        <article className="container-x max-w-4xl pb-20 pt-32">
          <Link href="/media" className="inline-flex items-center gap-2 text-sm font-semibold text-green-deep hover:text-gold-dark">
            <ArrowLeft className="h-4 w-4" /> Back to Press &amp; Media
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider">
            <span className={`inline-flex items-center gap-1.5 ${isPress ? "text-green-deep" : "text-gold-dark"}`}>
              {isPress ? <Newspaper className="h-3.5 w-3.5" /> : <PenLine className="h-3.5 w-3.5" />}
              {isPress ? "Press" : "Blog"}
            </span>
            <span className="rounded-full bg-ink/5 px-2.5 py-1 text-[10px] text-ink/60">{row.category}</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold text-green-deep sm:text-4xl">{row.title}</h1>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-ink/50">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {item.date}
            </span>
            {row.author && (
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" /> {row.author}
              </span>
            )}
          </div>
          {cover && (
            <img
              src={cover}
              alt={row.title}
              className="mt-8 h-auto w-full rounded-3xl bg-ink/5"
            />
          )}
          <div className="mt-8 space-y-4 text-base leading-relaxed text-ink/80">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {row.url && (
            <a
              href={row.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-10 inline-flex"
            >
              Read original article <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
