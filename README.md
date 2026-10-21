# Sahoo Construction & Solar

A responsive React + TypeScript website with a full-bleed animated 3D solar-home hero background (Three.js), services, project gallery, and Supabase-powered quote request form. The visual direction is inspired by premium renewable-energy editorial websites; the layout and content here are original.

## Requirements

- Node.js 20 or newer
- A Supabase project (optional while previewing the design)

## 1. Install and run

Open this folder in VS Code. In Terminal:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## 2. Connect Supabase

1. Open https://supabase.com/dashboard and create/open your project.
2. Go to **SQL Editor → New query**.
3. Open `supabase-schema.sql`, copy all of it into the SQL editor, and click **Run**.
4. In Supabase, open **Project Settings → API** (or API Keys). Copy the Project URL and the publishable/anon public key.
5. In the project root, make a copy of `.env.example` named `.env`.
6. Fill in:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_PUBLISHABLE_OR_ANON_KEY
```

7. Stop and restart Vite (`Ctrl+C`, then `npm run dev`).

**Never put the Supabase `service_role` or secret key in a frontend `.env` file.** The browser must only use the public publishable/anon key. Row-level security is enabled; the public can insert quote requests but cannot list/read them.

## 3. Production build

```bash
npm run build
npm run preview
```

The production files are created in `dist/`.

## Customize

- `src/App.tsx` — homepage text, service cards, gallery, quote form.
- `src/styles.css` — colors, fonts, spacing, responsive layout.
- `src/App.tsx` — hero video source and homepage content.
- `src/lib/supabase.ts` — Supabase connection.
- `supabase-schema.sql` — quote-request database table and policies.

## Notes

- The homepage hero uses a full-bleed looping MP4 background video with a dark cinematic overlay. The video source is a Pexels-hosted clip; internet access is required. If that remote source changes or is blocked, download a licensed clip from Pexels and replace the MP4 URL in `src/App.tsx` with `/videos/solar-hero.mp4` after placing it in `public/videos/solar-hero.mp4`.
- Project photos use Unsplash image URLs and need an internet connection. Replace these with your own licensed project photos before launch.
- This is a production-oriented starter, not a complete deployment. Before launch, add spam/rate-limit protection for the public form, privacy/terms pages, real company contact details, and your final approved project photography.
