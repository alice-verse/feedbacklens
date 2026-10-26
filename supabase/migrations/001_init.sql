-- FeedbackLens: per-user datasets with Row Level Security.
create table public.datasets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 200),
  row_count int not null default 0,
  created_at timestamptz not null default now()
);
create table public.feedback_items (
  id bigint generated always as identity primary key,
  dataset_id uuid not null references public.datasets(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  text text not null check (char_length(text) <= 5000),
  item_date date, source text, rating numeric,
  created_at timestamptz not null default now()
);
create index on public.feedback_items (dataset_id);
alter table public.datasets enable row level security;
alter table public.feedback_items enable row level security;
create policy "own datasets" on public.datasets for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own items" on public.feedback_items for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid() and exists (select 1 from public.datasets d where d.id = dataset_id and d.user_id = auth.uid()));
