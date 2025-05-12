import { ProductCardCartProps } from "../../types/types";
import "./productCardCart.css";
import { QuantityControl } from "../quantity-control/QuantityControl";
import { useCartStore } from "../../stores/cartStore";
const ProductCardCart: React.FC<ProductCardCartProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();
  const { id, imageUrl, price, seedName, quantity } = item;

  return (
    <div className="product-card-cart">
      <div className="product-card-cart__image-box">
        <img
          src={imageUrl}
          alt={seedName}
          className="product-card-cart__image"
        />
      </div>
      <div className="product-card-cart__actions-wrapper">
        <div className="product-card-cart__details">
          <h4 className="product-card-cart__title">{seedName}</h4>
          <div className="product-card-cart__actions">
            <h5 className="product-card-cart__price">
              {(price * quantity).toFixed(2)} Kr
            </h5>
            <QuantityControl
              counter={quantity}
              onIncrement={() => updateQuantity(id, 1, "increment")}
              onDecrement={() => updateQuantity(id, 1, "decrement")}
            />
          </div>
          <button
            className="product-card-cart__remove text-link-primary"
            onClick={() => removeItem(id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardCart;
