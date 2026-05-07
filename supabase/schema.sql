-- profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  email text not null,
  avatar_image text default '',
  is_avatar_set boolean default false,
  created_at timestamptz default now()
);

-- messages table
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  receiver_id uuid references public.profiles(id) on delete cascade not null,
  message text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.messages enable row level security;

-- Policies
create policy "Profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can insert their own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id);

create policy "Messages visible to participants" on public.messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy "Authenticated users can send messages" on public.messages for insert with check (auth.uid() = sender_id);

-- Enable realtime
alter publication supabase_realtime add table public.messages;
