import { useEffect, useState } from "react";
import { ProductCardProps } from "../../types/types";
import { tempCardType } from "../../types/tempTypes";
import "./productCardCartMobile.css";
import { QuantityControl } from "../quantity-control/QuantityControl";
import { useCartStore } from "../../stores/cartStore";
const ProductCardCart: React.FC<tempCardType> = ({ item }) => {
  const { quantity, id, imageUrl, price, seedName } = item;
  const [counter, setCounter] = useState(quantity);
  const { removeItem, updateQuantity } = useCartStore();
  const handleDecrement = () => {
    const newCount = Math.max(counter - 1, 0);
    setCounter(newCount);
  };

  const handleIncrement = () => {
    const newCount = counter + 1;
    setCounter(newCount);
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
        <h5 className="product-card-cart__title">{seedName}</h5>
        <h5 className="product-card-cart__price">
          {(price * quantity).toFixed(2)}Kr
        </h5>
        <div className="product-card-cart__actions">
          <QuantityControl
            counter={quantity}
            onIncrement={() => updateQuantity(id, 1, "increment")}
            onDecrement={() => updateQuantity(id, 1, "decrement")}
            disableDecrement={quantity <= 1}
          />
        </div>
        <button
          className="product-card-cart__remove"
          onClick={() => removeItem(id)}
        >
          Remove
        </button>
      </div>
    </section>
  );
};

export default ProductCardCart;
