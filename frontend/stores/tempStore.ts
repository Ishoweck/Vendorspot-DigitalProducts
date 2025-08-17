import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TempStore {
  savedItems: string[];
  cartItems: { productId: string; quantity: number }[];
  addSavedItem: (productId: string) => void;
  removeSavedItem: (productId: string) => void;
  addCartItem: (productId: string, quantity?: number) => void;
  removeCartItem: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearSavedItems: () => void;
  clearCart: () => void;
  clearAll: () => void;
}

export const useTempStore = create<TempStore>()(
  persist(
    (set, get) => ({
      savedItems: [],
      cartItems: [],

      addSavedItem: (productId: string) => {
        set((state) => ({
          savedItems: state.savedItems.includes(productId)
            ? state.savedItems
            : [...state.savedItems, productId],
        }));
      },

      removeSavedItem: (productId: string) => {
        set((state) => ({
          savedItems: state.savedItems.filter((id) => id !== productId),
        }));
      },

      addCartItem: (productId: string, quantity = 1) => {
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.productId === productId
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            cartItems: [...state.cartItems, { productId, quantity }],
          };
        });
      },

      removeCartItem: (productId: string) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.productId !== productId),
        }));
      },

      updateCartQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeCartItem(productId);
          return;
        }

        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearSavedItems: () => set({ savedItems: [] }),
      clearCart: () => set({ cartItems: [] }),
      clearAll: () => set({ savedItems: [], cartItems: [] }),
    }),
    {
      name: 'temp-store',
    }
  )
); 