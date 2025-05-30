import "./QuantityControl.css";
import { useCartActions, useCartItem } from "../../stores/cartStore";
interface QuantityControlProps {
  cartId: string;
  fallbackButton?: React.ReactNode;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  cartId,
  fallbackButton,
}) => {
  const cartItem = useCartItem(cartId);
  const { updateQuantity } = useCartActions();
  if (!cartItem) return fallbackButton ?? null;
  return (
    <div className="quantity-control">
      <button onClick={() => updateQuantity(cartId, 1, "decrement")}>-</button>
      <span>{cartItem?.quantity}</span>
      <button onClick={() => updateQuantity(cartId, 1, "increment")}>+</button>
    </div>
  );
};