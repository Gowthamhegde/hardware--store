# ProductGenerator Module

## Overview

The `ProductGenerator` class creates complete `Product` objects from image inventory data. It handles:
- Unique ID and slug generation
- Brand-based pricing tiers
- Category-specific specifications
- Stock level management
- Product metadata generation

## Status: ✅ COMPLETE

All required functionality has been implemented and tested.

## Features

### 1. Unique Identifier Generation
- **Product IDs**: `prd-{brand-prefix}-{counter}` format with collision detection
- **Slugs**: URL-safe lowercase strings with automatic uniqueness validation
- **Registration**: Tracks existing products to prevent ID/slug conflicts

### 2. Brand Pricing Tiers
| Tier | Brands | Base Price |
|------|--------|------------|
| Premium | Schneider Electric, Legrand, Yale | $5.00 |
| Mid-Range | Panasonic, Havells, Crabtree, Norisys | $3.50 |
| Standard | Finolex, Anchor, Kolors, Luker | $2.50 |
| Budget | Hi-Fi | $1.50 |

### 3. Category Price Multipliers
| Category | Multiplier |
|----------|------------|
| Switches & Sockets | 1.0x |
| Cables & Wires | 1.5x |
| Smart Home | 2.0x |
| Home Theatre & Audio | 50.0x |
| MCB & DB | 1.2x |

### 4. Stock Level Ranges by Category
| Category | Min | Max |
|----------|-----|-----|
| Switches & Sockets | 50 | 250 |
| Cables & Wires | 30 | 150 |
| Smart Home | 20 | 100 |
| Home Theatre & Audio | 5 | 30 |
| MCB & DB | 40 | 180 |

### 5. Specification Generation

#### Switches & Sockets
- Rating: 6A, 10A, or 16A
- Type: Modular, Piano, or Bell Push

#### Cables & Wires
- Gauge: 1.0-6.0 sqmm
- Length: 90m
- Type: FR Wire (Flame Retardant)

#### Smart Home
- Type: Smart Lock, LED Light, Ceiling Fan, Controller
- Connectivity: WiFi, Bluetooth, or Zigbee

#### Home Theatre & Audio
- Type: Speaker, Amplifier, Receiver, Subwoofer

#### MCB & DB
- Rating: 16A, 20A, 32A, 40A, or 63A
- Poles: SP, DP, TP, or TPN

## API Reference

### Class: ProductGenerator

#### Constructor
```typescript
const generator = new ProductGenerator()
```

#### Methods

##### `generateProductId(brand: string, index: number): string`
Generates a unique product ID with brand prefix.

**Parameters:**
- `brand` - Brand name (e.g., "Schneider Electric")
- `index` - Product index for the brand

**Returns:** Unique product ID (e.g., "prd-schneider-2001")

##### `generateSlug(brand: string, category: string, index: number): string`
Generates a URL-safe slug.

**Parameters:**
- `brand` - Brand name
- `category` - Product category
- `index` - Product index

**Returns:** URL-safe slug (e.g., "schneider-electric-switch-0")

##### `getBrandBasePrice(brand: string): number`
Gets the base price for a brand based on its tier.

**Parameters:**
- `brand` - Brand name

**Returns:** Base price in dollars

##### `getCategoryPriceMultiplier(category: ProductCategory): number`
Gets the price multiplier for a category.

**Parameters:**
- `category` - Product category

**Returns:** Price multiplier

##### `generateStockLevel(category: ProductCategory, brand: string): number`
Generates a random stock level within category-specific range.

**Parameters:**
- `category` - Product category
- `brand` - Brand name

**Returns:** Stock level (integer)

##### `generateProduct(template: ProductTemplate, index?: number): Product`
Generates a complete Product object.

**Parameters:**
- `template` - Product template with brand, category, imageUrl, basePrice, stockRange
- `index` - Optional product index (default: 0)

**Returns:** Complete Product object

##### `generateProductName(brand: string, category: string, index: number): string`
Generates a product name based on brand and category.

**Parameters:**
- `brand` - Brand name
- `category` - Product category
- `index` - Product index

**Returns:** Product name (e.g., "Schneider Electric Modular Switch")

##### `generateSpecifications(brand: string, category: string): Record<string, string>`
Generates category-specific specifications.

**Parameters:**
- `brand` - Brand name
- `category` - Product category

**Returns:** Specifications object

##### `registerExistingProducts(products: Product[]): void`
Registers existing product IDs and slugs to prevent collisions.

**Parameters:**
- `products` - Array of existing products

## Usage Example

```typescript
import { ProductGenerator } from '@/lib/product-generator';
import type { ProductTemplate } from '@/lib/product-generator';

// Create generator instance
const generator = new ProductGenerator();

// Register existing products to avoid ID collisions
generator.registerExistingProducts(existingProducts);

// Generate a new product
const template: ProductTemplate = {
  brand: 'Schneider Electric',
  category: 'Switches & Sockets',
  imageUrl: '/images/schneider-switch-01.jpg',
  basePrice: 5.0,
  stockRange: [80, 150]
};

const product = generator.generateProduct(template, 0);

console.log(product);
// {
//   id: "prd-schneider-2000",
//   name: "Schneider Electric Modular Switch",
//   slug: "schneider-electric-switch-0",
//   price: 4.85,
//   category: "Switches & Sockets",
//   brand: "Schneider Electric",
//   image_url: "/images/schneider-switch-01.jpg",
//   stock: 127,
//   specifications: {
//     Brand: "Schneider Electric",
//     Category: "Switches & Sockets",
//     Rating: "16A",
//     Type: "Modular"
//   },
//   ...
// }
```

## Testing

Tests are available in `lib/product-generator.test.ts`:

```bash
npx tsx lib/product-generator.test.ts
```

**Test Coverage:**
- ✅ ID generation and uniqueness
- ✅ Slug generation and URL-safety
- ✅ Brand pricing tiers
- ✅ Category multipliers
- ✅ Stock level generation
- ✅ Complete product generation
- ✅ Product name generation
- ✅ Specification generation
- ✅ Existing products registration

## Implementation Details

### Design Philosophy (ponytail mode)
- **Simple counter-based IDs** - No UUID library needed
- **Pattern-based specifications** - No database lookups required
- **Inline pricing tiers** - No external configuration files
- **Random variance** - Adds price diversity without complexity

### Known Limitations (ceilings)
1. **ID Generation**: Counter-based, not distributed-system safe
   - Upgrade path: Use UUID library for distributed environments
2. **Specification Generation**: Pattern-based random selection
   - Upgrade path: Add image analysis for exact specifications
3. **Price Variance**: Simple ±20% to +30% random adjustment
   - Upgrade path: Market-based pricing with real-time data

## Dependencies

- `@/types` - Product interface definition
- `./category-mapper` - ProductCategory type

**No external npm packages required** - Uses only Node.js built-ins.

## Maintainability

### To Add New Brand Tier:
1. Add brand to `BRAND_TIERS` constant
2. Add price to `BASE_PRICES` constant

### To Modify Category Multiplier:
1. Update value in `CATEGORY_MULTIPLIERS` constant

### To Adjust Stock Ranges:
1. Modify ranges in `generateStockLevel()` method

### To Add New Specifications:
1. Add case in `generateSpecifications()` method switch statement

## Related Modules

- `lib/image-scanner.ts` - Scans image directory
- `lib/category-mapper.ts` - Maps brands to categories
- `lib/data-file-updater.ts` - Writes products to data files
- `lib/product-validator.ts` - Validates product objects

## Version History

- **v1.0** (2024) - Initial implementation with all core features
