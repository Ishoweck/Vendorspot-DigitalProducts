import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TempStore {
  savedItems: string[];
  cartItems: { productId: string; quantity: number }[];
  pendingSaved: string[];
  pendingCart: { productId: string; quantity: number }[];
  addSavedItem: (productId: string) => void;
  removeSavedItem: (productId: string) => void;
  addCartItem: (productId: string, quantity?: number) => void;
  removeCartItem: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearSavedItems: () => void;
  clearCart: () => void;
  clearAll: () => void;
  markPendingFromGuest: () => void;
  transferPendingToUser: () => void;
}

export const useTempStore = create<TempStore>()(
  persist(
    (set, get) => ({
      savedItems: [],
      cartItems: [],
      pendingSaved: [],
      pendingCart: [],

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
      markPendingFromGuest: () => {
        set((state) => ({
          pendingSaved: [...state.savedItems],
          pendingCart: [...state.cartItems],
          savedItems: [],
          cartItems: [],
        }));
      },

      transferPendingToUser: () => {
        set((state) => ({
          savedItems: Array.from(new Set([...(state.savedItems || []), ...state.pendingSaved])),
          cartItems: (() => {
            const map = new Map<string, number>();
            [...state.cartItems, ...state.pendingCart].forEach((it) => {
              map.set(it.productId, (map.get(it.productId) || 0) + it.quantity);
            });
            return Array.from(map.entries()).map(([productId, quantity]) => ({ productId, quantity }));
          })(),
          pendingSaved: [],
          pendingCart: [],
        }));
      },
    }),
    {
      name: 'temp-store',
    }
  )
); 