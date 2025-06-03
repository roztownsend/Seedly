import { create } from "zustand";
import axios from "axios";

export type FetchAllPlantsResponse = {
  data: ProductItem[];
};

type ProductActions = {
  fetchAllPlants: () => void;
  updateProductList: (sorted: ProductItem[]) => void;
};

export type ProductItem = {
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
};

type ProductState = {
  productList: ProductItem[];
  actions: ProductActions;
  loading: boolean;
};

const useProductsStore = create<ProductState>((set) => ({
  productList: [],
  loading: false,
  actions: {
    fetchAllPlants: async () => {
      set({ loading: true })
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/plants`);
      console.log(response.data);
      set({
        productList: response.data,
        loading: false
      });
    },
    updateProductList: (sorted) => {
      console.log("Sorted store!")
      set({ productList: sorted })
    }
  }
}));

export const useProductList = () =>
  useProductsStore((state) => state.productList);

export const useProductLoading = () =>
  useProductsStore((state) => state.loading);

export const useProductActions = () =>
  useProductsStore((state) => state.actions);
