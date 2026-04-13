-- =====================================================================
-- ACCENDO World — Supabase schema
-- Run this in the Supabase SQL Editor on a fresh project.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. profiles  —  role-based access (mirrors auth.users)
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text,
  role       text not null default 'editor' check (role in ('editor', 'admin')),
  created_at timestamptz not null default now()
);

-- Auto-create a profile row whenever a new auth user is created
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'editor');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------
-- 2. products  —  the catalogue
-- ---------------------------------------------------------------------
create table if not exists public.products (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  category        text not null,
  image_path      text not null,           -- path inside the "products" storage bucket
  display_order   integer not null default 0,
  is_visible      boolean not null default true,
  is_new_arrival  boolean not null default false,
  is_bestseller   boolean not null default false,
  bestseller_label text,                   -- optional override category shown on the bestseller card
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists products_display_order_idx on public.products (display_order);
create index if not exists products_category_idx      on public.products (category);
create index if not exists products_visible_idx       on public.products (is_visible);

-- Auto-update updated_at on any row change
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- 3. contact_info  —  flexible key/value store for editable text
-- ---------------------------------------------------------------------
create table if not exists public.contact_info (
  key        text primary key,
  value      text not null default '',
  updated_at timestamptz not null default now()
);

drop trigger if exists contact_info_set_updated_at on public.contact_info;
create trigger contact_info_set_updated_at
  before update on public.contact_info
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- 4. Row-level security
-- ---------------------------------------------------------------------
alter table public.profiles     enable row level security;
alter table public.products     enable row level security;
alter table public.contact_info enable row level security;

-- profiles: users can read their own profile
drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read"
  on public.profiles for select
  using (auth.uid() = id);

-- products: public read for visible rows; any signed-in user can write
drop policy if exists "products public read"      on public.products;
drop policy if exists "products authed insert"    on public.products;
drop policy if exists "products authed update"    on public.products;
drop policy if exists "products authed delete"    on public.products;

create policy "products public read"
  on public.products for select
  using (true);      -- editors need to see hidden products too; hiding happens at query layer

create policy "products authed insert"
  on public.products for insert to authenticated
  with check (true);

create policy "products authed update"
  on public.products for update to authenticated
  using (true) with check (true);

create policy "products authed delete"
  on public.products for delete to authenticated
  using (true);

-- contact_info: public read, signed-in write
drop policy if exists "contact_info public read"   on public.contact_info;
drop policy if exists "contact_info authed upsert" on public.contact_info;
drop policy if exists "contact_info authed update" on public.contact_info;

create policy "contact_info public read"
  on public.contact_info for select
  using (true);

create policy "contact_info authed upsert"
  on public.contact_info for insert to authenticated
  with check (true);

create policy "contact_info authed update"
  on public.contact_info for update to authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------
-- 5. Storage bucket for product images
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do update set public = true;

-- Storage policies: public read, authed write
drop policy if exists "product images public read"   on storage.objects;
drop policy if exists "product images authed insert" on storage.objects;
drop policy if exists "product images authed update" on storage.objects;
drop policy if exists "product images authed delete" on storage.objects;

create policy "product images public read"
  on storage.objects for select
  using (bucket_id = 'products');

create policy "product images authed insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'products');

create policy "product images authed update"
  on storage.objects for update to authenticated
  using (bucket_id = 'products') with check (bucket_id = 'products');

create policy "product images authed delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'products');
