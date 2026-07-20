import { useCartStore } from '../../lib/store';
import { Product } from '../../types';

// Mock matchMedia which is sometimes needed by Zustand persist if it uses window
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const mockProductA: Product = {
  id: 'product-a',
  name: 'Product A',
  slug: 'product-a',
  description: 'Desc A',
  price: 100,
  category: 'cat',
  image_url: '/a.jpg',
  stock: 10,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

const mockProductB: Product = {
  id: 'product-b',
  name: 'Product B',
  slug: 'product-b',
  description: 'Desc B',
  price: 50,
  category: 'cat',
  image_url: '/b.jpg',
  stock: 5,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

describe('Cart Store (Zustand)', () => {
  // Reset store before each test
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('adds a new item to an empty cart', () => {
    const store = useCartStore.getState();
    store.addItem(mockProductA, 1);
    
    const updatedStore = useCartStore.getState();
    expect(updatedStore.items).toHaveLength(1);
    expect(updatedStore.items[0].product.id).toBe('product-a');
    expect(updatedStore.items[0].quantity).toBe(1);
    expect(updatedStore.isCartOpen).toBe(true);
  });

  it('increments quantity for an existing item', () => {
    const store = useCartStore.getState();
    store.addItem(mockProductA, 1);
    store.addItem(mockProductA, 2);
    
    const updatedStore = useCartStore.getState();
    expect(updatedStore.items).toHaveLength(1);
    expect(updatedStore.items[0].quantity).toBe(3);
  });

  it('removes item when quantity is updated to 0', () => {
    const store = useCartStore.getState();
    store.addItem(mockProductA, 2);
    
    // Update to 0
    store.updateQuantity(mockProductA.id, 0);
    
    const updatedStore = useCartStore.getState();
    expect(updatedStore.items).toHaveLength(0);
  });

  it('removes item explicitly', () => {
    const store = useCartStore.getState();
    store.addItem(mockProductA, 1);
    store.removeItem(mockProductA.id);
    
    const updatedStore = useCartStore.getState();
    expect(updatedStore.items).toHaveLength(0);
  });

  it('calculates total and item count correctly with multiple items', () => {
    const store = useCartStore.getState();
    // 2 of A (2 * 100 = 200)
    store.addItem(mockProductA, 2);
    // 3 of B (3 * 50 = 150)
    store.addItem(mockProductB, 3);
    
    const updatedStore = useCartStore.getState();
    expect(updatedStore.items).toHaveLength(2);
    
    // Total cost: 200 + 150 = 350
    expect(updatedStore.getTotal()).toBe(350);
    
    // Total items: 2 + 3 = 5
    expect(updatedStore.getItemCount()).toBe(5);
  });

  it('persists to localStorage', () => {
    // Zustand persist middleware writes to localStorage automatically
    // We can just verify if localStorage was updated
    const store = useCartStore.getState();
    store.addItem(mockProductA, 1);
    
    const storedState = JSON.parse(window.localStorage.getItem('cart-storage') || '{}');
    expect(storedState.state.items).toHaveLength(1);
    expect(storedState.state.items[0].product.id).toBe('product-a');
  });
});
