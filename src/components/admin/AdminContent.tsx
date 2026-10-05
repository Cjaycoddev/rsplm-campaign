"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Camera, Newspaper, PenLine, BookOpen, Upload, Calendar } from "lucide-react";
import { GALLERY_CATS, MEDIA_CATS, publicObjectUrl, type GalleryRow, type MediaRow, type ManifestoRow } from "@/lib/cms";
import { PILLARS, type Pillar } from "@/lib/manifesto";
import { useAdminToast } from "@/components/admin/AdminToast";
import ComposerToggle, { SlideComposer } from "@/components/admin/ComposerToggle";

type Sub = "gallery" | "press" | "blog" | "manifesto";

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
            ["press", "Press", Newspaper],
            ["blog", "Blog", PenLine],
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
        {sub === "press" && <MediaAdmin items={media} kind="press" />}
        {sub === "blog" && <MediaAdmin items={media} kind="blog" />}
        {sub === "manifesto" && <ManifestoAdmin items={manifestos} />}
      </div>
    </section>
  );
}

function GalleryAdmin({ items }: { items: GalleryRow[] }) {
  const router = useRouter();
  const toast = useAdminToast();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/gallery", { method: "POST", body: new FormData(e.currentTarget) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      (e.target as HTMLFormElement).reset();
      toast("Photo uploaded.");
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setError(msg);
      toast(msg, "err");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-ink/60">
          Photos go into a masonry grid with the existing campaign shots. Pull down hides it from the public site.
        </p>
        <ComposerToggle open={showForm} onToggle={() => setShowForm((v) => !v)} showLabel="Show upload form" hideLabel="Hide upload form" />
      </div>
      <SlideComposer open={showForm}>
      <form onSubmit={submit} className="mb-2 grid gap-3 rounded-2xl border border-ink/10 bg-ivory/60 p-4 sm:grid-cols-2">
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
      </SlideComposer>
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
                onToggle={() =>
                  act(
                    `/api/admin/gallery/${item.id}`,
                    { published: !item.published },
                    router,
                    toast,
                    item.published ? "Photo pulled down." : "Photo is live again."
                  )
                }
                onDelete={() => remove(`/api/admin/gallery/${item.id}`, router, toast, "Photo deleted.")}
              />
            </div>
          </li>
        ))}
        {!items.length && <li className="text-sm text-ink/50">No uploads yet.</li>}
      </ul>
    </div>
  );
}

function MediaAdmin({ items, kind }: { items: MediaRow[]; kind: "press" | "blog" }) {
  const router = useRouter();
  const toast = useAdminToast();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);
  const isBlog = kind === "blog";
  const list = items.filter((item) => item.kind === kind);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/media", { method: "POST", body: new FormData(e.currentTarget) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      (e.target as HTMLFormElement).reset();
      toast(isBlog ? "Blog published." : "News post uploaded.");
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Save failed";
      setError(msg);
      toast(msg, "err");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-ink/60">
          {isBlog
            ? "Write a campaign blog. Pick a category so it appears under that filter on Press & Media."
            : "Add a press clipping. Pick a category so it appears under that filter on Press & Media."}
        </p>
        <ComposerToggle open={showForm} onToggle={() => setShowForm((v) => !v)} showLabel="Show editor" hideLabel="Hide editor" />
      </div>
      <SlideComposer open={showForm}>
      <form onSubmit={submit} className="mb-2 grid gap-3 rounded-2xl border border-ink/10 bg-ivory/60 p-4 sm:grid-cols-2">
        <input type="hidden" name="kind" value={kind} />
        <Field name="title" label="Headline" required className="sm:col-span-2" />
        {isBlog && (
          <label className="text-sm font-medium sm:col-span-2">
            Blog post
            <textarea name="body" required rows={8} placeholder="Write the full post…" className="mt-1 w-full rounded-xl border-2 border-ink/10 px-3 py-2 text-sm" />
          </label>
        )}
        <label className="text-sm font-medium sm:col-span-2">
          {isBlog ? "Short excerpt (optional — used on the card)" : "Excerpt"}
          <textarea name="excerpt" required={!isBlog} rows={3} className="mt-1 w-full rounded-xl border-2 border-ink/10 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm font-medium">
          Category
          <select name="category" className="mt-1 w-full rounded-xl border-2 border-ink/10 px-3 py-2 text-sm">
            {MEDIA_CATS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        {isBlog ? (
          <Field name="author" label="Author (optional)" placeholder="Hon. Nathaniel Garang Aduot" />
        ) : (
          <Field name="url" label="Article link (optional)" placeholder="https://" />
        )}
        <DatePickerField />
        <label className="text-sm font-medium">
          Cover image {isBlog ? "" : "(optional)"}
          <input name="file" type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="mt-1 block w-full text-sm" />
        </label>
        <div className="sm:col-span-2">
          {error && <p className="mb-2 text-sm text-campaignred">{error}</p>}
          <button type="submit" disabled={busy} className="btn-gold text-sm disabled:opacity-40">
            {busy ? "Saving..." : isBlog ? "Publish blog" : "Publish to press"}
          </button>
        </div>
      </form>
      </SlideComposer>
      <ul className="space-y-3">
        {list.map((item) => (
          <li key={item.id} className="rounded-2xl border border-ink/10 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex min-w-0 flex-1 gap-3">
                {item.cover_path && publicObjectUrl(item.cover_path) && (
                  <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-ink/5">
                    <Image src={publicObjectUrl(item.cover_path)!} alt="" fill className="object-contain" sizes="96px" />
                  </div>
                )}
                <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gold">
                  {item.category} {item.published ? "" : "· pulled down"}
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
            </div>
            <ToggleRow
              published={item.published}
              onToggle={() =>
                act(
                  `/api/admin/media/${item.id}`,
                  { published: !item.published },
                  router,
                  toast,
                  isBlog
                    ? item.published ? "Blog pulled down." : "Blog is live again."
                    : item.published ? "News post pulled down." : "News post is live again."
                )
              }
              onDelete={() =>
                remove(
                  `/api/admin/media/${item.id}`,
                  router,
                  toast,
                  isBlog ? "Blog deleted." : "News post deleted."
                )
              }
            />
          </li>
        ))}
        {!list.length && (
          <li className="text-sm text-ink/50">{isBlog ? "No blogs yet." : "No press posts yet."}</li>
        )}
      </ul>
    </div>
  );
}

function ManifestoAdmin({ items }: { items: ManifestoRow[] }) {
  const router = useRouter();
  const toast = useAdminToast();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);
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
      toast("Manifesto draft saved.");
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not save draft";
      setError(msg);
      toast(msg, "err");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-ink/60">
          Draft privately, then publish to replace the public Manifesto page. Pull down restores the original nine pillars.
        </p>
        <ComposerToggle open={showForm} onToggle={() => setShowForm((v) => !v)} showLabel="Show draft editor" hideLabel="Hide draft editor" />
      </div>
      <SlideComposer open={showForm}>
      <div className="space-y-4">
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
      </div>
      </SlideComposer>

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
                  onClick={() => act(`/api/admin/manifesto/${m.id}`, { action: "publish" }, router, toast, "Manifesto published.")}
                >
                  Publish to site
                </button>
              )}
              {m.status === "live" && (
                <button
                  type="button"
                  className="rounded-full border-2 border-campaignred/30 px-4 py-2 text-xs font-semibold text-campaignred"
                  onClick={() => act(`/api/admin/manifesto/${m.id}`, { action: "unpublish" }, router, toast, "Manifesto pulled down.")}
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

function DatePickerField() {
  const today = new Date();
  const value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return (
    <label className="relative z-10 block min-w-0 text-sm font-medium sm:col-span-2">
      Date
      <span className="relative mt-1 block">
        <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-deep" />
        <input
          type="date"
          name="date_label"
          defaultValue={value}
          className="block w-full min-h-[44px] min-w-0 rounded-xl border-2 border-ink/10 bg-white py-2 pl-10 pr-3 text-sm text-ink outline-none [color-scheme:light] focus:border-gold"
        />
      </span>
    </label>
  );
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

async function act(
  url: string,
  body: object,
  router: ReturnType<typeof useRouter>,
  toast: (msg: string, kind?: "ok" | "err") => void,
  okMsg: string
) {
  const res = await fetch(url, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) {
    toast("Could not complete that action.", "err");
    return;
  }
  toast(okMsg);
  router.refresh();
}

async function remove(
  url: string,
  router: ReturnType<typeof useRouter>,
  toast: (msg: string, kind?: "ok" | "err") => void,
  okMsg: string
) {
  if (!confirm("Remove this permanently?")) return;
  const res = await fetch(url, { method: "DELETE" });
  if (!res.ok) {
    toast("Could not delete.", "err");
    return;
  }
  toast(okMsg);
  router.refresh();
}
