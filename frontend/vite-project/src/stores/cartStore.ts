import { create } from "zustand";

type CartItem = {
  id: number;
  seedName: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

type CartState = {
  cartItems: CartItem[];
  cartTotal: number;
  addItem: (itemId: CartItem, quantity: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (
    id: number,
    quantity: number,
    operation?: "decrement" | "increment"
  ) => void;
  calculateCartTotal: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  cartTotal: 0,
  addItem: (item, quantity) =>
    set((state) => {
      const existing = state.cartItems.find((i) => i.id === item.id);
      if (existing) {
        get().updateQuantity(item.id, quantity);
        // No need to return new state, updateQuantity already did it.
        return {};
      }
      return { cartItems: [...state.cartItems, { ...item, quantity }] };
    }),
  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity, operation) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                operation === "decrement"
                  ? item.quantity - quantity
                  : item.quantity + quantity,
            }
          : item
      ),
    })),
  calculateCartTotal: () => {
    const items = get().cartItems;
    if (items.length === 0) {
      set({ cartTotal: 0 });
      return;
    }
    const total = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    set({ cartTotal: total });
  },
}));
