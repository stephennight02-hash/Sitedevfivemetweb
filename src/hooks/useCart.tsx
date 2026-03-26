import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface CartStore {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      total: 0,

      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === item.id);

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }

        const newItems = get().items;
        set({
          itemCount: newItems.reduce((acc, i) => acc + i.quantity, 0),
          total: newItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
        });
      },

      removeItem: (id) => {
        const newItems = get().items.filter((i) => i.id !== id);
        set({
          items: newItems,
          itemCount: newItems.reduce((acc, i) => acc + i.quantity, 0),
          total: newItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        const newItems = get().items.map((i) =>
          i.id === id ? { ...i, quantity } : i
        );
        set({
          items: newItems,
          itemCount: newItems.reduce((acc, i) => acc + i.quantity, 0),
          total: newItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
        });
      },

      clearCart: () => {
        set({ items: [], itemCount: 0, total: 0 });
      },
    }),
    {
      name: "orizon-cart",
    }
  )
);
