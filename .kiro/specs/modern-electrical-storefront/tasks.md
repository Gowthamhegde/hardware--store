# Implementation Plan: Modern Electrical Storefront

## Overview

This implementation plan builds a Gen Z/millennial-focused e-commerce storefront for electrical hardware using Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. The implementation follows a "circuit board chic" design language with technical-themed components, GPU-accelerated animations, and accessibility-first patterns.

The approach prioritizes reusing existing project patterns (Next.js App Router, Zustand store structure, Supabase integration) while adding new technical aesthetic components (bento grid, connection-pulse animation, LED indicators, monospace spec typography).

## Tasks

- [~] 1. Set up design system foundation and color tokens
  - Add color tokens to `tailwind.config.ts`: `enclosure`, `cable-white`, `copper`, `circuit-green`, `live-red`, `aluminum`, `signal`
  - Configure monospace font family (JetBrains Mono or IBM Plex Mono) for technical data
  - Configure Space Grotesk or Inter for UI text
  - Add spring animation constants to `lib/utils.ts` (stiffness: 400, damping: 30)
  - Add cubic-bezier fade-up config [0.22, 1, 0.36, 1]
  - _Requirements: 10.2, 10.3, 11.1, 11.2, 12.1_

- [ ] 2. Implement TypeScript types and interfaces
  - [~] 2.1 Define core product and cart types in `types/index.ts`
    - Add `Product` interface with specifications field (Record<string, string>)
    - Add `CartItem`, `Order`, `OrderItem`, `Address` interfaces
    - Add `BentoTile` interface for homepage grid
    - _Requirements: 1.1, 3.1, 17.1_
  
  - [~] 2.2 Write unit tests for type validation
    - Test product type structure with required fields
    - Test specifications field accepts key-value pairs
    - _Requirements: 1.1, 3.1_

- [ ] 3. Build homepage bento grid layout
  - [~] 3.1 Create `BentoGrid.tsx` client component
    - Implement 5-tile responsive grid layout (uses existing Tailwind grid classes)
    - Map grid sizes: large (7 cols × 2 rows), medium (5 cols × 1 row), small (6 cols)
    - Add category data: Switches & Sockets, Cables & Wires, Home Theatre & Audio (large), Smart Home, Deals
    - Display subcategory tag strip for Home Theatre tile
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.8_
  
  - [~] 3.2 Add staggered scroll-reveal animation
    - Use Framer Motion `motion.div` with stagger children (70ms delay)
    - Apply fadeUp animation (y: 20 → 0, opacity: 0 → 1)
    - Detect `prefers-reduced-motion` and conditionally disable animations
    - _Requirements: 1.6, 1.7, 10.4_
  
  - [~] 3.3 Implement keyboard navigation and focus states
    - Add visible focus ring using copper accent color
    - Ensure all tiles are keyboard accessible with proper tab order
    - _Requirements: 1.5, 14.1, 14.2_

- [~] 4. Checkpoint - Verify bento grid renders and respects accessibility
  - Ensure bento grid displays correctly on desktop and mobile
  - Test keyboard navigation through all tiles
  - Verify `prefers-reduced-motion` disables animations
  - Ask the user if questions arise.

- [ ] 5. Implement 3D tilt card interaction
  - [~] 5.1 Add mouse tracking to bento tiles
    - Calculate mouse position relative to card center
    - Apply 3D rotation (rotateX, rotateY) with perspective: 1000px
    - Clamp rotation to ±5 degrees
    - _Requirements: 2.1, 2.2_
  
  - [~] 5.2 Add hover effects and reset behavior
    - Apply spring-based rotation reset on mouse leave (stiffness: 400, damping: 30)
    - Add scale transform (1.02) on hover
    - Add radial gradient glow following cursor position
    - Add ArrowRight icon translateX(4px) on hover
    - _Requirements: 2.3, 2.4, 2.6, 2.7_
  
  - [~] 5.3 Implement reduced motion fallback
    - Disable 3D tilt when `prefers-reduced-motion` is enabled
    - Maintain hover scale, glow, and icon translation
    - _Requirements: 2.5, 10.7_

- [ ] 6. Build technical product card component
  - [~] 6.1 Create `TechnicalProductCard.tsx` with spec strip
    - Display product image, name, price, SKU (monospace at 9px uppercase)
    - Add spec strip at bottom with up to 3 key specifications
    - Format specs as "KEY: VALUE" with monospace font (9px uppercase)
    - Show category name if no specifications exist
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_
  
  - [~] 6.2 Implement stock LED indicator
    - Add LED circle (1.5px diameter) with pulse animation
    - Stock 0: aluminum grey, "OUT" label, no pulse
    - Stock 1-9: live red with magenta shadow, "LOW" label, pulse
    - Stock 10+: signal color with glow, "STOCKED" label, pulse
    - Pulse cycle: opacity 1 → 0.3 → 1 over 2 seconds
    - Add accessible text alternative (not just color)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 14.9_
  
  - [~] 6.3 Write unit tests for stock LED logic
    - Test LED color and label for stock = 0, 5, 50
    - Test pulse animation presence/absence
    - Test accessible label generation
    - _Requirements: 5.2, 5.3, 5.4_

- [ ] 7. Implement connection-pulse micro-interaction
  - [~] 7.1 Add animated trace line on product card hover
    - Create SVG line from spec strip to Add to Cart button
    - Animate stroke-dashoffset from 200 to 0 over 600ms (easeInOut)
    - Use Signal color (cyan) for line stroke
    - Position at 50% vertical height within spec strip
    - _Requirements: 4.1, 4.2, 4.3, 4.5_
  
  - [~] 7.2 Add reverse animation and reduced motion support
    - Reverse animation to 200 over 300ms on hover end
    - Animate only once per hover gesture (not continuously)
    - Show line at full opacity without animation if `prefers-reduced-motion`
    - _Requirements: 4.4, 4.6, 4.7_

- [ ] 8. Build Home Theatre category page
  - [~] 8.1 Create `/app/(shop)/home-theatre/page.tsx` with cinematic hero
    - Add dark gradient overlay hero section (80vh on desktop)
    - Add centered headline with gradient text (live-red to copper)
    - Add speaker icon above headline at 50% opacity
    - Add ambient glow effect (live-red at 20% opacity, 150px blur)
    - Add "Return to Assembly" navigation link with arrow
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.6, 6.7_
  
  - [~] 8.2 Add responsive product grid layout
    - Render product cards in responsive grid (1 col mobile, 2 tablet, 3 desktop)
    - Reuse `TechnicalProductCard` component
    - _Requirements: 6.5_

- [~] 9. Checkpoint - Verify product cards and category page
  - Test connection-pulse animation triggers on hover
  - Verify stock LED displays correct colors and labels
  - Test Home Theatre page renders with hero and product grid
  - Ask the user if questions arise.

- [ ] 10. Implement product detail page with HUD styling
  - [~] 10.1 Create `/app/(shop)/product/[slug]/page.tsx` with glass-card layout
    - Display product image in glass-card container with HUD corner brackets
    - Show product name in display font (4xl-6xl responsive, uppercase tracking)
    - Show brand as monospace tag with Signal background
    - Show SKU as monospace identifier
    - Add stock status badge overlay on image with LED pulse
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.11_
  
  - [~] 10.2 Build tabbed specification interface
    - Create tab component with "SPECS", "CONTENTS", "COMPAT" tabs
    - Use `tablist` and `tabpanel` roles for accessibility
    - Display SPECS as two-column table (aluminum keys, cable-white values)
    - Display CONTENTS as list with Signal-colored bullets
    - Display COMPAT as list with copper-colored bullets
    - _Requirements: 7.5, 7.6, 7.7, 7.8, 14.6_
  
  - [~] 10.3 Add quantity selector and Add to Cart button
    - Create quantity selector with minus/plus buttons and monospace display
    - Minimum touch target 44px × 44px on mobile
    - Add "INITIALIZE_TRANSFER" button in copper with magenta shadow on hover
    - Disable button when stock is 0 and show "UNAVAILABLE"
    - Announce "Added to cart" to screen readers on success
    - _Requirements: 7.9, 7.10, 13.4, 14.8_
  
  - [~] 10.4 Write integration tests for product page data flow
    - Test product data fetching from Supabase
    - Test quantity updates and cart addition
    - Test button disabled state when stock is 0
    - _Requirements: 7.10, 17.1_

- [ ] 11. Implement horizontal scroll product detail (desktop)
  - [~] 11.1 Add horizontal scroll layout for desktop (≥768px)
    - Create 3-chamber layout: Product Image (45vw), Details (45vw), Related Products (45vw)
    - Map vertical scroll to horizontal translation
    - Total scroll height: 400vh
    - _Requirements: 8.1, 8.2, 8.3, 8.6_
  
  - [~] 11.2 Add fixed breadcrumb overlay and mobile stack layout
    - Display fixed breadcrumb in top-left with `aria-label="Breadcrumb"`
    - Stack chambers vertically on mobile (<768px) at 100vw width
    - _Requirements: 8.4, 8.5, 14.7_

- [ ] 12. Build shop page with spec-based filtering
  - [~] 12.1 Create `/app/(shop)/shop/page.tsx` with filter panel
    - Add left-rail filter panel with category checkboxes
    - Add spec-based filters for each category (amperage, socket type, cable type, etc.)
    - Add price range slider with min/max values
    - Ensure filter labels are visible and clickable
    - _Requirements: 9.1, 9.2, 9.3, 9.5, 14.5_
  
  - [~] 12.2 Implement filter logic and animations
    - Filter products based on selected categories and specs
    - Animate product grid with staggered fade (70ms delay) on filter change
    - Display "No products match your filters" when empty
    - _Requirements: 9.4, 9.6_
  
  - [~] 12.3 Write integration tests for filtering logic
    - Test category filter returns correct products
    - Test price range filter boundaries
    - Test multiple filters combined (AND logic)
    - _Requirements: 9.2, 9.3, 9.5_

- [ ] 13. Implement cart state management with Zustand
  - [~] 13.1 Update `lib/store.ts` with cart operations
    - Implement `addItem` with quantity increment for duplicates
    - Implement `removeItem`, `updateQuantity`, `clearCart`
    - Implement `getTotal`, `getItemCount` computed methods
    - Add `isCartOpen` state and `setCartOpen` action
    - Configure Zustand persist middleware to localStorage
    - _Requirements: 17.1, 17.3_
  
  - [~] 13.2 Write unit tests for cart store
    - Test adding new item to empty cart
    - Test incrementing quantity for existing item
    - Test removing item when quantity set to 0
    - Test total calculation with multiple items
    - Test localStorage persistence
    - _Requirements: 17.1, 17.3_

- [ ] 14. Build cart drawer component
  - [~] 14.1 Create `CartDrawer.tsx` with slide-in transition
    - Add slide-in animation from right using Framer Motion
    - Display cart items with product image, name, price, quantity
    - Show running total at bottom
    - Add "Checkout" button linking to checkout page
    - _Requirements: 17.1, 17.2_
  
  - [~] 14.2 Add toast notification on cart actions
    - Display "ADDED TO CART" toast (not "Success!") on add
    - Use technical styling: enclosure background, cable-white text, JetBrains Mono font
    - _Requirements: 17.2_

- [~] 15. Checkpoint - Verify cart functionality end-to-end
  - Test adding products to cart from product page
  - Test quantity updates and item removal
  - Test cart total calculation
  - Test cart persistence across page reloads
  - Ask the user if questions arise.

- [ ] 16. Implement product comparison feature
  - [~] 16.1 Create comparison Zustand store in `lib/store.ts`
    - Add `compareItems` array (max 3 products)
    - Implement `toggleCompare`, `removeCompare`, `clearCompare`
    - Add localStorage persistence
    - _Requirements: 17.5_
  
  - [~] 16.2 Add Compare button to product cards
    - Add scale icon button to product card
    - Toggle Signal accent styling when product is in comparison
    - Show toast error "Maximum 3 items can be compared" when limit reached
    - _Requirements: 17.5, 17.6_
  
  - [~] 16.3 Create `CompareDrawer.tsx` component
    - Display up to 3 products side-by-side
    - Show specifications in aligned columns for easy comparison
    - Add remove buttons for each product
    - _Requirements: 17.5_

- [ ] 17. Build Kit Builder feature
  - [~] 17.1 Create `/app/(shop)/build-setup/page.tsx` with step interface
    - Implement multi-step wizard UI
    - Step 1: Select core component (AV receiver, soundbar, projector)
    - Steps 2-N: Display recommended accessories based on selected product specs
    - Display running total of kit price
    - _Requirements: 15.1, 15.2, 15.5_
  
  - [~] 17.2 Implement recommendation logic
    - Match accessories based on product specifications (HDMI ports, power, mounting)
    - For products without connectivity, recommend power cables/cleaning supplies
    - Filter compatible products from database
    - _Requirements: 15.3, 15.4_
  
  - [~] 17.3 Add "Add Kit to Cart" action
    - Add all kit items to cart at once with single action
    - Display confirmation toast
    - Add "Build a Setup" CTA to homepage bento grid linking to this page
    - _Requirements: 15.6, 15.7_

- [ ] 18. Implement responsive design breakpoints
  - [~] 18.1 Add mobile layout adaptations (<768px)
    - Stack bento grid to single column on mobile
    - Stack product detail chambers vertically (no horizontal scroll)
    - Scale down font sizes: 6xl → 4xl, 4xl → 2xl
    - Set hero height to 60vh (reduced from 80vh)
    - Set horizontal padding to 16px on mobile, 24px on tablet
    - _Requirements: 13.1, 13.2, 13.3, 13.5, 13.6_
  
  - [~] 18.2 Verify touch targets and keyboard visibility
    - Ensure all touch targets are minimum 44px × 44px
    - Prevent keyboard from hiding focused input fields
    - _Requirements: 13.4, 13.7_
  
  - [~] 18.3 Write responsive layout snapshot tests
    - Capture snapshots at 375px, 768px, 1280px widths
    - Test bento grid, product cards, product detail page
    - _Requirements: 13.1, 13.2_

- [ ] 19. Implement accessibility features
  - [~] 19.1 Add focus indicators and ARIA labels
    - Add copper accent focus ring (2px offset) to all interactive elements
    - Add `aria-label` to navigation components
    - Add descriptive alt text to all product images
    - _Requirements: 14.1, 14.2, 14.4, 14.7_
  
  - [~] 19.2 Ensure reduced motion support across all animations
    - Detect `prefers-reduced-motion` at app level
    - Pass to all animated components as prop
    - Set all durations to 0ms and display final states when enabled
    - Test fallback rendering when static states fail
    - _Requirements: 14.3, 10.7_
  
  - [~] 19.3 Run accessibility audit with jest-axe
    - Test product cards for violations
    - Test navigation components for violations
    - Test form inputs for violations
    - Verify WCAG AA color contrast ratios
    - _Requirements: 14.1, 14.4, 14.5, 14.6_

- [ ] 20. Optimize performance and image loading
  - [~] 20.1 Configure Next.js Image optimization
    - Use `next/image` for all product images
    - Add priority loading for above-fold hero images
    - Add lazy loading for below-fold product grid images
    - Use responsive srcset with WebP format
    - Add blur placeholder for images
    - _Requirements: 16.3, 16.5_
  
  - [~] 20.2 Optimize fonts and bundle size
    - Add `font-display: swap` to font declarations
    - Verify homepage bundle size <100KB gzipped
    - Use GPU-accelerated properties only (transform, opacity)
    - _Requirements: 16.2, 16.4, 16.6_
  
  - [~] 20.3 Run Lighthouse performance audit
    - Verify First Contentful Paint <1.5s
    - Verify no layout shift during load
    - Verify Lighthouse score >90 on all categories
    - _Requirements: 16.1_

- [ ] 21. Integrate Stripe payment flow
  - [~] 21.1 Create `/app/api/create-payment-intent/route.ts`
    - Accept amount and customer_email in request body
    - Create Stripe PaymentIntent with USD currency
    - Return clientSecret and paymentIntentId
    - Handle errors with 500 response and error message
    - _Requirements: 17.1_
  
  - [~] 21.2 Build checkout page with Stripe Elements
    - Create `/app/(shop)/checkout/page.tsx` with form
    - Add form validation: name, email, phone, address (all required)
    - Use email and phone regex validation
    - Display errors with live-red color
    - Integrate Stripe Elements for card input
    - _Requirements: 17.1, 17.4_
  
  - [~] 21.3 Write API route tests with mocked Stripe
    - Test successful payment intent creation
    - Test error handling when amount missing (400 response)
    - Test error handling when Stripe API fails (500 response)
    - _Requirements: 17.1_

- [ ] 22. Build admin dashboard
  - [~] 22.1 Create admin product CRUD in `/app/admin/products/page.tsx`
    - Reuse existing `AdminProductForm.tsx` component
    - Add form validation: name, price, category, image_url required
    - Auto-generate slug from name (kebab-case)
    - Validate price is positive number
    - Validate stock is non-negative integer
    - _Requirements: 17.1_
  
  - [~] 22.2 Create admin orders page in `/app/admin/orders/page.tsx`
    - Fetch orders from Supabase
    - Display orders table with customer info, items, status
    - Add status filter: pending, processing, shipped, delivered, cancelled
    - _Requirements: 17.1_

- [~] 23. Checkpoint - Complete end-to-end testing
  - Test complete purchase flow: browse → add to cart → checkout → payment
  - Test admin dashboard: create product → verify on shop page
  - Test Kit Builder: select components → add to cart
  - Test filters: apply multiple filters → verify results
  - Ask the user if questions arise.

- [ ] 24. Create seed data and database initialization
  - [~] 24.1 Populate `lib/sample-data.ts` with product catalog
    - Add products for all 5 categories (Switches, Cables, Home Theatre, Smart Home, Deals)
    - Include specifications for each product (amperage, cable type, channels, etc.)
    - Include brand, stock levels, pricing
    - _Requirements: 1.1, 3.1, 9.2, 9.3_
  
  - [~] 24.2 Create `/app/api/seed/route.ts` endpoint
    - Read products from `sample-data.ts`
    - Batch insert into Supabase products table
    - Return count of products created
    - Handle duplicate slugs gracefully
    - _Requirements: 1.1_

- [ ] 25. Add error handling and loading states
  - [~] 25.1 Create global error boundary in `app/error.tsx`
    - Display technical-themed error message
    - Provide "Return to Homepage" action
    - Log errors to console
    - _Requirements: 17.1_
  
  - [~] 25.2 Create 404 page in `app/not-found.tsx`
    - Display 404 page with copper accent styling
    - Provide navigation back to shop
    - _Requirements: 17.1_
  
  - [~] 25.3 Add loading states to async operations
    - Add loading spinner to product grid during fetch
    - Add disabled state to buttons during submission
    - Show blur placeholder during image load
    - _Requirements: 16.3_

- [ ] 26. Final polish and deployment preparation
  - [~] 26.1 Create `.env.local.example` with required variables
    - Document NEXT_PUBLIC_SUPABASE_URL
    - Document NEXT_PUBLIC_SUPABASE_ANON_KEY
    - Document STRIPE_SECRET_KEY
    - Document NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    - _Requirements: 17.1_
  
  - [~] 26.2 Update `lib/constants.ts` with store configuration
    - Set store name, phone, email, address
    - Configure shipping rates
    - Set trust banner badges
    - _Requirements: 17.1_
  
  - [~] 26.3 Run final verification checklist
    - Run `npm run lint` and fix all errors
    - Run `npm run build` and verify no build errors
    - Test on Chrome, Firefox, Safari
    - Test on mobile devices (iOS, Android)
    - Verify all images have alt text
    - Verify all interactive elements have focus indicators
    - _Requirements: 14.1, 14.4, 16.1_

- [~] 27. Final checkpoint - Production readiness
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional test-related sub-tasks and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The implementation reuses existing project patterns (Zustand store structure, Supabase client, Next.js App Router conventions)
- All animations use GPU-accelerated properties only (transform, opacity) for performance
- Accessibility is built-in from the start, not retrofitted
- The design system (color tokens, fonts, animation constants) is established first to ensure consistency
- Testing focuses on example-based unit tests and integration tests since no universal correctness properties exist for UI rendering

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1", "2.1"] },
    { "id": 1, "tasks": ["2.2", "3.1", "13.1"] },
    { "id": 2, "tasks": ["3.2", "3.3", "13.2"] },
    { "id": 3, "tasks": ["5.1", "5.2", "5.3", "6.1"] },
    { "id": 4, "tasks": ["6.2", "6.3", "7.1"] },
    { "id": 5, "tasks": ["7.2", "8.1", "16.1"] },
    { "id": 6, "tasks": ["8.2", "10.1", "16.2", "16.3"] },
    { "id": 7, "tasks": ["10.2", "10.3", "10.4", "12.1"] },
    { "id": 8, "tasks": ["11.1", "11.2", "12.2", "12.3", "14.1"] },
    { "id": 9, "tasks": ["14.2", "17.1", "18.1"] },
    { "id": 10, "tasks": ["17.2", "17.3", "18.2", "18.3", "19.1"] },
    { "id": 11, "tasks": ["19.2", "19.3", "20.1"] },
    { "id": 12, "tasks": ["20.2", "20.3", "21.1", "24.1"] },
    { "id": 13, "tasks": ["21.2", "21.3", "22.1", "24.2"] },
    { "id": 14, "tasks": ["22.2", "25.1", "25.2", "25.3"] },
    { "id": 15, "tasks": ["26.1", "26.2"] },
    { "id": 16, "tasks": ["26.3"] }
  ]
}
```
