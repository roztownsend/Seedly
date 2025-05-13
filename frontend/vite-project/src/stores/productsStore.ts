import { create } from "zustand";
import axios from "axios";
const productCatalog = [
  {
    id: 1,
    imageUrl:
      "https://images.pexels.com/photos/54082/carrots-vegetables-food-orange-54082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    seedName: "Carrot",
    price: 10,
  },
  {
    id: 2,
    imageUrl:
      "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg",
    seedName: "Tomato",
    price: 12,
  },
  {
    id: 3,
    imageUrl:
      "https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg",
    seedName: "Zucchini",
    price: 8,
  },
];

type FetchAllPlantsResponse = {
  data: ProductItem[];
};

export type ProductItem = {
  id: string;
  productName: string;
  price: number;
  description?: string;
  cycle?: string;
  image_url?: string;
  createdAt: string;
  updatedAt: string;
  isEdible?: boolean;
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

    set({
      productList: response.data.data,
    });
  },
}));
