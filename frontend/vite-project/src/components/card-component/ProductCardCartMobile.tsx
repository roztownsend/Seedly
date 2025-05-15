import { ProductCardCartProps } from "../../types/types";
import "./productCardCartMobile.css";
import { QuantityControl } from "../quantity-control/QuantityControl";
import { useCartActions } from "../../stores/cartStore";
const ProductCardCart: React.FC<ProductCardCartProps> = ({ item }) => {
  const { removeItem, updateQuantity } = useCartActions();

  const { quantity, id, image_url, price, product_name } = item;

  return (
    <section className="product-card-cart">
      <div className="product-card-cart__image">
        <img
          src={image_url}
          alt={product_name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="product-card-cart__details">
        <h5 className="product-card-cart__title">{product_name}</h5>
        <h5 className="product-card-cart__price">
          {(price * quantity).toFixed(2)}Kr
        </h5>
        <div className="product-card-cart__actions">
          <QuantityControl cartId={id} />
        </div>
        <button
          className="product-card-cart__remove text-link-primary"
          onClick={() => removeItem(id)}
        >
          Remove
        </button>
      </div>
    </section>
  );
};

export default ProductCardCart;
