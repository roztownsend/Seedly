import { create } from "zustand";

export type CartItem = {
  id: string;
  product_name: string;
  price: number;
  description?: string;
  cycle?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  isedible?: boolean;
  sunlight?: string;
  quantity: number;
};

type CartActions = {
  addItem: (itemId: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (
    id: string,
    quantity: number,
    operation?: "decrement" | "increment"
  ) => void;
  calculateCartTotal: () => void;
};

type CartState = {
  cartItems: CartItem[];
  cartTotal: number;
  actions: CartActions;
};

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  cartTotal: 0,
  actions: {
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
  },
}));

export const useCartItems = () => useCartStore((state) => state.cartItems);

export const useCartTotal = () => useCartStore((state) => state.cartTotal);

export const useCartActions = () => useCartStore((state) => state.actions);
