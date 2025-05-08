import { create } from "zustand";
const productCatalog = [
  {
    id: 1,
    imageUrl:
      "https://images.pexels.com/photos/54082/carrots-vegetables-food-orange-54082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    seedName: "Carrot",
    price: 10,
    quantity: 0,
  },
  {
    id: 2,
    imageUrl:
      "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg",
    seedName: "Tomato",
    price: 12,
    quantity: 0,
  },
  {
    id: 3,
    imageUrl:
      "https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg",
    seedName: "Zucchini",
    price: 8,
    quantity: 0,
  },
];

type ProductItem = {
  id: number;
  seedName: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

type ProductList = { productList: ProductItem[] };

export const useProductsStore = create<ProductList>((set) => ({
  productList: productCatalog,
}));
