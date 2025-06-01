import { create } from "zustand";
import { useShallow } from "zustand/shallow";

type CartActions = {
  addItem: (itemId: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (
    id: string,
    quantity: number,
    operation?: "decrement" | "increment"
  ) => void;
  clearCart: () => void;
};

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

type CartState = {
  cartItems: CartItem[];
  actions: CartActions;
};

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
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
      clearCart: () => set({ cartItems: [] }),
  },
}));

export const useCartItems = () => useCartStore((state) => state.cartItems);

export const useCartTotal = () =>
  useCartStore((state) =>
    state.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );

export const useCartQuantitiesTotal = () => 
  useCartStore((state) => state.cartItems.reduce((total, item) => 
    total + item.quantity, 0)); 

export const useCartActions = () => useCartStore((state) => state.actions);

export const useCartUniqueItems = () =>
  useCartStore((state) => state.cartItems.length);

export const useCartItem = (id: string) =>
  useCartStore((state) =>
    state.cartItems.find((cartItem) => cartItem.id === id)
  );

export const useCartItemIds = () =>
  useCartStore(useShallow((state) => state.cartItems.map((item) => item.id)));