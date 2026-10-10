-- Run this in the Supabase SQL Editor before enabling the admin login.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists "Admins can read their own access" on public.admin_users;
create policy "Admins can read their own access"
  on public.admin_users
  for select
  to authenticated
  using (auth.uid() = user_id);

-- After creating the admin account in Authentication > Users, run this once
-- in SQL Editor with its email substituted:
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'YOUR_ADMIN_EMAIL'
-- on conflict (user_id) do nothing;
