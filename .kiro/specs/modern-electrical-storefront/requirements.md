
# Requirements Document

## Introduction

This specification defines the requirements for a modern e-commerce storefront targeting Gen Z and young millennial buyers purchasing electrical hardware, cables, and home theatre equipment. The design language is "circuit board chic" — dark enclosure backgrounds, copper/green accents, monospace typography for technical data — creating a consumer-tech polish that differentiates from traditional hardware store websites.

The build focuses on three key pages: Homepage (bento grid), Home Theatre & Audio category page, and Product Detail page. All components must be mobile-first, support keyboard navigation, and respect `prefers-reduced-motion`.

---

## Glossary

- **Enclosure**: The near-black matte background color (#0B0F0E), representing an electrical enclosure or device chassis
- **Cable White**: Warm off-white (#F2F0E9), representing the color of cable insulation
- **Copper Accent**: Brushed copper color (#C97A4A), representing bare copper wire — used for secondary accents
- **Circuit Green**: Muted green (#4C7A6E), representing circuit board traces — used for tertiary accents
- **Live Red**: Signal red (#E8483A), representing live wire — used sparingly for CTAs and alerts only
- **Aluminum Grey**: Brushed aluminum (#8C8A85), used for borders, dividers, and disabled states
- **Signal**: Cyan/blue accent color used for technical indicators and hover states
- **Connection Pulse**: The signature micro-interaction where hovering a product card animates a trace line from the spec strip to the Add to Cart button, visually "completing a circuit"
- **Spec Strip**: A monospace-formatted row at the bottom of product cards displaying key specifications (amperage, cable gauge, connector type, etc.)
- **String Tuned Animation**: Highly refined animations with proper easing curves, spring physics, stagger delays, and micro-interactions calibrated for snappy, responsive feel — not loose, floaty, or generic
- **Bento Grid**: A layout pattern of asymmetric tiles of varying sizes, like a bento box, used for the homepage category navigation
- **Kit Builder**: The "Build a Setup" feature that guides users through component selection (e.g., soundbar → matching cables → wall mount)

---

## Requirements

### Requirement 1: Homepage Bento Grid Layout

**User Story:** As a first-time visitor, I want to see a visual grid of category tiles, so that I can quickly understand what the store offers and navigate to my area of interest.

#### Acceptance Criteria

1. WHEN the homepage loads, THE System SHALL render a bento grid layout with 5 category tiles: Switches & Sockets, Cables & Wires, Home Theatre & Audio, Smart Home, and Deals
2. THE Home Theatre & Audio tile SHALL occupy the largest visual space (7 columns wide, 2 rows tall on desktop) with tile size and visual prominence linked automatically
3. THE Switches & Sockets and Cables & Wires tiles SHALL occupy secondary prominence (5 columns wide, 1 row tall each)
4. THE Smart Home and Deals tiles SHALL occupy equal tertiary prominence (6 columns wide each)
5. WHEN a tile receives keyboard focus, THE System SHALL display a visible focus ring using the copper accent color
6. WHILE the user scrolls, THE System SHALL animate tiles into view using staggered reveal with spring-based easing (stiffness: 400, damping: 30)
7. WHERE `prefers-reduced-motion` is enabled, THE System SHALL disable scroll-reveal animations and display all tiles immediately on page load
8. THE Home Theatre & Audio tile SHALL display a subcategory tag strip showing: "Spatial Audio", "Dolby Atmos", "Soundbars", "Projectors"

---

### Requirement 2: 3D Tilt Card Interaction

**User Story:** As a user browsing the homepage, I want category tiles to respond to my mouse movement with subtle 3D tilt, so that the interface feels premium and interactive.

#### Acceptance Criteria

1. WHEN a user moves their mouse over a bento tile, THE System SHALL apply a 3D rotation effect (rotateX and rotateY) with perspective of 1000px
2. THE rotation amount SHALL be proportional to mouse position relative to card center, clamped to ±5 degrees
3. WHEN the mouse leaves the tile, THE System SHALL smoothly reset rotation to 0° with spring physics (stiffness: 400, damping: 30)
4. WHILE the mouse hovers over the tile, THE System SHALL display an interactive glow effect following the cursor position using radial gradient
5. WHERE `prefers-reduced-motion` is enabled, THE System SHALL disable the 3D tilt effect while maintaining hover scale, glow effect, and icon translation
6. THE tile SHALL apply a subtle scale increase (1.02) on hover with spring transition
7. WHEN a user hovers on the tile, the tile's ArrowRight icon shall translateX by 4px

---

### Requirement 3: Product Card Technical Display

**User Story:** As a buyer comparing products, I want to see key specifications displayed in monospace typography directly on product cards, so that I can scan specs without opening each product page.

#### Acceptance Criteria

1. WHEN rendering a product card, THE System SHALL display a spec strip pinned to the bottom of the image area containing up to 3 key specifications
2. THE spec strip SHALL use monospace font (JetBrains Mono or IBM Plex Mono) at 9px size with uppercase tracking
3. THE spec strip SHALL display specifications as "KEY: VALUE" pairs with grey key labels and white values
4. WHEN a product has specifications defined, THE System SHALL extract and display the first 3 specification entries
5. WHEN a product has no specifications, THE System SHALL display the category name in a visible spec strip area
6. THE product card SHALL display a SKU identifier in the header area using monospace font at 9px with uppercase tracking

---

### Requirement 4: Connection Pulse Micro-Interaction

**User Story:** As a user browsing products, I want a memorable visual interaction when I hover over product cards, so that the site feels technically cohesive and distinctive.

#### Acceptance Criteria

1. WHEN a user hovers over a product card, THE System SHALL animate a thin horizontal line from the spec strip toward the Add to Cart button
2. THE line animation SHALL use a stroke-dashoffset transition from 200 to 0 over 600ms with easeInOut timing
3. THE line SHALL use the Signal color (cyan)
4. WHEN the hover ends, THE System SHALL reverse the animation over 300ms
5. THE line SHALL be positioned at 50% vertical height within the spec strip container
6. WHERE `prefers-reduced-motion` is enabled, THE System SHALL display the line at full opacity without animation
7. THE line shall animate only once per hover gesture, not continuously

---

### Requirement 5: Stock LED Indicator

**User Story:** As a buyer, I want to see real-time stock status at a glance on product cards, so that I know if a product is available before clicking.

#### Acceptance Criteria

1. WHEN displaying a product card, THE System SHALL show an LED-style indicator in the header with animated pulse
2. WHEN stock is 0, THE LED SHALL display as dim aluminum grey with label "OUT" and no pulse animation
3. WHEN stock is between 1-9 inclusive, THE LED SHALL display as live red with magenta shadow glow and label "LOW" with pulse animation
4. WHEN stock is 10 or higher, THE LED SHALL display as Signal color with Signal shadow glow and label "STOCKED" with pulse animation
5. THE pulse animation SHALL cycle opacity from 1 to 0.3 to 1 over 2 seconds infinitely
6. THE LED SHALL be 1.5px wide by 1.5px tall, circular

---

### Requirement 6: Home Theatre Category Page

**User Story:** As a buyer setting up a home theatre, I want a dedicated category page with cinematic styling, so that the shopping experience matches the premium nature of the products.

#### Acceptance Criteria

1. WHEN the Home Theatre category page loads, THE System SHALL display a cinematic hero section with dark gradient overlay
2. THE hero section SHALL include a centered headline with gradient text effect (live red to copper)
3. THE hero section SHALL display a speaker icon above the headline at 50% opacity
4. THE hero section SHALL include a "Return to Assembly" navigation link with arrow icon
5. WHEN the page loads, THE System SHALL render product cards in a 3-column responsive grid (1 column on mobile, 2 on tablet, 3 on desktop)
6. THE hero section height SHALL be 80vh on desktop
7. THE background SHALL include an ambient glow effect (live red at 20% opacity with 150px blur) centered behind the hero content

---

### Requirement 7: Product Detail Page

**User Story:** As a buyer evaluating a product, I want a detailed spec sheet with technical styling, so that I can verify compatibility and make informed purchase decisions.

#### Acceptance Criteria

1. WHEN the product page loads, THE System SHALL display the product image in a glass-card container with HUD-style corner brackets
2. THE page SHALL display the product name in display font (4xl-6xl responsive) with uppercase tracking
3. THE page SHALL display the brand as a monospace tag with Signal color background
4. THE page SHALL display the SKU as a monospace identifier in the header
5. WHEN the product has specifications, THE System SHALL display them in a tabbed interface with tabs: "SPECS", "CONTENTS", "COMPAT"
6. THE "SPECS" tab SHALL display specifications as a two-column table with key labels in aluminum grey and values in cable white
7. THE "CONTENTS" tab SHALL display "What's in the box" items as a list with Signal-colored bullet points
8. THE "COMPAT" tab SHALL display compatibility notes with copper-colored bullet points
9. THE page SHALL display a quantity selector with minus/plus buttons and a monospace quantity display
10. THE page SHALL display an "INITIALIZE_TRANSFER" (Add to Cart) button in copper color with magenta shadow on hover
11. WHEN stock is 0, THE button SHALL be disabled AND display "UNAVAILABLE" text together
12. THE page SHALL display a stock status badge overlay on the image with LED pulse animation

---

### Requirement 8: Horizontal Scroll Product Detail Experience

**User Story:** As a buyer on desktop, I want to horizontally scroll through product details and related products, so that the experience feels like panning through a datasheet.

#### Acceptance Criteria

1. WHEN viewing a product page on desktop (md breakpoint and above), THE System SHALL enable horizontal scroll layout
2. THE layout SHALL contain 3 chambers: Product Image (45vw), Product Details (45vw), Related Products (45vw)
3. WHEN the user scrolls vertically, THE System SHALL translate the horizontal content container
4. THE page SHALL display a fixed breadcrumb overlay in the top-left corner during scroll
5. WHEN viewing on mobile (below 768px), THE System SHALL stack chambers vertically using mobile-optimized widths (100vw)
6. THE total scroll height SHALL be 400vh to accommodate horizontal translation

---

### Requirement 9: Spec-Based Filtering

**User Story:** As a buyer narrowing down products, I want to filter by technical specifications (amperage, cable length, connector type), so that I can find products matching my exact requirements.

#### Acceptance Criteria

1. WHEN the user visits the shop page, THE System SHALL display a left-rail filter panel
2. THE filter panel SHALL include category filters for: Switches & Sockets, Cables & Wires, Home Theatre & Audio, Smart Home, Deals
3. THE filter panel SHALL include spec-based filters appropriate to each category:
   - Switches & Sockets: Amperage (6A, 10A, 16A), Socket type (2-pin, 3-pin), Finish (White, Steel)
   - Cables & Wires: Cable type (HDMI, Ethernet, Speaker, Power), Length ranges, Connector type
   - Home Theatre & Audio: Channel configuration (2.0, 2.1, 5.1, 7.2), Power range, Brand
   - Smart Home: Protocol (WiFi, Zigbee, Bluetooth), Device type
4. WHEN a filter is applied, THE System SHALL animate the product grid with staggered fade transitions
5. THE filter panel SHALL display a price range slider with min/max values
6. WHEN no products match the selected filters, THE System SHALL display "No products match your filters" message

---

### Requirement 10: String Tuned Animations

**User Story:** As a user interacting with the site, I want animations to feel snappy and precisely calibrated, so that the interface feels premium and responsive, not floaty or generic.

#### Acceptance Criteria

1. WHEN animating transforms (scale, rotate, translate), THE System SHALL use spring-based easing with defined stiffness and damping values
2. THE standard spring configuration SHALL use stiffness: 400, damping: 30 for hover interactions
3. THE fade-up animation SHALL use cubic-bezier easing [0.22, 1, 0.36, 1] over 500ms
4. WHEN animating lists (product grids, bento tiles), THE System SHALL apply stagger delays of 70ms between items
5. THE connection-pulse animation SHALL use easeInOut over 600ms for forward, 300ms for reverse
6. WHEN applying hover scale effects, THE scale value SHALL not exceed 1.05 to maintain layout stability
7. WHERE `prefers-reduced-motion` is enabled, THE System SHALL set all timing-related properties (durations, fade durations, stagger delays, cycle durations) to 0ms and display final states immediately with fallback rendering
8. THE Stock LED pulse SHALL use a 2-second cycle with opacity keyframes [1, 0.3, 1]

---

### Requirement 11: Typography System

**User Story:** As a technical buyer reading product specs, I want consistent typography that clearly separates technical data from marketing copy, so that I can quickly scan the information I need.

#### Acceptance Criteria

1. WHEN displaying body copy and UI elements, THE System SHALL use Space Grotesk or Inter font family
2. WHEN displaying technical specifications, SKUs, amperage, cable gauge, or connector types, THE System SHALL use JetBrains Mono or IBM Plex Mono
3. THE monospace font SHALL be reserved exclusively for technical data and prohibited for headings or marketing text in all cases
4. THE display font for headlines SHALL use Space Grotesk with font-weight 700-900
5. THE monospace font size SHALL be 9-11px for inline specs, 14-16px for primary spec tables
6. THE line height for monospace text SHALL be 1.4 to maintain readability
7. THE tracking (letter-spacing) for monospace text SHALL be 0.05em for improved legibility

---

### Requirement 12: Color Token System

**User Story:** As a developer implementing the design, I want clearly defined color tokens, so that the visual language remains consistent across all components.

#### Acceptance Criteria

1. THE System SHALL define the following color tokens in Tailwind configuration:
   - `enclosure`: #0B0F0E (primary background)
   - `cable-white`: #F2F0E9 (text on dark, light sections)
   - `copper`: #C97A4A (secondary accent)
   - `circuit-green`: #4C7A6E (tertiary accent)
   - `live-red`: #E8483A (CTAs and alerts only)
   - `aluminum`: #8C8A85 (borders, dividers, disabled states)
   - `signal`: defined for technical indicators (cyan/blue)
2. THE `live-red` color SHALL NOT be used for decorative elements, only for CTAs and alerts
3. THE `copper` accent SHALL be used for secondary interactions (hover states, brand badges)
4. THE `circuit-green` accent SHALL be used for tertiary elements (category tags, secondary buttons)
5. THE `aluminum` color SHALL be used for borders, dividers, and disabled/placeholder text

---

### Requirement 13: Mobile Responsive Design

**User Story:** As a mobile user, I want the interface to adapt to my screen size, so that I can browse and purchase products on my phone.

#### Acceptance Criteria

1. WHEN the viewport width is below 768px (mobile), THE System SHALL display the bento grid as a single-column stack
2. WHEN the viewport width is below 768px, THE product detail page SHALL use vertical stacking instead of horizontal scroll
3. THE font sizes SHALL scale down on mobile: 6xl headlines become 4xl, 4xl become 2xl
4. THE touch targets SHALL be minimum 44px × 44px for all interactive elements
5. THE horizontal padding SHALL be 16px on mobile (below 768px), 24px on tablet (768px and above), and container-based on desktop
6. THE hero section height SHALL be 60vh on mobile (reduced from 80vh on desktop)
7. WHEN the keyboard opens on mobile, THE System SHALL not hide focused input fields

---

### Requirement 14: Accessibility Requirements

**User Story:** As a user with disabilities, I want the site to be navigable with assistive technologies, so that I can complete my purchase independently.

#### Acceptance Criteria

1. WHEN an interactive element receives keyboard focus, THE System SHALL display a visible focus ring with minimum 2px outline offset
2. THE focus ring color SHALL be the copper accent (#C97A4A)
3. WHEN `prefers-reduced-motion` is enabled, THE System SHALL disable all animations and display static final states with fallback behavior when static states fail to render
4. THE product cards SHALL include descriptive alt text for all product images
5. THE filter checkboxes SHALL have associated labels that are visible and clickable
6. THE tab container on the product page SHALL use `tablist` role and individual panels SHALL use `tabpanel` role
7. THE breadcrumb navigation SHALL have `aria-label="Breadcrumb"`
8. THE Add to Cart button SHALL announce state changes ("Added to cart") to screen readers
9. THE stock LED indicator SHALL have accessible text alternative (not just color)

---

### Requirement 15: Kit Builder Feature

**User Story:** As a user setting up a home theatre, I want guided product selection that recommends compatible accessories, so that I can build a complete setup without missing components.

#### Acceptance Criteria

1. WHEN the user visits `/build-setup`, THE System SHALL display a step-by-step kit builder interface
2. THE first step SHALL prompt selection of a core component (AV receiver, soundbar, or projector)
3. WHEN a core component is selected, THE System SHALL recommend compatible cables, wall mounts, and accessories
4. THE recommendations SHALL be based on the selected product's specifications (HDMI ports, power requirements, mounting patterns), and for products with no connectivity options, THE System SHALL recommend power cables, cleaning supplies, or basic accessories
5. THE interface SHALL display a running total of the kit price
6. WHEN the user completes all steps, THE System SHALL provide an "Add Kit to Cart" action
7. THE kit builder SHALL be accessible via a "Build a Setup" CTA on the homepage bento grid

---

### Requirement 16: Performance Requirements

**User Story:** As a user on a slow connection, I want the page to load quickly, so that I don't abandon my purchase.

#### Acceptance Criteria

1. WHEN the page loads, THE System SHALL render the first meaningful paint within 1.5 seconds
2. THE animations SHALL use GPU-accelerated properties only (transform, opacity)
3. THE images SHALL use Next.js Image component with lazy loading for below-fold content and priority loading for above-fold hero images
4. THE JavaScript bundle size for the homepage SHALL not exceed 100KB gzipped
5. THE product images SHALL use responsive srcset with WebP format where supported
6. THE fonts SHALL use `font-display: swap` to prevent invisible text during load

---

### Requirement 17: Cart Integration

**User Story:** As a buyer, I want to add products to cart and see confirmation, so that I know my action succeeded.

#### Acceptance Criteria

1. WHEN the user clicks "Add to Cart", THE System SHALL add the product to the Zustand cart store
2. WHEN a product is added, THE System SHALL display a toast notification with the text "ADDED TO CART" (not "Success!")
3. THE cart state SHALL persist to localStorage for return visits
4. WHEN a product is out of stock, THE Add to Cart button SHALL be disabled and display "UNAVAILABLE"
5. THE product card SHALL include a Compare button (scale icon) that toggles product comparison state
6. WHEN a product is in comparison, THE Compare button SHALL display Signal accent styling
