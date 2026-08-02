-- Empathetic AI Academy — database schema
-- Run this in the Academy's own Supabase project (SQL editor or psql).
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE where possible.

-- ---------------------------------------------------------------------------
-- Roles (admin access control)
-- ---------------------------------------------------------------------------
do $$ begin
  create type app_role as enum ('admin');
exception when duplicate_object then null; end $$;

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null default 'admin',
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

-- SECURITY DEFINER so RLS policies can check roles without recursion.
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  );
$$;

-- ---------------------------------------------------------------------------
-- Courses & lessons (public catalog)
-- ---------------------------------------------------------------------------
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  tagline text,
  summary text,
  level text,
  price_cents integer not null default 0,
  duration_label text,
  lessons_label text,
  color text,
  published boolean not null default false,
  sort integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.courses enable row level security;

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  duration_label text,
  position integer not null default 0,
  content text,
  created_at timestamptz not null default now()
);
alter table public.lessons enable row level security;

-- Anyone can read published courses/lessons; only admins can modify.
drop policy if exists "courses public read" on public.courses;
create policy "courses public read" on public.courses
  for select using (published = true or public.has_role(auth.uid(), 'admin'));

drop policy if exists "courses admin write" on public.courses;
create policy "courses admin write" on public.courses
  for all using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop policy if exists "lessons public read" on public.lessons;
create policy "lessons public read" on public.lessons
  for select using (
    exists (select 1 from public.courses c
            where c.id = course_id
              and (c.published = true or public.has_role(auth.uid(), 'admin')))
  );

drop policy if exists "lessons admin write" on public.lessons;
create policy "lessons admin write" on public.lessons
  for all using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ---------------------------------------------------------------------------
-- Enrollments (free-course email capture + membership)
-- ---------------------------------------------------------------------------
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  first_name text,
  email text not null,
  course_slug text,
  source text,
  created_at timestamptz not null default now()
);
alter table public.enrollments enable row level security;

-- Anonymous visitors may sign up (insert only, with a basic sanity check).
drop policy if exists "enrollments anon insert" on public.enrollments;
create policy "enrollments anon insert" on public.enrollments
  for insert to anon, authenticated
  with check (char_length(email) between 3 and 255);

-- Only admins can read the enrollment list.
drop policy if exists "enrollments admin read" on public.enrollments;
create policy "enrollments admin read" on public.enrollments
  for select using (public.has_role(auth.uid(), 'admin'));

-- ---------------------------------------------------------------------------
-- Orders (Stripe purchases — populated in Phase 2)
-- ---------------------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text,
  course_slug text,
  kind text,                                 -- 'course' | 'bundle'
  seats integer not null default 1,
  amount_cents integer,
  currency text default 'aud',
  stripe_session_id text unique,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);
-- Backfill columns on existing installs.
alter table public.orders add column if not exists kind text;
alter table public.orders add column if not exists seats integer not null default 1;
alter table public.orders enable row level security;

-- Users can read their own orders; admins can read all. Writes happen
-- server-side with the service role (bypasses RLS).
drop policy if exists "orders own read" on public.orders;
create policy "orders own read" on public.orders
  for select using (
    auth.uid() = user_id or public.has_role(auth.uid(), 'admin')
  );

-- ---------------------------------------------------------------------------
-- Entitlements (who has access to which course). Written server-side by the
-- Stripe webhook (service role). A student sees their own once their login
-- email is linked to the row.
-- ---------------------------------------------------------------------------
create table if not exists public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  course_slug text not null,
  order_id uuid references public.orders(id) on delete set null,
  source text,
  created_at timestamptz not null default now(),
  unique (email, course_slug)
);
alter table public.entitlements enable row level security;

-- A logged-in student reads entitlements matching their own account (by linked
-- user_id or by their verified email); admins read all.
drop policy if exists "entitlements own read" on public.entitlements;
create policy "entitlements own read" on public.entitlements
  for select using (
    user_id = auth.uid()
    or lower(email) = lower(coalesce((auth.jwt() ->> 'email'), ''))
    or public.has_role(auth.uid(), 'admin')
  );

-- ---------------------------------------------------------------------------
-- Referral / affiliate program
-- AFA members (and other approved referrers) get a unique code. When someone
-- enrols in a paid course using that code, the referrer earns a commission.
-- Referrals are recorded server-side by the Stripe webhook (service role).
-- ---------------------------------------------------------------------------
create table if not exists public.referrers (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,               -- e.g. "ANGELA10"
  name text,
  email text,
  -- commission as a fraction of the sale (0.15 = 15%); or use flat_cents.
  commission_rate numeric not null default 0.15,
  flat_cents integer,                      -- optional fixed commission instead of %
  buyer_discount_rate numeric default 0,   -- optional discount for the referred buyer
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.referrers enable row level security;

create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid references public.referrers(id) on delete set null,
  code text,
  order_id uuid references public.orders(id) on delete set null,
  buyer_email text,
  course_slug text,
  sale_cents integer,
  commission_cents integer,
  status text not null default 'pending',  -- pending | approved | paid
  created_at timestamptz not null default now()
);
alter table public.referrals enable row level security;

-- Admin-only visibility by default. A referrer-facing view (their own
-- referrals + earnings) can be exposed later via a signed token / auth.
drop policy if exists "referrers admin read" on public.referrers;
create policy "referrers admin read" on public.referrers
  for select using (public.has_role(auth.uid(), 'admin'));

drop policy if exists "referrals admin read" on public.referrals;
create policy "referrals admin read" on public.referrals
  for select using (public.has_role(auth.uid(), 'admin'));

-- ---------------------------------------------------------------------------
-- Inquiries (main-site "Request a Demo" / contact form -> replaces HubSpot)
-- The empathetic-ai.com form posts here instead of HubSpot, so all leads live
-- in one database the client owns. Email alert fires server-side on insert.
-- ---------------------------------------------------------------------------
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  company text,
  phone text,
  message text,
  source text,                              -- e.g. 'main-site-demo'
  created_at timestamptz not null default now()
);
alter table public.inquiries enable row level security;

drop policy if exists "inquiries anon insert" on public.inquiries;
create policy "inquiries anon insert" on public.inquiries
  for insert to anon, authenticated
  with check (char_length(email) between 3 and 255);

drop policy if exists "inquiries admin read" on public.inquiries;
create policy "inquiries admin read" on public.inquiries
  for select using (public.has_role(auth.uid(), 'admin'));
