# Project Structure

## Directory Layout

```
app/
├── (shop)/              # Public storefront (route group, no URL prefix)
│   ├── page.tsx         # Homepage with power switch hero
│   ├── layout.tsx       # Shop layout with navbar + footer
│   ├── shop/            # Product catalog with filters
│   ├── product/[slug]/  # Dynamic product detail pages
│   ├── cart/            # Shopping cart page
│   ├── checkout/        # Checkout flow
│   ├── about/           # About page
│   └── contact/         # Contact form
├── admin/               # Admin dashboard (protected route group)
│   ├── page.tsx         # Dashboard overview with stats
│   ├── layout.tsx       # Admin layout
│   ├── products/        # Product CRUD
│   └── orders/          # Order management
├── api/                 # API routes
│   ├── create-payment-intent/route.ts
│   └── seed/route.ts    # Database seeding endpoint
├── layout.tsx           # Root layout (fonts, metadata)
└── globals.css          # Global styles + Tailwind directives

components/
├── ui/                  # Reusable primitives
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Input.tsx
├── shop/                # Shop-specific components
│   ├── ProductCard.tsx
│   ├── CategoryGrid.tsx
│   └── FeaturedProducts.tsx
├── PowerSwitch.tsx      # Signature hero interaction
├── CircuitCategoryGrid.tsx
├── TechnicalProductCard.tsx
├── TechnicalNav.tsx
├── Navbar.tsx
├── Footer.tsx
└── TrustBanner.tsx

lib/
├── constants.ts         # Store config (⚠️ customize before launch)
├── sample-data.ts       # Product catalog seed data
├── store.ts             # Zustand cart state
├── supabase.ts          # Supabase client
├── stripe.ts            # Stripe client
└── utils.ts             # Helper functions (cn, formatPrice)

types/
└── index.ts             # TypeScript definitions (Product, Order, CartItem)

supabase/
└── schema.sql           # Database schema (products, orders, categories)
```

## Routing Conventions

- **Route groups** `(shop)` — grouping without URL segment
- **Dynamic routes** `[slug]` — product detail pages
- **API routes** — `route.ts` files in `app/api/`
- **Layouts** — shared UI wrapping child routes

## Component Organization

- **Domain separation**: `shop/` vs `ui/` vs root
- **Colocation**: Related components together
- **Naming**: PascalCase, descriptive (`TechnicalProductCard`, not `Card2`)

## Data Flow

1. **Database** (Supabase) → products, orders, categories
2. **State** (Zustand) → cart (persists to localStorage)
3. **Props** → server components fetch, pass to client components
4. **API routes** → payments, seeding

## File Naming

- Components: `PascalCase.tsx`
- Utilities: `lowercase.ts`
- Route pages: `page.tsx`
- Layouts: `layout.tsx`
- API routes: `route.ts`

## Import Patterns

```typescript
// External deps first
import { motion } from 'framer-motion';

// Internal with @ alias
import { Button } from '@/components/ui/Button';
import { Product } from '@/types';
import { supabase } from '@/lib/supabase';
```

## Key Files to Know

- `lib/constants.ts` — Store details, categories, trust badges
- `lib/sample-data.ts` — Product catalog
- `lib/store.ts` — Cart logic (add, remove, clear, persist)
- `types/index.ts` — All TypeScript interfaces
- `tailwind.config.ts` — Theme tokens
