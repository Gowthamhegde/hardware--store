# ElectroPro Hardware - Quick Setup Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Configure Supabase

### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for database to initialize

### Run Database Schema
1. In Supabase dashboard, go to SQL Editor
2. Copy contents of `supabase/schema.sql`
3. Run the SQL script

### Get API Keys
1. Go to Project Settings > API
2. Copy `Project URL` and `anon public` key

## 3. Configure Stripe

1. Sign up at [stripe.com](https://stripe.com)
2. Go to Developers > API keys
3. Copy your test mode keys

## 4. Create Environment File

Create `.env.local` in root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 5. Seed Sample Data

Start the dev server:
```bash
npm run dev
```

Visit: http://localhost:3000/api/seed

You should see a success message.

## 6. Update Store Details

Edit `lib/constants.ts` and replace:
- Store name
- Contact info (phone, email, address)
- Business hours
- Social media links

## 7. Test the Site

- Homepage: http://localhost:3000
- Shop: http://localhost:3000/shop
- Admin: http://localhost:3000/admin
- Cart: http://localhost:3000/cart

## 8. Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables from `.env.local`
4. Deploy

## Customization Tips

### Change Colors
Edit `tailwind.config.ts`:
- `primary` - Main brand color (currently navy #0B1F3A)
- `accent` - Accent color (currently gold #C9A227)

### Add Your Logo
Replace the placeholder logo in `components/Navbar.tsx` with an actual image

### Product Images
Update image URLs in `lib/sample-data.ts` with your own product photos

### Categories
Modify categories in `lib/constants.ts`

## Need Help?

Common issues:

**Build errors**: Run `npm install` again
**Supabase connection failed**: Check your .env.local keys
**Products not showing**: Visit /api/seed to populate database

## Production Checklist

Before going live:
- [ ] Update all placeholder content in constants.ts
- [ ] Add real product images
- [ ] Configure production Stripe keys
- [ ] Set up Supabase production database
- [ ] Test checkout flow end-to-end
- [ ] Add actual logo and favicon
- [ ] Configure custom domain
- [ ] Set up email notifications (optional)
