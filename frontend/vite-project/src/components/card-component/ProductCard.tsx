import { ProductCardProps } from "../../types/types";
import "./productCard.css";
import { useCartStore } from "../../stores/cartStore";

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const { image_url, productName, price, id } = item;

  const { addItem, cartItems, updateQuantity, removeItem } = useCartStore();

  const existingItem = cartItems.find((cartItem) => cartItem.id === id);
  const initialQuantity = existingItem?.quantity ?? 1;

  const handleDecrement = () => {
    if (existingItem?.quantity && existingItem?.quantity - 1 <= 0) {
      removeItem(id);
      return;
    }
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
          alt={productName}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="product-card__details">
        <h5>{productName}</h5>
        <p className="product-card__price">{price.toFixed(2)}Kr</p>
      </div>
      <div className="product-card__actions">
        {existingItem?.quantity ? (
          <div className="product-card__quantity">
            <button onClick={() => handleDecrement()}>-</button>
            <span>{existingItem?.quantity}</span>
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
