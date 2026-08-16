import type { Product } from '@/types';
import { SAMPLE_PRODUCTS } from './sample-data';

// Create a global mutable array for mock data so it persists across API requests
let globalMockProducts: Product[] | null = null;

export function getMockProducts(): Product[] {
  // Always return fresh data in development to pick up sample-data updates
  return [...SAMPLE_PRODUCTS];
}

export function addMockProduct(product: Product) {
  const products = getMockProducts();
  products.push(product);
}

export function updateMockProduct(slug: string, updates: Partial<Product>): Product | null {
  const products = getMockProducts();
  const index = products.findIndex(p => p.slug === slug);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates, updated_at: new Date().toISOString() };
    return products[index];
  }
  return null;
}

export function deleteMockProduct(slug: string): boolean {
  const products = getMockProducts();
  const initialLength = products.length;
  globalMockProducts = products.filter(p => p.slug !== slug);
  return globalMockProducts.length < initialLength;
}
