# Spotify Stats

A personal Spotify dashboard that shows your last 50 recently played tracks and your top tracks/artists. Built with Next.js, Neon Postgres, Better Auth (Spotify OAuth), and Shadcn UI.

## Features

- **Dashboard** — Stats overview and recent tracks
- **Leaderboard** — Top tracks and artists (4 weeks, 6 months, all time)
- **Recent History** — Last 50 played tracks with search and CSV export
- **Settings** — Account info and sign out

## Tech Stack

- Next.js 15 (App Router)
- Better Auth (Spotify OAuth)
- Neon (serverless Postgres)
- Drizzle ORM
- Shadcn UI + Tailwind CSS
- Mintlify (user docs)

## Setup

### 1. Clone and install

```bash
cd spotify-dashboard
npm install
```

### 2. Create a Spotify app

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add redirect URI: `http://localhost:3000/api/auth/callback/spotify` (and your production URL when deploying)
4. Copy Client ID and Client Secret

### 3. Create a Neon database

1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project
3. Copy the connection string

### 4. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
BETTER_AUTH_SECRET=your-32-character-or-longer-secret
BETTER_AUTH_URL=http://localhost:3000
```

### 5. Run migrations

```bash
npm run db:migrate
```

Or with Drizzle Studio for development:

```bash
npx drizzle-kit push
```

### 6. Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in with Spotify.

## Documentation

User-facing docs are in the `docs/` folder (Mintlify format). To deploy them:

1. Go to [mintlify.com/start](https://mintlify.com/start)
2. Connect your repo and point to the `docs/` folder
3. Or run `mint dev` from the docs directory

## Deployment (Vercel)

1. Push to GitHub and import to Vercel
2. Add environment variables
3. Set redirect URI in Spotify Dashboard: `https://your-domain.com/api/auth/callback/spotify`
4. Run migrations against your Neon database (or use `drizzle-kit push`)
