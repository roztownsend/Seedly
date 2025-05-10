import { ProductCardCartProps } from "../../types/types";
import "./productCardCart.css";
import { QuantityControl } from "../quantity-control/QuantityControl";
import { useCartStore } from "../../stores/cartStore";
const ProductCardCart: React.FC<ProductCardCartProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();
  const { id, imageUrl, price, seedName, quantity } = item;

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

          <QuantityControl
            counter={quantity}
            onIncrement={() => updateQuantity(id, 1, "increment")}
            onDecrement={() => updateQuantity(id, 1, "decrement")}
            disableDecrement={quantity <= 1}
          />
        </div>
        <h4 className="product-card-cart__price">
          {(price * quantity).toFixed(2)}Kr
        </h4>
      </div>
      <button
        className="product-card-cart__remove text-link-primary"
        onClick={() => removeItem(id)}
      >
        Remove
      </button>
    </section>
  );
};

export default ProductCardCart;
