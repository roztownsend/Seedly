import { create } from "zustand";
import axios from "axios";

export type FetchAllPlantsResponse = {
  data: ProductItem[];
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

type ProductActions = {
  fetchAllPlants: () => void;
};

type ProductState = {
  productList: ProductItem[];
  actions: ProductActions;
};

const useProductsStore = create<ProductState>((set) => ({
  productList: [],
  actions: {
    fetchAllPlants: async () => {
      const response = await axios.get<FetchAllPlantsResponse>(
        "http://localhost:5000/plants"
      );
      console.log(response.data.data);
      set({
        productList: response.data.data,
      });
    },
  },
}));

export const useProductList = () =>
  useProductsStore((state) => state.productList);

export const useProductActions = () =>
  useProductsStore((state) => state.actions);
