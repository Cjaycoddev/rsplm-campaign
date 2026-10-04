-- R-SPLM campaign schema. Run in Supabase SQL Editor.
-- Then run supabase/cms.sql for gallery, media, and manifesto publishing.
-- All public writes go through the Next.js API (service role). RLS stays locked.

create extension if not exists pgcrypto;

do $$ begin
  create type phone_country as enum ('KE', 'SS');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type supporter_role as enum ('SUPPORTER', 'VOLUNTEER', 'CAMPAIGN_AGENT', 'DONOR');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type donation_method as enum ('MPESA', 'KCB', 'COOP', 'BANK', 'PAYPAL');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type donation_status as enum ('pending', 'stk_sent', 'paid', 'failed', 'needs_review', 'rejected');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type pledge_frequency as enum ('ONCE', 'MONTHLY');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type donation_cause as enum (
    'CAMPAIGN_OPS',
    'COMMUNITY_OUTREACH',
    'VOTER_EDUCATION',
    'YOUTH_EMPOWERMENT',
    'GENERAL_SUPPORT'
  );
exception when duplicate_object then null;
end $$;

create table if not exists supporters (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  phone_e164 text not null unique,
  phone_country phone_country not null,
  email text,
  email_opt_in boolean not null default false,
  state text not null,
  county text not null,
  role supporter_role not null,
  created_at timestamptz not null default now()
);

create unique index if not exists supporters_email_unique
  on supporters (lower(email))
  where email is not null and email <> '';

create table if not exists donations (
  id uuid primary key default gen_random_uuid(),
  supporter_id uuid references supporters(id),
  display_name text not null,
  phone_e164 text,
  email text,
  amount numeric(12,2) not null,
  currency text not null check (currency in ('KES', 'USD')),
  frequency pledge_frequency not null default 'ONCE',
  cause donation_cause not null,
  method donation_method not null,
  status donation_status not null default 'pending',
  reference text not null unique,
  till_number text,
  checkout_request_id text,
  merchant_request_id text,
  mpesa_receipt text,
  mpesa_result_code text,
  mpesa_payload jsonb,
  review_notes text,
  reviewed_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists donations_status_idx on donations (status);
create index if not exists donations_created_idx on donations (created_at desc);

create table if not exists payment_proofs (
  id uuid primary key default gen_random_uuid(),
  donation_id uuid not null references donations(id) on delete cascade,
  storage_path text not null,
  file_name text not null,
  mime_type text not null,
  size_bytes integer not null,
  created_at timestamptz not null default now()
);

create table if not exists message_sends (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  body text not null,
  audience text not null,
  recipient_count integer not null default 0,
  created_at timestamptz not null default now()
);

insert into storage.buckets (id, name, public)
values ('payment-proofs', 'payment-proofs', false)
on conflict (id) do nothing;

alter table supporters enable row level security;
alter table donations enable row level security;
alter table payment_proofs enable row level security;
alter table message_sends enable row level security;
