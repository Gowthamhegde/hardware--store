import type { Product } from '@/types';
import type { ProductCategory } from './category-mapper';

/**
 * ProductGenerator - Creates Product objects from image inventory
 * ponytail: Simple ID generation, no UUID library needed
 */

export interface ProductTemplate {
  brand: string;
  category: ProductCategory;
  imageUrl: string;
  basePrice: number;
  stockRange: [number, number];
}

export interface ProductUpdate {
  productId: string | null; // null = create new
  action: 'create' | 'update';
  changes: Partial<Product>;
}

// Brand tier pricing
const BRAND_TIERS = {
  premium: ['Schneider Electric', 'Legrand', 'Yale'],
  midRange: ['Panasonic', 'Havells', 'Crabtree', 'Norisys'],
  standard: ['Finolex', 'Anchor', 'Kolors', 'Luker'],
  budget: ['Hi-Fi'],
};

const BASE_PRICES = {
  premium: 5.0,
  midRange: 3.5,
  standard: 2.5,
  budget: 1.5,
};

// Category price multipliers
const CATEGORY_MULTIPLIERS: Record<ProductCategory, number> = {
  'Switches & Sockets': 1.0,
  'Cables & Wires': 1.5,
  'Smart Home': 2.0,
  'Home Theatre & Audio': 50.0,
  'MCB & DB': 1.2,
};

export class ProductGenerator {
  private usedIds = new Set<string>();
  private usedSlugs = new Set<string>();
  private nextIdCounter = 2000; // Start after existing products

  /**
   * Generate a unique product ID
   * ponytail: Simple counter-based IDs, ceiling: not distributed-system safe
   */
  generateProductId(brand: string, index: number): string {
    const brandPrefix = brand.toLowerCase().replace(/\s+/g, '-').slice(0, 10);
    let id = `prd-${brandPrefix}-${this.nextIdCounter + index}`;
    
    // Ensure uniqueness
    while (this.usedIds.has(id)) {
      id = `prd-${brandPrefix}-${this.nextIdCounter + index}-${Math.random().toString(36).slice(2, 5)}`;
    }
    
    this.usedIds.add(id);
    return id;
  }

  /**
   * Generate URL-safe slug
   */
  generateSlug(brand: string, category: string, index: number): string {
    const brandSlug = brand.toLowerCase().replace(/\s+/g, '-');
    const categoryHint = this._getCategoryAbbreviation(category);
    let slug = `${brandSlug}-${categoryHint}-${index}`;
    
    // Remove non-alphanumeric except hyphens
    slug = slug.replace(/[^a-z0-9-]/g, '');
    
    // Ensure uniqueness
    while (this.usedSlugs.has(slug)) {
      slug = `${slug}-${Math.random().toString(36).slice(2, 5)}`;
    }
    
    this.usedSlugs.add(slug);
    return slug;
  }

  /**
   * Get brand base price by tier
   */
  getBrandBasePrice(brand: string): number {
    if (BRAND_TIERS.premium.includes(brand)) return BASE_PRICES.premium;
    if (BRAND_TIERS.midRange.includes(brand)) return BASE_PRICES.midRange;
    if (BRAND_TIERS.standard.includes(brand)) return BASE_PRICES.standard;
    if (BRAND_TIERS.budget.includes(brand)) return BASE_PRICES.budget;
    return BASE_PRICES.standard; // Default
  }

  /**
   * Get category price multiplier
   */
  getCategoryPriceMultiplier(category: ProductCategory): number {
    return CATEGORY_MULTIPLIERS[category] || 1.0;
  }

  /**
   * Generate stock level based on category
   */
  generateStockLevel(category: ProductCategory, brand: string): number {
    const ranges: Record<ProductCategory, [number, number]> = {
      'Switches & Sockets': [50, 250],
      'Cables & Wires': [30, 150],
      'Smart Home': [20, 100],
      'Home Theatre & Audio': [5, 30],
      'MCB & DB': [40, 180],
    };
    
    const [min, max] = ranges[category] || [50, 200];
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate complete Product object
   */
  generateProduct(template: ProductTemplate, index: number = 0): Product {
    const { brand, category, imageUrl, basePrice } = template;
    
    const id = this.generateProductId(brand, index);
    const slug = this.generateSlug(brand, category, index);
    
    // Calculate price with variance
    const categoryMultiplier = this.getCategoryPriceMultiplier(category);
    const variance = 1 + (Math.random() * 0.5 - 0.2); // ±20% to +30%
    const price = parseFloat((basePrice * categoryMultiplier * variance).toFixed(2));
    
    const stock = this.generateStockLevel(category, brand);
    
    const name = this.generateProductName(brand, category, index);
    const description = this.generateDescription(brand, category);
    const longDescription = this.generateLongDescription(brand, category);
    const specifications = this.generateSpecifications(brand, category);
    
    return {
      id,
      name,
      slug,
      description,
      long_description: longDescription,
      price,
      category,
      brand,
      image_url: imageUrl,
      stock,
      specifications,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  /**
   * Generate product name based on category
   */
  generateProductName(brand: string, category: string, index: number): string {
    const names: Record<string, string[]> = {
      'Switches & Sockets': [
        'Modular Switch',
        'Flat Switch',
        'Bell Push',
        '16A Socket',
        '6A Switch',
        'Dimmer Switch',
        'USB Socket',
      ],
      'Cables & Wires': [
        'FR Wire 1.5 sqmm',
        'FR Wire 2.5 sqmm',
        'FR Wire 4.0 sqmm',
        'HRFR Cable',
        'Flexible Wire',
        'Multicore Cable',
      ],
      'Smart Home': [
        'Smart Door Lock',
        'LED Panel Light',
        'Smart Ceiling Fan',
        'Smart LED Bulb',
        'Motion Sensor',
        'Smart Controller',
      ],
      'Home Theatre & Audio': [
        '5.1 Speaker System',
        'Soundbar',
        'AV Receiver',
        'Floorstanding Speaker',
        'Subwoofer',
        'In-Ceiling Speaker',
      ],
      'MCB & DB': [
        '16A MCB',
        '32A MCB',
        'Distribution Board',
        'RCCB',
        'Isolator',
      ],
    };
    
    const options = names[category] || ['Product'];
    const baseName = options[index % options.length];
    
    return `${brand} ${baseName}`;
  }

  /**
   * Generate short description
   */
  generateDescription(brand: string, category: string): string {
    const descriptions: Record<string, string> = {
      'Switches & Sockets': 'Premium modular switch for modern interiors',
      'Cables & Wires': 'Flame retardant electrical wire, ISI certified',
      'Smart Home': 'Smart home device with WiFi connectivity',
      'Home Theatre & Audio': 'High-fidelity audio equipment',
      'MCB & DB': 'Circuit protection device, ISI certified',
    };
    
    return descriptions[category] || `Quality ${category} product from ${brand}`;
  }

  /**
   * Generate long description
   */
  generateLongDescription(brand: string, category: string): string {
    return `Authentic ${brand} product. ${this.generateDescription(brand, category)}. Suitable for residential and commercial installations.`;
  }

  /**
   * Generate specifications based on category
   */
  generateSpecifications(brand: string, category: string): Record<string, string> {
    const specs: Record<string, string> = {
      Brand: brand,
      Category: category,
    };
    
    switch (category) {
      case 'Switches & Sockets':
        specs.Rating = this._pickRandom(['6A', '10A', '16A']);
        specs.Type = this._pickRandom(['Modular', 'Piano', 'Bell Push']);
        break;
      case 'Cables & Wires':
        specs.Gauge = this._pickRandom(['1.0 sqmm', '1.5 sqmm', '2.5 sqmm', '4.0 sqmm', '6.0 sqmm']);
        specs.Length = '90m';
        specs.Type = 'FR Wire';
        break;
      case 'Smart Home':
        specs.Type = this._pickRandom(['Smart Lock', 'LED Light', 'Ceiling Fan', 'Controller']);
        specs.Connectivity = this._pickRandom(['WiFi', 'Bluetooth', 'Zigbee']);
        break;
      case 'Home Theatre & Audio':
        specs.Type = this._pickRandom(['Speaker', 'Amplifier', 'Receiver', 'Subwoofer']);
        break;
      case 'MCB & DB':
        specs.Rating = this._pickRandom(['16A', '20A', '32A', '40A', '63A']);
        specs.Poles = this._pickRandom(['SP', 'DP', 'TP', 'TPN']);
        break;
    }
    
    return specs;
  }

  /**
   * Register existing IDs and slugs to avoid collisions
   */
  registerExistingProducts(products: Product[]): void {
    for (const product of products) {
      this.usedIds.add(product.id);
      this.usedSlugs.add(product.slug);
    }
  }

  /**
   * Get category abbreviation for slug
   */
  private _getCategoryAbbreviation(category: string): string {
    const abbrevs: Record<string, string> = {
      'Switches & Sockets': 'switch',
      'Cables & Wires': 'wire',
      'Smart Home': 'smart',
      'Home Theatre & Audio': 'audio',
      'MCB & DB': 'mcb',
    };
    return abbrevs[category] || 'product';
  }

  /**
   * Pick random item from array
   */
  private _pickRandom<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }
}
