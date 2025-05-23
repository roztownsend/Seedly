import { CartItem } from "../stores/cartStore";
import { ProductItem } from "../stores/productsStore";

export interface ProductCardProps {
  item: ProductItem;
}

export type ProductCardCartProps = {
  id: string;
  item?: CartItem;
  showQuantity?: boolean;
  showRemove?: boolean;
};

export interface HeroProps {
  heading: string;
  subheading: string;
  imageUrl?: string;
}

export type Task = {
  id: string;
  description: string;
  start_month: number;
  end_month: number;
};