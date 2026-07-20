# Tech Stack

## Framework & Language

- **Next.js 14** (App Router) — SSR, file-based routing, API routes
- **TypeScript** — strict type checking enabled
- **React 18** — server/client components

## Styling & Animation

- **Tailwind CSS** — utility-first styling
- **Framer Motion** — scroll reveals, hover interactions (GPU-accelerated only)
- **Custom design tokens** in `tailwind.config.ts`

## State & Data

- **Zustand** — cart state management (persistent localStorage)
- **Supabase** — PostgreSQL database + auth
- **Stripe** — payment processing

## Dependencies

Core: `@supabase/supabase-js`, `stripe`, `zustand`, `framer-motion`, `lucide-react`, `react-hot-toast`

## Common Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Build & Deploy
npm run build           # Production build
npm run start           # Run production build
npm run lint            # ESLint check

# Database
# Visit /api/seed       # Seed sample products
```

## Configuration Files

- `.env.local` — API keys (Supabase, Stripe)
- `lib/constants.ts` — Store config (name, phone, email, address)
- `lib/sample-data.ts` — Product catalog data
- `supabase/schema.sql` — Database schema
- `tailwind.config.ts` — Theme colors, fonts

## Project Conventions

- **Imports**: Use `@/` alias for root imports
- **Components**: Organized by domain (`components/shop/`, `components/ui/`)
- **Route groups**: `(shop)` for public, `admin` for protected
- **API routes**: `app/api/*/route.ts`
- **Client components**: Add `"use client"` only when needed (state, effects, events)
- **Types**: Centralized in `types/index.ts`

## Animation Rules

- GPU-only properties (transform, opacity)
- Respect `prefers-reduced-motion`
- Subtle, not distracting
- Exit animations for removed elements

## Database Access

- Client: `lib/supabase.ts` (anon key)
- Server: Create client per request with cookies
- RLS enabled: public read, authenticated write
