import { ProductItem } from "../stores/productsStore";

export interface ProductCardProps {
  item: ProductItem;
}

export type ProductCardCartProps = {
  id: string;
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