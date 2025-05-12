import { create } from "zustand";

export type CartItem = {
  id: number;
  seedName: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

type CartState = {
  cartItems: CartItem[];
  cartTotal: number;
  addItem: (itemId: CartItem) => void;
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
  addItem: (item) =>
    set((state) => ({
      cartItems: [...state.cartItems, item],
    })),

  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity, operation) =>
    set((state) => {
      const updatedCartItems = state.cartItems
        .map((item) => {
          if (item.id !== id) return item;

          const newQuantity =
            operation === "decrement"
              ? item.quantity - quantity
              : item.quantity + quantity;

          if (newQuantity <= 0) {
            return null;
          }
          return {
            ...item,
            quantity: newQuantity,
          };
        })
        .filter((item) => item !== null);
      return { cartItems: updatedCartItems };
    }),
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
