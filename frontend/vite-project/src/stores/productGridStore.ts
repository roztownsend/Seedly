import { create } from "zustand";

type ProductGridState = {
  displayedCount: number;
  setDisplayedCount: (count: number) => void;
  resetDisplayedCount: () => void;
};

export const useProductGridStore = create<ProductGridState>((set) => ({
  displayedCount: 0,
  setDisplayedCount: (count) => set({ displayedCount: count }),
  resetDisplayedCount: () => set({ displayedCount: 0 }),
}));