-- Run this entire file in Supabase Dashboard → SQL Editor → New query.
create extension if not exists pgcrypto;

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text not null default 'Residential solar',
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'in_progress', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.quote_requests enable row level security;

-- Public visitors may submit a quote request, but cannot read customer requests.
drop policy if exists "Anyone can submit quote requests" on public.quote_requests;
create policy "Anyone can submit quote requests"
on public.quote_requests for insert
to anon, authenticated
with check (
  length(trim(name)) > 0
  and length(trim(email)) > 3
  and length(trim(service)) > 0
);

-- Authenticated users can read/update requests only when their JWT app_metadata role is admin.
drop policy if exists "Admins can read quote requests" on public.quote_requests;
create policy "Admins can read quote requests"
on public.quote_requests for select
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can update quote requests" on public.quote_requests;
create policy "Admins can update quote requests"
on public.quote_requests for update
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

grant insert on public.quote_requests to anon, authenticated;
grant select, update on public.quote_requests to authenticated;
