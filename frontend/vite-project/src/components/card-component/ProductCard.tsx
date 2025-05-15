import { ProductCardProps } from "../../types/types";
import "./productCard.css";
import { useCartActions } from "../../stores/cartStore";
import { memo } from "react";
import { QuantityControl } from "../quantity-control/QuantityControl";
const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const { image_url, product_name, price, id } = item;

  const { addItem } = useCartActions();

  const handleAddToCart = () => {
    const tempItem = { ...item, quantity: 1 };
    addItem(tempItem);
  };

  return (
    <section className="product-card">
      <div className="product-card__image-box">
        <img
          src={image_url}
          alt={product_name}
          className="product-card__img"
        />
      </div>
      <div className="product-card__details">
        <div className="name-price">
          <h5>{product_name}</h5>
          <p className="product-card__price">{price.toFixed(2)}Kr</p>
      </div>
      <div className="product-card__actions">
        <QuantityControl
          cartId={id}
          fallbackButton={
            <button
              className="button-primary"
              onClick={() => handleAddToCart()}
            >
              Add to Cart
            </button>
          }
        />
      </div>
        </div>
    </section>
  );
};

export default memo(ProductCard);
