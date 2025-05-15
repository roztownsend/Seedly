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
    imageUrl?: string;
  }

  