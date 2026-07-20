# ElectroPro Hardware - Distinctive E-Commerce Design

A modern, **technically-grounded** e-commerce website for a hardware and electrical supplies store — designed to NOT look like every other AI-generated site.

## 🎯 What Makes This Different

**Most AI sites look generic because they use the same patterns.** This site deliberately breaks those patterns by grounding every design decision in the electrical/hardware domain:

### Signature Elements
- **⚡ Power Switch Hero**: Interactive toggle that "boots up" the site (not generic hero with 2 buttons)
- **🔌 Circuit Board Aesthetic**: PCB traces and connector pads throughout (not blob gradients)
- **📊 Datasheet Product Cards**: Technical spec styling (not plain cards)
- **💡 LED Stock Indicators**: Animated status lights (not static badges)
- **🔧 Part Number System**: Real SKU codes (not decorative "01, 02, 03")

**Read [DESIGN_RATIONALE.md](./DESIGN_RATIONALE.md) for the full breakdown of design choices.**

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Set up environment
cp .env.local.example .env.local
# Add your Supabase + Stripe keys

# 3. Run development server
npm run dev

# 4. Seed sample data
# Visit: http://localhost:3000/api/seed

# 5. View the site
# Homepage: http://localhost:3000
# Admin: http://localhost:3000/admin
```

---

## ⚙️ Tech Stack

**Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
**Animation**: Framer Motion (scroll reveals, interactions)
**State**: Zustand (cart persistence)
**Database**: Supabase (PostgreSQL)
**Payments**: Stripe
**Fonts**: Space Grotesk (display) + Inter (body) + IBM Plex Mono (technical)
**Hosting**: Vercel + Supabase

---

## 🎨 Design System

### Color Palette (Technical/Industrial)
```css
--primary: #0B1F3A;      /* Deep navy - circuit board */
--accent: #C9A227;       /* Industrial gold - solder */
--background: #F7F5F0;   /* Warm off-white - technical paper */
--charcoal: #26282B;     /* Text - component black */
--steel: #2C4A6E;        /* Steel blue - conductive traces */
--success: #3E7C4A;      /* Stock green - LED indicator */
```

### Typography
- **Display**: Space Grotesk (technical, engineered)
- **Body**: Inter (precise, readable)
- **Mono**: IBM Plex Mono (specs, part numbers)

### Visual Language
- Circuit board traces (not blob gradients)
- Corner alignment markers (not soft rounded cards)
- LED indicators (not static badges)
- Part numbers (SKU-, CAT-) (not decorative numbers)
- Technical precision (not generic SaaS aesthetic)

**See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete documentation.**

---

## 📁 Project Structure

```
app/
├── (shop)/              # Public store
│   ├── page.tsx         # Homepage with power switch
│   ├── shop/            # Catalog with filters
│   ├── product/[slug]/  # Product detail
│   ├── cart/            # Shopping cart
│   ├── checkout/        # Checkout flow
│   ├── about/           # About page
│   └── contact/         # Contact form
├── admin/               # Admin dashboard
│   ├── page.tsx         # Dashboard with stats
│   ├── products/        # Product management
│   └── orders/          # Order management
└── api/                 # API routes
    ├── create-payment-intent/
    └── seed/            # Database seeding

components/
├── PowerSwitch.tsx               # ⚡ Hero signature element
├── CircuitCategoryGrid.tsx       # 🔌 PCB-style categories
├── TechnicalProductCard.tsx      # 📊 Datasheet cards
├── TechnicalFeaturedProducts.tsx
├── Navbar.tsx                    # Technical nav
├── TrustBanner.tsx              # Certification badges
└── ui/                          # Reusable components

lib/
├── constants.ts         # ⚠️ CUSTOMIZE: Store config
├── sample-data.ts       # 12 sample products
├── store.ts            # Cart state (Zustand)
├── supabase.ts         # Database client
├── stripe.ts           # Payment integration
└── utils.ts            # Helpers
```

---

## ✨ Key Features

### Design
- ✅ Power-on hero interaction (not generic hero)
- ✅ Circuit board patterns throughout
- ✅ Technical datasheet product cards
- ✅ LED stock indicators (animated)
- ✅ Part number labeling system
- ✅ Technical typography (mono codes)

### Functionality
- ✅ Full product catalog (12 samples)
- ✅ Category filtering
- ✅ Shopping cart (persistent)
- ✅ Stripe checkout integration
- ✅ Admin dashboard
- ✅ Responsive design
- ✅ Framer Motion animations
- ✅ Accessibility (WCAG AA)

---

## 🎯 Customization

### 1. Update Store Details
Edit `lib/constants.ts`:
```typescript
export const STORE_CONFIG = {
  name: "Your Store Name",
  phone: "+1 (555) 123-4567",
  email: "your-email@domain.com",
  // ... update all fields
};
```

### 2. Add Your Products
Edit `lib/sample-data.ts` or populate via admin dashboard

### 3. Customize Brand Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: { DEFAULT: "#YourColor" },
  accent: { DEFAULT: "#YourAccent" },
}
```

### 4. Replace Logo
Update `components/Navbar.tsx` with your logo image

**See [CUSTOMIZATION.md](./CUSTOMIZATION.md) for detailed guide.**

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| **DESIGN_RATIONALE.md** | Why this doesn't look generic |
| **DESIGN_SYSTEM.md** | Complete design tokens & patterns |
| **SETUP_GUIDE.md** | Step-by-step setup instructions |
| **CUSTOMIZATION.md** | How to customize everything |
| **FEATURES.md** | What's built & what's not |
| **PROJECT_SUMMARY.md** | Technical overview |
| **QUICK_START.txt** | 5-minute quick reference |

---

## 🚀 Deploy

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Add environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
   STRIPE_SECRET_KEY=...
   ```
4. Deploy

### Database
Supabase project auto-deployed. Run schema from `supabase/schema.sql` in SQL Editor.

---

## 🎓 Design Philosophy

**Ground every design choice in the domain** — this is a hardware store, not a generic SaaS product.

### Generic AI Pattern → Our Choice
- ❌ Blob gradients → ✅ Circuit traces
- ❌ Hero with 2 buttons → ✅ Power switch interaction
- ❌ Generic icon cards → ✅ PCB connector pads
- ❌ Decorative "01, 02" → ✅ Real part numbers (SKU-)
- ❌ Soft curves → ✅ Technical corner markers
- ❌ Generic sans font → ✅ Technical mono codes

**Every element references electrical/hardware concepts.**

---

## 🏆 What This Project Demonstrates

1. **Domain-grounded design** (not generic templates)
2. **Deliberate, opinionated choices** (not default answers)
3. **Functional aesthetics** (part numbers, specs, certifications)
4. **One signature moment** (power switch) vs scattered animation
5. **Technical typography** used correctly
6. **Accessible, performant** modern web app

This is how you avoid the "AI-generated look" — make every design decision specific to the domain.

---

## 📞 Support

Check documentation first:
- Setup issues → `SETUP_GUIDE.md`
- Customization → `CUSTOMIZATION.md`
- Features → `FEATURES.md`
- Design choices → `DESIGN_RATIONALE.md`

---

## License

Private - All rights reserved (update as needed)

---

**Built with precision. Designed to be distinctive.**

