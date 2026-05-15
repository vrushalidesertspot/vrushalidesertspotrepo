import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Cake } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (cake: Cake, flavor: string, weight: number, message?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (cake, flavor, weight, message) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === cake.id && item.selectedFlavor === flavor && item.selectedWeight === weight
          );
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === cake.id && item.selectedFlavor === flavor && item.selectedWeight === weight
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          
          return {
            items: [
              ...state.items,
              { ...cake, quantity: 1, selectedFlavor: flavor, selectedWeight: weight, customMessage: message },
            ],
          };
        });
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
