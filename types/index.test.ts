/**
 * Unit tests for type validation
 * 
 * Validates: Requirements 1.1, 3.1
 * 
 * Tests that TypeScript type definitions work correctly:
 * - Product type structure with required fields
 * - Specifications field accepts key-value pairs
 */

import {
  Product,
  CartItem,
  Order,
  OrderItem,
  Address,
  BentoTile,
} from './index';

describe('Type Validation', () => {
  describe('Product type', () => {
    it('accepts valid product with all required fields', () => {
      const product: Product = {
        id: '1',
        name: 'Test Switch',
        slug: 'test-switch',
        description: 'A test switch',
        price: 100,
        category: 'switches-sockets',
        image_url: '/test.jpg',
        stock: 10,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      expect(product).toBeDefined();
      expect(product.id).toBe('1');
      expect(product.name).toBe('Test Switch');
      expect(product.price).toBe(100);
    });

    it('accepts product with specifications as key-value pairs', () => {
      const product: Product = {
        id: '1',
        name: 'Test Switch',
        slug: 'test-switch',
        description: 'A test switch',
        price: 100,
        category: 'switches-sockets',
        image_url: '/test.jpg',
        stock: 10,
        specifications: {
          'Amperage': '16A',
          'Voltage': '220V',
          'Poles': '3-pin',
        },
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      expect(product.specifications).toBeDefined();
      expect(product.specifications?.['Amperage']).toBe('16A');
      expect(product.specifications?.['Voltage']).toBe('220V');
      expect(product.specifications?.['Poles']).toBe('3-pin');
    });

    it('accepts product with optional fields', () => {
      const product: Product = {
        id: '1',
        name: 'Test Cable',
        slug: 'test-cable',
        description: 'A test cable',
        long_description: 'Detailed description',
        price: 50,
        category: 'cables-wires',
        subcategory: 'hdmi',
        brand: 'TechBrand',
        image_url: '/test.jpg',
        images: ['/test1.jpg', '/test2.jpg'],
        stock: 25,
        specifications: {
          'Length': '2m',
          'Type': 'HDMI 2.1',
        },
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      expect(product.long_description).toBe('Detailed description');
      expect(product.subcategory).toBe('hdmi');
      expect(product.brand).toBe('TechBrand');
      expect(product.images).toHaveLength(2);
    });

    it('accepts product with empty specifications', () => {
      const product: Product = {
        id: '1',
        name: 'Basic Product',
        slug: 'basic-product',
        description: 'A basic product',
        price: 20,
        category: 'tools',
        image_url: '/test.jpg',
        stock: 5,
        specifications: {},
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00:00Z',
      };

      expect(product.specifications).toEqual({});
    });

    it('accepts product without specifications field', () => {
      const product: Product = {
        id: '1',
        name: 'Simple Product',
        slug: 'simple-product',
        description: 'A simple product',
        price: 30,
        category: 'smart-home',
        image_url: '/test.jpg',
        stock: 15,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      expect(product.specifications).toBeUndefined();
    });
  });

  describe('CartItem type', () => {
    it('accepts valid cart item with product and quantity', () => {
      const product: Product = {
        id: '1',
        name: 'Test Product',
        slug: 'test-product',
        description: 'Test',
        price: 100,
        category: 'cables-wires',
        image_url: '/test.jpg',
        stock: 10,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const cartItem: CartItem = {
        product,
        quantity: 2,
      };

      expect(cartItem.product).toBe(product);
      expect(cartItem.quantity).toBe(2);
    });
  });

  describe('Order type', () => {
    it('accepts valid order with all required fields', () => {
      const address: Address = {
        line1: '123 Main St',
        city: 'New York',
        state: 'NY',
        postal_code: '10001',
        country: 'US',
      };

      const orderItem: OrderItem = {
        product_id: '1',
        product_name: 'Test Product',
        quantity: 2,
        price: 100,
      };

      const order: Order = {
        id: 'order-1',
        customer_name: 'John Doe',
        customer_email: 'john@example.com',
        customer_phone: '+1234567890',
        shipping_address: address,
        items: [orderItem],
        subtotal: 200,
        total: 200,
        status: 'pending',
        payment_status: 'pending',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      expect(order).toBeDefined();
      expect(order.customer_name).toBe('John Doe');
      expect(order.items).toHaveLength(1);
      expect(order.status).toBe('pending');
    });
  });

  describe('Address type', () => {
    it('accepts valid address with required fields', () => {
      const address: Address = {
        line1: '456 Elm St',
        city: 'Boston',
        state: 'MA',
        postal_code: '02101',
        country: 'US',
      };

      expect(address.line1).toBe('456 Elm St');
      expect(address.city).toBe('Boston');
    });

    it('accepts address with optional line2', () => {
      const address: Address = {
        line1: '789 Oak Ave',
        line2: 'Apt 5B',
        city: 'Chicago',
        state: 'IL',
        postal_code: '60601',
        country: 'US',
      };

      expect(address.line2).toBe('Apt 5B');
    });
  });

  describe('BentoTile type', () => {
    it('accepts valid bento tile with required fields', () => {
      const tile: BentoTile = {
        category: {
          name: 'Home Theatre',
          slug: 'home-theatre-audio',
          icon: 'Speaker',
          description: 'Premium audio equipment',
          specs: 'Dolby Atmos, 7.2 Channel',
        },
        gridSize: 'large',
      };

      expect(tile.category.name).toBe('Home Theatre');
      expect(tile.gridSize).toBe('large');
    });

    it('accepts bento tile with subcategories', () => {
      const tile: BentoTile = {
        category: {
          name: 'Home Theatre',
          slug: 'home-theatre-audio',
          icon: 'Speaker',
          description: 'Premium audio equipment',
          specs: 'Dolby Atmos',
        },
        gridSize: 'large',
        subcategories: ['Spatial Audio', 'Dolby Atmos', 'Soundbars'],
      };

      expect(tile.subcategories).toHaveLength(3);
      expect(tile.subcategories).toContain('Soundbars');
    });
  });
});
