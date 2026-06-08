create extension if not exists "pgcrypto";

create table if not exists public.books (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    author text not null,
    description text not null,
    genre text,
    publication_year integer,
    cover_url text,
    created_at timestamp with time zone default now()
);

alter table public.books enable row level security;

drop policy if exists "Public can read books" on public.books;
create policy "Public can read books"
on public.books
for select
using (true);

drop policy if exists "Public can add books" on public.books;
create policy "Public can add books"
on public.books
for insert
with check (true);
