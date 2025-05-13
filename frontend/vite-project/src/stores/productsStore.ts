import { create } from "zustand";
import axios from "axios";

type FetchAllPlantsResponse = {
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

type ProductList = { productList: ProductItem[] };

type ProductState = {
  fetchAllPlants: () => void;
};

export const useProductsStore = create<ProductState & ProductList>((set) => ({
  productList: [],
  fetchAllPlants: async () => {
    const response = await axios.get<FetchAllPlantsResponse>(
      "http://localhost:5000/plants"
    );
    console.log(response.data.data);
    set({
      productList: response.data.data,
    });
  },
}));
