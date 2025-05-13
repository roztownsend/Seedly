import { ProductItem } from "../stores/productsStore";
import { CartItem } from "../stores/cartStore";
export interface ProductCardProps {
  item: ProductItem;
}

export type ProductCardCartProps = {
  item: CartItem;
};


export interface HeroProps {
    heading: string;
    subheading: string;
    imageUrl: string;
  }

export type Plant = {
  id: string;
  product_name: string;
  price: number;
  description: string;
  cycle: string;
  image_url: string;
  sunlight: string;
};