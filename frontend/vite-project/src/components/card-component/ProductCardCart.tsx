import { useEffect, useState } from "react";
import { ProductCardProps } from "../../types/types";
import "./productCardCart.css";
import { QuantityControl } from "../quantity-control/QuantityControl";
import { useCartStore } from "../../stores/cartStore";
const ProductCardCart: React.FC<ProductCardProps> = ({
  imageUrl,
  seedName,
  price,
  quantity,
  id,
  onQuantityChange,
  onRemove,
  showQuantityControls = true,
}) => {
  const { calculateCartTotal, updateQuantity, cartItems } = useCartStore();
  const individualItem = cartItems.find((item) => item.id === id);
  const currentQuantity = individualItem ? individualItem.quantity : 0;
  const [counter, setCounter] = useState(currentQuantity);

  const handleDecrement = () => {
    setCounter((prevState) => {
      const newValue = prevState - 1 === 0 ? 1 : prevState - 1;
      updateQuantity(id, newValue, "decrement");
      return newValue;
    });
  };

  const handleIncrement = () => {
    setCounter((prevState) => {
      const newValue = prevState + 1;
      updateQuantity(id, newValue, "increment");
      return newValue;
    });
  };

  return (
    <section className="product-card-cart">
      <div className="product-card-cart__image">
        <img
          src={imageUrl}
          alt={seedName}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="product-card-cart__details">
        <h4 className="product-card-cart__title">{seedName}</h4>
        <div className="product-card-cart__actions">
          {/* Use QuantityComponent here */}
          {showQuantityControls ? (
            <QuantityControl
              counter={counter}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              disableDecrement={counter <= 0}
            />
          ) : (
            // If showQuantityControls is false, display quantity text
            <p className="product-card-checkout__quantity-text">
              Quantity: {counter}
            </p>
          )}
        </div>
        <h4 className="product-card-cart__price">
          {(price * counter).toFixed(2)}Kr
        </h4>
      </div>
      <button className="product-card-cart__remove" onClick={onRemove}>
        Remove
      </button>
    </section>
  );
};

export default ProductCardCart;
