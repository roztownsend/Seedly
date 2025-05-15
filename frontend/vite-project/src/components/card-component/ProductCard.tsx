import { ProductCardProps } from "../../types/types";
import "./productCard.css";
import { useCartItem, useCartActions } from "../../stores/cartStore";

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const { image_url, product_name, price, id } = item;

  const cartItem = useCartItem(id);
  const { addItem, updateQuantity } = useCartActions();

  const handleDecrement = () => {
    updateQuantity(id, 1, "decrement");
  };
  const handleAddToCart = () => {
    const tempItem = { ...item, quantity: 1 };
    addItem(tempItem);
  };

  return (
    <section className="product-card">
      <div className="product-card__image">
        <img
          src={image_url}
          alt={product_name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="product-card__details">
        <h5>{product_name}</h5>
        <p className="product-card__price">{price.toFixed(2)}Kr</p>
      </div>
      <div className="product-card__actions">
        {cartItem?.quantity ? (
          <div className="product-card__quantity">
            <button onClick={() => handleDecrement()}>-</button>
            <span>{cartItem?.quantity}</span>
            <button onClick={() => updateQuantity(id, 1, "increment")}>
              +
            </button>
          </div>
        ) : (
          <button className="button-primary" onClick={() => handleAddToCart()}>
            Add to Cart
          </button>
        )}
      </div>
    </section>
  );
};

export default ProductCard;
