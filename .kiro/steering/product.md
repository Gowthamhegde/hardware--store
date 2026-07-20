# Product Overview

ElectroPro Hardware (Circuit Supply) — a modern e-commerce site for electrical and hardware supplies.

## Core Differentiator

**Domain-grounded design**: Every visual element references electrical/hardware concepts (circuit boards, PCB traces, technical datasheets, LED indicators, part numbers) to avoid generic AI-template aesthetics.

## Key Features

- Full product catalog with 6 categories (switches, cables, home theatre, smart home, MCBs, tools)
- Shopping cart with Zustand persistence
- Stripe checkout integration
- Admin dashboard for inventory management
- Technical aesthetic: circuit board patterns, LED stock indicators, datasheet-style cards
- Signature power switch hero interaction

## Business Model

B2C e-commerce for electrical supplies, targeting contractors, makers, and DIY enthusiasts.

## Target Audience

- Professional electricians and contractors
- DIY home improvement enthusiasts
- Hardware makers and engineers
- Small business buyers

## Target Audience

**Gen Z and young millennials** — first apartment, DIY wiring, home studio, gaming rig. Online-native, expect consumer-tech polish, want to find the spec fast and buy.

## Brand Identity

- **Visual**: Circuit board chic — dark enclosure background, copper/green accents. NOT cream-and-terracotta. NOT near-black + neon green.
- **Palette**: `#0B0F0E` enclosure, `#F2F0E9` cable-white, `#C97A4A` copper, `#4C7A6E` circuit-green, `#E8483A` live-red (CTAs only), `#8C8A85` aluminum
- **Typography**: Space Grotesk / Inter for UI, **JetBrains Mono for ALL technical data** — specs, SKUs, amperage, cable gauge. This is the signature move.
- **Voice**: Plain, confident, specific. "3-pin switch, rated 16A" — not "Premium quality switch!!" Buttons say exactly what happens: "Add to cart", "Build my setup".
- **Signature interaction**: Connection-pulse — on product card hover, a thin animated trace line runs from spec strip to Add to Cart button (completing a circuit). Used once per card, deliberately.

## Pages Built

- `/` — bento grid homepage with 5 category tiles
- `/shop` — catalog with spec-based filters (amperage, price, brand, stock)
- `/product/[slug]` — mono-type spec sheet, what's in the box, compatibility tabs
- `/build-setup` — kit builder (anchor → cables → smart control)
- `/shop?category=home-theatre-audio` — via shop filter
