import { ProductCardCartProps } from "../../types/types";
import "./productCardCart.css";
import { QuantityControl } from "../quantity-control/QuantityControl";
import { useCartActions, useCartItem } from "../../stores/cartStore";
import { memo } from "react";
const ProductCardCart: React.FC<ProductCardCartProps> = ({ id }) => {
  const { removeItem } = useCartActions();
  const cartItem = useCartItem(id);
  if (!cartItem) return null;
  const { image_url, product_name, price, quantity } = cartItem;

  return (
    <div className="product-card-cart">
      <div className="product-card-cart__image-box">
        <img src={image_url} alt={product_name} className="product-card-cart__image" />
      </div>
      <div className="product-card-cart__actions-wrapper">
        <div className="product-card-cart__details">
          <div className="product-card-cart__title-container">
            <h4 className="product-card-cart__title">{product_name}</h4>
          </div>
          <div className="product-card-cart__actions">
            <h5 className="product-card-cart__price">{(price * quantity).toFixed(2)} Kr</h5>
            <QuantityControl compactCart cartId={id} />
          </div>
          <button onClick={() => removeItem(id)} className="product-card-cart__remove text-link-primary">Remove</button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCardCart);