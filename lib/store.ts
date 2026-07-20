import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/types';
import toast from 'react-hot-toast';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      
      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
            isCartOpen: true, // Auto open cart on add
          });
        } else {
          set({ items: [...items, { product, quantity }], isCartOpen: true });
        }
      },
      
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.product.id !== productId) });
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

interface CompareStore {
  compareItems: Product[];
  toggleCompare: (product: Product) => void;
  removeCompare: (productId: string) => void;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      compareItems: [],
      
      toggleCompare: (product) => {
        const items = get().compareItems;
        const exists = items.some(p => p.id === product.id);
        
        if (exists) {
          set({ compareItems: items.filter(p => p.id !== product.id) });
        } else {
          // Max 3 items
          if (items.length >= 3) {
            toast.error('Maximum 3 items can be compared.');
            return;
          }
          set({ compareItems: [...items, product] });
          toast.success('Added to comparison');
        }
      },
      
      removeCompare: (productId) => {
        set({ compareItems: get().compareItems.filter(p => p.id !== productId) });
      },
      
      clearCompare: () => set({ compareItems: [] }),
    }),
    {
      name: 'compare-storage',
    }
  )
);
