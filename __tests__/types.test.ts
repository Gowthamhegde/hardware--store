/**
 * Unit tests for core TypeScript type shapes.
 * These are example-based checks that validate:
 *   - Product has all required fields (Req 1.1, 3.1)
 *   - specifications accepts Record<string, string> key-value pairs (Req 3.1)
 */

import type { Product, CartItem } from '@/types';

// ponytail: compile-time type assignment is the real check;
//           runtime assertions confirm the shape is usable at runtime too.

describe('Product type structure', () => {
  const minimalProduct: Product = {
    id: 'abc-123',
    name: '16A 3-Pin Socket',
    slug: '16a-3pin-socket',
    description: 'Heavy-duty 3-pin socket rated 16A.',
    price: 12.99,
    category: 'switches-sockets',
    image_url: '/images/socket.jpg',
    stock: 42,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  };

  it('has required string fields', () => {
    expect(typeof minimalProduct.id).toBe('string');
    expect(typeof minimalProduct.name).toBe('string');
    expect(typeof minimalProduct.slug).toBe('string');
    expect(typeof minimalProduct.description).toBe('string');
    expect(typeof minimalProduct.category).toBe('string');
    expect(typeof minimalProduct.image_url).toBe('string');
    expect(typeof minimalProduct.created_at).toBe('string');
    expect(typeof minimalProduct.updated_at).toBe('string');
  });

  it('has required numeric fields', () => {
    expect(typeof minimalProduct.price).toBe('number');
    expect(typeof minimalProduct.stock).toBe('number');
  });

  it('optional fields are absent when not provided', () => {
    expect(minimalProduct.brand).toBeUndefined();
    expect(minimalProduct.subcategory).toBeUndefined();
    expect(minimalProduct.specifications).toBeUndefined();
    expect(minimalProduct.long_description).toBeUndefined();
    expect(minimalProduct.images).toBeUndefined();
  });
});

describe('Product specifications field', () => {
  const productWithSpecs: Product = {
    id: 'def-456',
    name: 'HDMI 2.1 Cable 2m',
    slug: 'hdmi-2-1-cable-2m',
    description: '8K HDMI cable.',
    price: 24.99,
    category: 'cables-wires',
    image_url: '/images/hdmi.jpg',
    stock: 15,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    specifications: {
      Version: '2.1',
      Length: '2m',
      Bandwidth: '48Gbps',
    },
  };

  it('accepts key-value string pairs', () => {
    const specs = productWithSpecs.specifications!;
    expect(specs['Version']).toBe('2.1');
    expect(specs['Length']).toBe('2m');
    expect(specs['Bandwidth']).toBe('48Gbps');
  });

  it('all spec values are strings', () => {
    const specs = productWithSpecs.specifications!;
    Object.values(specs).forEach((val) => {
      expect(typeof val).toBe('string');
    });
  });

  it('supports an empty specifications object', () => {
    const p: Product = { ...productWithSpecs, specifications: {} };
    expect(Object.keys(p.specifications!)).toHaveLength(0);
  });
});

describe('CartItem type structure', () => {
  it('wraps a Product with a quantity', () => {
    const item: CartItem = {
      product: {
        id: 'ghi-789',
        name: 'Circuit Breaker 32A',
        slug: 'circuit-breaker-32a',
        description: 'MCB 32A single-pole.',
        price: 8.5,
        category: 'mcbs',
        image_url: '/images/mcb.jpg',
        stock: 100,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
      quantity: 3,
    };

    expect(typeof item.quantity).toBe('number');
    expect(item.quantity).toBe(3);
    expect(item.product.id).toBe('ghi-789');
  });
});
