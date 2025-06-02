import { ProductCardCartProps } from "../../types/types";
import "./productCardCartMobile.css";
import { QuantityControl } from "../quantity-control/QuantityControl";
import { useCartActions } from "../../stores/cartStore";
const ProductCardCart: React.FC<ProductCardCartProps> = ({ item, showQuantity = true, showRemove = true }) => {
  const { removeItem } = useCartActions();
  if (!item) {
    return null;
  }
  const { quantity, id, image_url, price, product_name } = item;
  return (
    <section className="product-card-cart">
      <div className="product-card-cart__image">
        <img
          src={image_url}
          alt={product_name}
          className="product-card-cart__img"
        />
      </div>
      <div className="product-card-cart__details">
        <h5 className="product-card-cart__title">{product_name}</h5>
        <h5 className="product-card-cart__price">
          {(price * quantity).toFixed(2)}Kr
        </h5>
        <div className="product-card-cart__actions">
          {showQuantity &&  <QuantityControl cartId={id} />
        }
        </div>
        {showRemove && <button
          className="product-card-cart__remove text-link-primary"
          onClick={() => removeItem(id)}
        >
          Remove
        </button>
        }
      </div>
    </section>
  );
};

export default ProductCardCart;