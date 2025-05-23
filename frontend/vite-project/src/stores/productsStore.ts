import { create } from "zustand";
import axios from "axios";

export type FetchAllPlantsResponse = {
  data: ProductItem[];
};

type ProductActions = {
  fetchAllPlants: () => void;
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
};

const useProductsStore = create<ProductState>((set) => ({
  productList: [],
  actions: {
    fetchAllPlants: async () => {
      const response = await axios.get("http://localhost:5001/plants");
      console.log(response.data);
      set({
        productList: response.data,
      });
    },
  },
}));

export const useProductList = () =>
  useProductsStore((state) => state.productList);

export const useProductActions = () =>
  useProductsStore((state) => state.actions);
