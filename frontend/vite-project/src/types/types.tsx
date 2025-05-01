export interface ProductCardProps {
    imageUrl: string;
    seedName: string;
    price: number;
    quantity: number;
    onQuantityChange?: (newQuantity: number) => void;
    onAddToCart?: (quantity: number) => void;
  }
  