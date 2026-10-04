-- CMS tables for gallery, media, and manifesto drafts.
-- Run in Supabase SQL Editor after schema.sql.

insert into storage.buckets (id, name, public)
values ('campaign-public', 'campaign-public', true)
on conflict (id) do nothing;

create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  caption text not null default '',
  location text,
  category text not null default 'People',
  span text not null default 'normal' check (span in ('wide', 'tall', 'normal')),
  storage_path text not null,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists gallery_items_pub_idx on gallery_items (published, created_at desc);

create table if not exists media_posts (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'press' check (kind in ('press', 'blog')),
  title text not null,
  excerpt text not null default '',
  category text not null default 'Campaign',
  author text,
  url text,
  date_label text,
  cover_path text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists media_posts_pub_idx on media_posts (published, created_at desc);

create table if not exists manifesto_versions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  intro text not null default '',
  pledge text not null default '',
  pillars jsonb not null default '[]'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'live', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create unique index if not exists manifesto_one_live
  on manifesto_versions (status)
  where status = 'live';

alter table gallery_items enable row level security;
alter table media_posts enable row level security;
alter table manifesto_versions enable row level security;
