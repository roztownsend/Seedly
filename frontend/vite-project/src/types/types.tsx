export interface ProductCardProps {
  imageUrl: string;
  seedName: string;
  price: number;
  id: number;
  onQuantityChange?: (newQuantity: number) => void;
  onAddToCart?: (quantity: number) => void;
  onRemove?: () => void;
  showQuantityControls?: boolean;
}
