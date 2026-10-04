"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Camera, Newspaper, BookOpen, Upload } from "lucide-react";
import { GALLERY_CATS, MEDIA_CATS, publicObjectUrl, type GalleryRow, type MediaRow, type ManifestoRow } from "@/lib/cms";
import { PILLARS, type Pillar } from "@/lib/manifesto";

type Sub = "gallery" | "media" | "manifesto";

export default function AdminContent({
  gallery,
  media,
  manifestos,
}: {
  gallery: GalleryRow[];
  media: MediaRow[];
  manifestos: ManifestoRow[];
}) {
  const [sub, setSub] = useState<Sub>("gallery");
  return (
    <section className="rounded-3xl border border-green-deep/10 bg-white p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["gallery", "Gallery", Camera],
            ["media", "Media", Newspaper],
            ["manifesto", "Manifesto", BookOpen],
          ] as const
        ).map(([id, label, Icon]) => (
          <button
            key={id}
            type="button"
            onClick={() => setSub(id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
              sub === id ? "bg-green-deep text-white" : "bg-ink/5 text-ink/70 hover:text-green-deep"
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {sub === "gallery" && <GalleryAdmin items={gallery} />}
        {sub === "media" && <MediaAdmin items={media} />}
        {sub === "manifesto" && <ManifestoAdmin items={manifestos} />}
      </div>
    </section>
  );
}

function GalleryAdmin({ items }: { items: GalleryRow[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/gallery", { method: "POST", body: new FormData(e.currentTarget) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      (e.target as HTMLFormElement).reset();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-ink/60">
        Photos go into a masonry grid with the existing campaign shots. Caption sits on the image. Pull down hides it from the public site without deleting.
      </p>
      <form onSubmit={submit} className="grid gap-3 rounded-2xl border border-ink/10 bg-ivory/60 p-4 sm:grid-cols-2">
        <label className="text-sm font-medium sm:col-span-2">
          Image
          <input name="file" type="file" accept="image/jpeg,image/png,image/webp,image/gif" required className="mt-1 block w-full text-sm" />
        </label>
        <Field name="title" label="Title" required />
        <Field name="caption" label="Caption" />
        <Field name="location" label="Location (optional)" />
        <label className="text-sm font-medium">
          Category
          <select name="category" className="mt-1 w-full rounded-xl border-2 border-ink/10 px-3 py-2 text-sm">
            {GALLERY_CATS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Layout
          <select name="span" defaultValue="normal" className="mt-1 w-full rounded-xl border-2 border-ink/10 px-3 py-2 text-sm">
            <option value="normal">Square</option>
            <option value="wide">Wide</option>
            <option value="tall">Tall</option>
          </select>
        </label>
        <div className="sm:col-span-2">
          {error && <p className="mb-2 text-sm text-campaignred">{error}</p>}
          <button type="submit" disabled={busy} className="btn-gold text-sm disabled:opacity-40">
            <Upload className="h-4 w-4" /> {busy ? "Uploading..." : "Publish to gallery"}
          </button>
        </div>
      </form>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id} className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
            <div className="relative aspect-[4/3] bg-ink/5">
              {publicObjectUrl(item.storage_path) ? (
                <Image src={publicObjectUrl(item.storage_path)!} alt="" fill className="object-cover" sizes="320px" />
              ) : null}
              {!item.published && (
                <span className="absolute left-2 top-2 rounded-full bg-ink/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Pulled down
                </span>
              )}
            </div>
            <div className="p-3">
              <div className="font-display font-bold text-green-deep">{item.title}</div>
              <div className="text-xs text-ink/60">{item.caption || item.category}</div>
              <ToggleRow
                published={item.published}
                onToggle={() => patch(`/api/admin/gallery/${item.id}`, { published: !item.published }, router)}
                onDelete={() => del(`/api/admin/gallery/${item.id}`, router)}
              />
            </div>
          </li>
        ))}
        {!items.length && <li className="text-sm text-ink/50">No uploads yet.</li>}
      </ul>
    </div>
  );
}

function MediaAdmin({ items }: { items: MediaRow[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/media", { method: "POST", body: new FormData(e.currentTarget) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      (e.target as HTMLFormElement).reset();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-ink/60">
        Add a press clipping or blog note with a category and optional link. The public media page filters by those categories.
      </p>
      <form onSubmit={submit} className="grid gap-3 rounded-2xl border border-ink/10 bg-ivory/60 p-4 sm:grid-cols-2">
        <Field name="title" label="Headline" required className="sm:col-span-2" />
        <label className="text-sm font-medium sm:col-span-2">
          Excerpt
          <textarea name="excerpt" required rows={3} className="mt-1 w-full rounded-xl border-2 border-ink/10 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm font-medium">
          Type
          <select name="kind" className="mt-1 w-full rounded-xl border-2 border-ink/10 px-3 py-2 text-sm">
            <option value="press">Press</option>
            <option value="blog">Blog</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Category
          <select name="category" className="mt-1 w-full rounded-xl border-2 border-ink/10 px-3 py-2 text-sm">
            {MEDIA_CATS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <Field name="url" label="Public link (optional)" placeholder="https://" />
        <Field name="author" label="Author (optional)" />
        <Field name="date_label" label="Date label" placeholder="October 4, 2026" />
        <label className="text-sm font-medium">
          Cover image (optional)
          <input name="file" type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="mt-1 block w-full text-sm" />
        </label>
        <div className="sm:col-span-2">
          {error && <p className="mb-2 text-sm text-campaignred">{error}</p>}
          <button type="submit" disabled={busy} className="btn-gold text-sm disabled:opacity-40">
            {busy ? "Saving..." : "Publish to media"}
          </button>
        </div>
      </form>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="rounded-2xl border border-ink/10 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-gold">
                  {item.kind} · {item.category} {item.published ? "" : "· pulled down"}
                </div>
                <div className="font-display font-bold text-green-deep">{item.title}</div>
                <p className="mt-1 text-sm text-ink/60">{item.excerpt}</p>
                {item.url && (
                  <a href={item.url} className="mt-1 inline-block text-xs font-semibold text-gold-dark" target="_blank" rel="noreferrer">
                    {item.url}
                  </a>
                )}
              </div>
            </div>
            <ToggleRow
              published={item.published}
              onToggle={() => patch(`/api/admin/media/${item.id}`, { published: !item.published }, router)}
              onDelete={() => del(`/api/admin/media/${item.id}`, router)}
            />
          </li>
        ))}
        {!items.length && <li className="text-sm text-ink/50">No media posts yet.</li>}
      </ul>
    </div>
  );
}

function ManifestoAdmin({ items }: { items: ManifestoRow[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("Nine Pillars of Change");
  const [intro, setIntro] = useState(
    "A bold, actionable plan to transform South Sudan — rooted in reform, unity, and the aspirations of its people."
  );
  const [pledge, setPledge] = useState(
    "This manifesto is a covenant with the people of South Sudan. Every promise here will be measured, tracked, and publicly reported."
  );
  const [pillars, setPillars] = useState<Pillar[]>(PILLARS);

  const saveDraft = async () => {
    setBusy(true);
    setError(null);
    const fd = new FormData();
    fd.set("title", title);
    fd.set("intro", intro);
    fd.set("pledge", pledge);
    fd.set("pillars", JSON.stringify(pillars));
    try {
      const res = await fetch("/api/admin/manifesto", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save draft");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save draft");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-ink/60">
        Draft the election manifesto here. Saving keeps it private. Publish replaces the public Manifesto page. Pull down restores the original nine pillars.
      </p>
      <div className="grid gap-3">
        <label className="text-sm font-medium">
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-xl border-2 border-ink/10 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm font-medium">
          Intro
          <textarea value={intro} onChange={(e) => setIntro(e.target.value)} rows={3} className="mt-1 w-full rounded-xl border-2 border-ink/10 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm font-medium">
          Pledge
          <textarea value={pledge} onChange={(e) => setPledge(e.target.value)} rows={2} className="mt-1 w-full rounded-xl border-2 border-ink/10 px-3 py-2 text-sm" />
        </label>
      </div>
      <div className="space-y-4">
        {pillars.map((p, i) => (
          <div key={p.n + i} className="rounded-2xl border border-ink/10 p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-gold">Pillar {p.n}</div>
            <input
              value={p.title}
              onChange={(e) => setPillars(edit(pillars, i, { title: e.target.value }))}
              className="mt-2 w-full rounded-xl border-2 border-ink/10 px-3 py-2 font-display text-sm font-bold"
            />
            <input
              value={p.tagline}
              onChange={(e) => setPillars(edit(pillars, i, { tagline: e.target.value }))}
              className="mt-2 w-full rounded-xl border-2 border-ink/10 px-3 py-2 text-sm"
            />
            <textarea
              value={p.desc}
              onChange={(e) => setPillars(edit(pillars, i, { desc: e.target.value }))}
              rows={2}
              className="mt-2 w-full rounded-xl border-2 border-ink/10 px-3 py-2 text-sm"
            />
            <textarea
              value={p.points.join("\n")}
              onChange={(e) => setPillars(edit(pillars, i, { points: e.target.value.split("\n").filter(Boolean) }))}
              rows={4}
              className="mt-2 w-full rounded-xl border-2 border-ink/10 px-3 py-2 text-sm"
              placeholder="One commitment per line"
            />
            <label className="mt-2 block text-xs text-ink/50">
              Replace pillar image (optional)
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="mt-1 block w-full"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const fd = new FormData();
                  fd.set("folder", "manifesto");
                  fd.set("file", file);
                  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
                  const data = await res.json();
                  if (res.ok && data.path) {
                    setPillars(edit(pillars, i, { image: data.path }));
                  }
                }}
              />
            </label>
          </div>
        ))}
      </div>
      {error && <p className="text-sm text-campaignred">{error}</p>}
      <button type="button" disabled={busy} onClick={saveDraft} className="btn-gold text-sm disabled:opacity-40">
        {busy ? "Saving..." : "Save as draft"}
      </button>

      <h3 className="font-display text-lg font-bold text-green-deep">Saved versions</h3>
      <ul className="space-y-3">
        {items.map((m) => (
          <li key={m.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink/10 p-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gold">{m.status}</div>
              <div className="font-display font-bold">{m.title}</div>
              <div className="text-xs text-ink/50">{new Date(m.updated_at).toLocaleString("en-KE")}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {m.status !== "live" && (
                <button
                  type="button"
                  className="rounded-full bg-green-deep px-4 py-2 text-xs font-semibold text-white"
                  onClick={() => patch(`/api/admin/manifesto/${m.id}`, { action: "publish" }, router)}
                >
                  Publish to site
                </button>
              )}
              {m.status === "live" && (
                <button
                  type="button"
                  className="rounded-full border-2 border-campaignred/30 px-4 py-2 text-xs font-semibold text-campaignred"
                  onClick={() => patch(`/api/admin/manifesto/${m.id}`, { action: "unpublish" }, router)}
                >
                  Pull down
                </button>
              )}
            </div>
          </li>
        ))}
        {!items.length && <li className="text-sm text-ink/50">No drafts yet. Save one above.</li>}
      </ul>
    </div>
  );
}

function edit(list: Pillar[], i: number, patch: Partial<Pillar>): Pillar[] {
  return list.map((p, idx) => (idx === i ? { ...p, ...patch } : p));
}

function Field({
  name,
  label,
  required,
  placeholder,
  className,
}: {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`text-sm font-medium ${className ?? ""}`}>
      {label}
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border-2 border-ink/10 px-3 py-2 text-sm outline-none focus:border-gold"
      />
    </label>
  );
}

function ToggleRow({
  published,
  onToggle,
  onDelete,
}: {
  published: boolean;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="mt-3 flex gap-2">
      <button type="button" onClick={onToggle} className="rounded-full bg-ink/5 px-3 py-1.5 text-xs font-semibold">
        {published ? "Pull down" : "Put back up"}
      </button>
      <button type="button" onClick={onDelete} className="rounded-full px-3 py-1.5 text-xs font-semibold text-campaignred">
        Delete
      </button>
    </div>
  );
}

async function patch(url: string, body: object, router: ReturnType<typeof useRouter>) {
  await fetch(url, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  router.refresh();
}

async function del(url: string, router: ReturnType<typeof useRouter>) {
  if (!confirm("Remove this permanently?")) return;
  await fetch(url, { method: "DELETE" });
  router.refresh();
}
