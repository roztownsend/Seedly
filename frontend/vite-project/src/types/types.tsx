import { ProductItem } from "../stores/productsStore";

export interface ProductCardProps {
  item: ProductItem;
}

export type ProductCardCartProps = {
  item: CartItem;
  showQuantity?: boolean;
  showRemove?: boolean;
};

export interface HeroProps {
  heading: string;
  subheading: string;
  imageUrl?: string;
}
