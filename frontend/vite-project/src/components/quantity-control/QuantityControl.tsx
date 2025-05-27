import "./QuantityControl.css";
import { useCartActions, useCartItem } from "../../stores/cartStore";
import { useEffect, useRef, useState } from "react";

interface QuantityControlProps {
  cartId: string;
  fallbackButton?: React.ReactNode;
  compact?: boolean;

}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  cartId,
  fallbackButton,
  compact = false,
}) => {
  const cartItem = useCartItem(cartId);
  const { updateQuantity } = useCartActions();
  const [animate, setAnimate] = useState(false);
  const prevQty = useRef(cartItem?.quantity);

  useEffect(() => {
    if (cartItem && cartItem.quantity !== prevQty.current) {
      setAnimate(true);
      prevQty.current = cartItem.quantity;
      const timeout = setTimeout(() => setAnimate(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [cartItem?.quantity]);

  if (!cartItem) return fallbackButton ?? null;
  return (
    <div className={`quantity-control${compact ? " quantity-control--compact" : ""}`}>
      <button className="quantity-btn" onClick={() => updateQuantity(cartId, 1, "decrement")}>-</button>
      <span className={`quantity-value${animate ? " pop" : ""}`}>{cartItem?.quantity}</span>
      <button className="quantity-btn" onClick={() => updateQuantity(cartId, 1, "increment")}>+</button>
    </div>
  );
};