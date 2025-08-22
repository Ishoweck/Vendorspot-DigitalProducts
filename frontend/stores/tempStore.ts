import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TempStore {
  savedItems: string[];
  cartItems: { productId: string; quantity: number }[];
  sessionId: string;
  isPendingSync: boolean;
  addSavedItem: (productId: string) => void;
  removeSavedItem: (productId: string) => void;
  addCartItem: (productId: string, quantity?: number) => void;
  removeCartItem: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearSavedItems: () => void;
  clearCart: () => void;
  clearAll: () => void;
  markPendingSync: () => void;
  clearPendingSync: () => void;
  generateNewSession: () => void;
  isVendor: boolean;
  setVendorStatus: (status: boolean) => void;
}

const generateSessionId = () =>
  `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useTempStore = create<TempStore>()(
  persist(
    (set, get) => ({
      savedItems: [],
      cartItems: [],
      sessionId: generateSessionId(),
      isPendingSync: false,
      isVendor: false,

      addSavedItem: (productId: string) => {
        const { isVendor } = get();
        if (isVendor) return;

        console.log(
          "Adding saved item:",
          productId,
          "Current saved items:",
          get().savedItems
        );
        set((state) => ({
          savedItems: state.savedItems.includes(productId)
            ? state.savedItems
            : [...state.savedItems, productId],
        }));
        console.log("Updated saved items:", get().savedItems);
      },

      removeSavedItem: (productId: string) => {
        set((state) => ({
          savedItems: state.savedItems.filter((id) => id !== productId),
        }));
      },

      addCartItem: (productId: string, quantity = 1) => {
        const { isVendor } = get();
        if (isVendor) return;

        console.log(
          "Adding cart item:",
          productId,
          "Current cart items:",
          get().cartItems
        );
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
        console.log("Updated cart items:", get().cartItems);
      },

      removeCartItem: (productId: string) => {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.productId !== productId
          ),
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

      markPendingSync: () => {
        console.log("Marking pending sync");
        set({ isPendingSync: true });
      },
      clearPendingSync: () => {
        console.log("Clearing pending sync");
        set({ isPendingSync: false });
      },

      generateNewSession: () => {
        console.log("Generating new session - clearing all data");
        set({
          sessionId: generateSessionId(),
          savedItems: [],
          cartItems: [],
          isPendingSync: false,
        });
      },

      setVendorStatus: (status: boolean) => set({ isVendor: status }),
    }),
    {
      name: "temp-store",
      partialize: (state) => ({
        savedItems: state.savedItems,
        cartItems: state.cartItems,
        sessionId: state.sessionId,
        isPendingSync: state.isPendingSync,
        isVendor: state.isVendor,
      }),
    }
  )
);
