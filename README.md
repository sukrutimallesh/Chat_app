# Snappy — Real-Time Chat Application

> A full-stack real-time chat application powered by Supabase Realtime, featuring instant messaging, user authentication, and custom avatar selection.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-snappy--chat.vercel.app-blue?style=for-the-badge)](https://snappy-chat.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-sukrutimallesh%2FChat__app-black?style=for-the-badge&logo=github)](https://github.com/sukrutimallesh/Chat_app)

---

## Tech Stack

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-Realtime%20%2B%20Auth%20%2B%20PostgreSQL-3ECF8E?style=flat-square&logo=supabase)
![Styled Components](https://img.shields.io/badge/Styled--Components-6-DB7093?style=flat-square&logo=styled-components)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel)

---

## Features

- **Real-time messaging** — Messages appear instantly for both participants using Supabase Realtime (Postgres `LISTEN/NOTIFY` over WebSocket), replacing the original Socket.io server
- **User authentication** — Secure email/password sign-up and login via Supabase Auth with Row Level Security enforcing data access policies
- **Avatar selection** — Users pick a unique avatar from the [Multiavatar API](https://multiavatar.com/) after registering
- **Emoji support** — Full emoji picker inside the chat input
- **Persistent sessions** — Login state survives page refreshes via `localStorage`
- **Contact list** — Left panel shows all other registered users with their avatars

---

## Architecture

### Before (MongoDB + Socket.io + Express)
```
Browser <-> Express/Node server <-> MongoDB
Browser <-> Socket.io server (real-time)
```

### After (Supabase)
```
Browser <-> Supabase Auth      (authentication)
Browser <-> Supabase PostgreSQL (profiles + messages)
Browser <-> Supabase Realtime   (live message push via Postgres changes)
```

The entire backend (Express server, Socket.io, MongoDB) has been replaced by Supabase. The frontend is a pure Create React App deployed on Vercel with zero server-side code.

**Key architectural decisions:**
- Row Level Security (RLS) policies ensure users can only read messages they sent or received
- Supabase Realtime subscribes to `postgres_changes` on the `messages` table filtered by `receiver_id`, so only the intended recipient receives the push event
- Profiles are stored in a `public.profiles` table linked to `auth.users` via a foreign key, enabling username-based login (Supabase Auth only supports email login natively)

---

## Screenshots

| Login | Chat |
|-------|------|
| *(screenshot)* | *(screenshot)* |

---

## Local Setup

### Prerequisites
- Node.js 18+
- A free [Supabase](https://supabase.com) account

### 1. Clone the repository

```bash
git clone https://github.com/sukrutimallesh/Chat_app.git
cd Chat_app
```

### 2. Set up Supabase

Follow the **Supabase Setup** section below, then come back here.

### 3. Configure environment variables

```bash
cp public/.env.example public/.env
```

Edit `public/.env` and fill in your Supabase credentials:

```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
REACT_APP_LOCALHOST_KEY=chat-app-user
```

### 4. Install dependencies and start

```bash
cd public
npm install
npm start
```

The app runs at `http://localhost:3000`.

---

## Supabase Setup

### 1. Create a project

Go to [app.supabase.com](https://app.supabase.com) and create a new project.

### 2. Run the schema

In the Supabase dashboard, open **SQL Editor** and paste the contents of [`supabase/schema.sql`](supabase/schema.sql), then click **Run**.

This creates:
- `profiles` table (linked to `auth.users`)
- `messages` table with foreign keys to `profiles`
- Row Level Security policies
- Realtime publication for `messages`

### 3. Get your credentials

In your Supabase project, go to **Settings > API** and copy:
- **Project URL** → `REACT_APP_SUPABASE_URL`
- **anon public key** → `REACT_APP_SUPABASE_ANON_KEY`

### 4. (Optional) Disable email confirmation for development

In **Authentication > Settings**, turn off **Enable email confirmations** so users can log in immediately after registering without confirming their email.

---

## Deployment (Vercel + Supabase)

### Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel will auto-detect `vercel.json` and use the correct build settings
4. Add the following **Environment Variables** in Vercel:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
   - `REACT_APP_LOCALHOST_KEY` = `chat-app-user`
5. Click **Deploy**

No backend server is needed — Supabase handles everything.

---

## Project Structure

```
Chat_app/
├── public/                  # Create React App (frontend)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Chat.jsx         # Main chat screen
│   │   │   ├── Login.jsx        # Login page
│   │   │   └── Register.jsx     # Registration page
│   │   ├── components/
│   │   │   ├── ChatContainer.jsx # Real-time message thread
│   │   │   ├── ChatInput.jsx     # Message input with emoji picker
│   │   │   ├── Contacts.jsx      # Left sidebar contact list
│   │   │   ├── Logout.jsx        # Logout button
│   │   │   ├── SetAvatar.jsx     # Avatar selection screen
│   │   │   └── Welcome.jsx       # Empty-state welcome screen
│   │   └── utils/
│   │       ├── supabaseClient.js # Supabase client instance
│   │       └── APIRoutes.js      # (legacy stub)
│   └── .env.example
├── supabase/
│   └── schema.sql           # Database schema + RLS policies
├── vercel.json              # Vercel deployment config
└── README.md
```

---

## License

MIT
