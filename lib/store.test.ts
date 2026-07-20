import { useCartStore } from './store';
import type { Product } from '@/types';

// Helper to create mock products
const mockProduct = (overrides?: Partial<Product>): Product => ({
  id: '1',
  name: 'Test Product',
  slug: 'test-product',
  description: 'Test description',
  price: 100,
  category: 'test',
  image_url: '/test.jpg',
  stock: 10,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides,
});

describe('useCartStore', () => {
  beforeEach(() => {
    // Clear cart before each test
    useCartStore.getState().clearCart();
    useCartStore.getState().setCartOpen(false);
  });

  describe('addItem', () => {
    it('adds new item to empty cart', () => {
      const product = mockProduct({ id: '1', price: 100 });
      useCartStore.getState().addItem(product, 2);
      
      const items = useCartStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0].quantity).toBe(2);
      expect(items[0].product.id).toBe('1');
    });

    it('increments quantity when adding existing item', () => {
      const product = mockProduct({ id: '1', price: 100 });
      useCartStore.getState().addItem(product, 1);
      useCartStore.getState().addItem(product, 2);
      
      const items = useCartStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0].quantity).toBe(3); // 1 + 2
    });

    it('opens cart drawer when item added', () => {
      const product = mockProduct();
      useCartStore.getState().addItem(product);
      
      expect(useCartStore.getState().isCartOpen).toBe(true);
    });

    it('defaults quantity to 1 if not specified', () => {
      const product = mockProduct();
      useCartStore.getState().addItem(product);
      
      expect(useCartStore.getState().items[0].quantity).toBe(1);
    });
  });

  describe('removeItem', () => {
    it('removes item from cart', () => {
      const product = mockProduct({ id: '1' });
      useCartStore.getState().addItem(product, 2);
      useCartStore.getState().removeItem('1');
      
      expect(useCartStore.getState().items).toHaveLength(0);
    });

    it('only removes specified item from multi-item cart', () => {
      const p1 = mockProduct({ id: '1' });
      const p2 = mockProduct({ id: '2' });
      useCartStore.getState().addItem(p1, 1);
      useCartStore.getState().addItem(p2, 1);
      useCartStore.getState().removeItem('1');
      
      const items = useCartStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0].product.id).toBe('2');
    });
  });

  describe('updateQuantity', () => {
    it('updates item quantity', () => {
      const product = mockProduct({ id: '1' });
      useCartStore.getState().addItem(product, 1);
      useCartStore.getState().updateQuantity('1', 5);
      
      expect(useCartStore.getState().items[0].quantity).toBe(5);
    });

    it('removes item when quantity set to 0', () => {
      const product = mockProduct({ id: '1' });
      useCartStore.getState().addItem(product, 2);
      useCartStore.getState().updateQuantity('1', 0);
      
      expect(useCartStore.getState().items).toHaveLength(0);
    });

    it('removes item when quantity set to negative', () => {
      const product = mockProduct({ id: '1' });
      useCartStore.getState().addItem(product, 2);
      useCartStore.getState().updateQuantity('1', -5);
      
      expect(useCartStore.getState().items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('removes all items from cart', () => {
      const p1 = mockProduct({ id: '1' });
      const p2 = mockProduct({ id: '2' });
      useCartStore.getState().addItem(p1, 1);
      useCartStore.getState().addItem(p2, 3);
      useCartStore.getState().clearCart();
      
      expect(useCartStore.getState().items).toHaveLength(0);
    });
  });

  describe('getTotal', () => {
    it('calculates total correctly for single item', () => {
      const product = mockProduct({ id: '1', price: 100 });
      useCartStore.getState().addItem(product, 2);
      
      expect(useCartStore.getState().getTotal()).toBe(200);
    });

    it('calculates total correctly for multiple items', () => {
      const p1 = mockProduct({ id: '1', price: 100 });
      const p2 = mockProduct({ id: '2', price: 50 });
      useCartStore.getState().addItem(p1, 2);  // 200
      useCartStore.getState().addItem(p2, 3);  // 150
      
      expect(useCartStore.getState().getTotal()).toBe(350);
    });

    it('returns 0 for empty cart', () => {
      expect(useCartStore.getState().getTotal()).toBe(0);
    });
  });

  describe('getItemCount', () => {
    it('returns total quantity across all items', () => {
      const p1 = mockProduct({ id: '1' });
      const p2 = mockProduct({ id: '2' });
      useCartStore.getState().addItem(p1, 2);
      useCartStore.getState().addItem(p2, 3);
      
      expect(useCartStore.getState().getItemCount()).toBe(5);
    });

    it('returns 0 for empty cart', () => {
      expect(useCartStore.getState().getItemCount()).toBe(0);
    });
  });

  describe('setCartOpen', () => {
    it('sets cart open state to true', () => {
      useCartStore.getState().setCartOpen(true);
      expect(useCartStore.getState().isCartOpen).toBe(true);
    });

    it('sets cart open state to false', () => {
      useCartStore.getState().setCartOpen(true);
      useCartStore.getState().setCartOpen(false);
      expect(useCartStore.getState().isCartOpen).toBe(false);
    });
  });
});
