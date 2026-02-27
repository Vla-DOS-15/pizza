import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/lib/types";

interface CartState {
  items: CartItem[];
  lastAddress: string;
  customerName: string;
  customerPhone: string;

  addItem: (item: CartItem) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  setUserData: (name: string, phone: string, address: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      lastAddress: "",
      customerName: "",
      customerPhone: "",

      addItem: (newItem) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.cartItemId === newItem.cartItemId,
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.cartItemId === newItem.cartItemId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }
          return { items: [...state.items, newItem] };
        }),

      removeItem: (cartItemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        })),

      updateQuantity: (cartItemId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item,
          ),
        })),

      clearCart: () => set({ items: [] }),

      setUserData: (name, phone, address) =>
        set({ customerName: name, customerPhone: phone, lastAddress: address }),
    }),
    {
      name: "pizza-cart-storage",
    },
  ),
);
