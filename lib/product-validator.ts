import type { Product } from '@/types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

const VALID_CATEGORIES = [
  'Switches & Sockets',
  'Cables & Wires',
  'Smart Home',
  'Home Theatre & Audio',
  'MCB & DB',
];

/**
 * Product validator - ensures data integrity
 * ponytail: Simple validation, no complex schema libraries
 */
export class ProductValidator {
  /**
   * Validate single product
   */
  validateProduct(product: Product): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields
    if (!product.id) errors.push('Product ID is required');
    if (!product.name) errors.push('Product name is required');
    if (!product.slug) errors.push('Product slug is required');
    if (!product.image_url) errors.push('Product image_url is required');

    // Slug format
    if (product.slug && !/^[a-z0-9-]+$/.test(product.slug)) {
      errors.push(`Slug must be lowercase alphanumeric with hyphens only: ${product.slug}`);
    }

    // Price validation
    if (product.price <= 0) {
      errors.push(`Price must be positive: ${product.price}`);
    }

    // Stock validation
    if (product.stock < 0) {
      errors.push(`Stock cannot be negative: ${product.stock}`);
    }

    // Category validation
    if (!VALID_CATEGORIES.includes(product.category)) {
      errors.push(`Invalid category: ${product.category}`);
    }

    // Image URL format
    if (product.image_url && !product.image_url.startsWith('/images/') && !product.image_url.startsWith('https://')) {
      warnings.push(`Image URL should start with /images/ or https://: ${product.image_url}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate product array for uniqueness
   */
  validateProductArray(products: Product[]): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    const ids = new Set<string>();
    const slugs = new Set<string>();

    for (const product of products) {
      // Check individual product
      const result = this.validateProduct(product);
      errors.push(...result.errors);
      warnings.push(...result.warnings);

      // Check uniqueness
      if (ids.has(product.id)) {
        errors.push(`Duplicate product ID: ${product.id}`);
      }
      ids.add(product.id);

      if (slugs.has(product.slug)) {
        errors.push(`Duplicate product slug: ${product.slug}`);
      }
      slugs.add(product.slug);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }
}
