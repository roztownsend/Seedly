import { useState } from "react";
import { ProductCardProps } from "../../types/types";
import "./productCard.css";
import { useCartStore } from "../../stores/cartStore";

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const [counter, setCounter] = useState(1);
  const { imageUrl, seedName, price } = item;
  const { addItem } = useCartStore();

  // Prevent going below 0
  const handleDecrement = () => {
    setCounter((prevState) => (prevState - 1 === 0 ? 1 : prevState - 1));
  };

  const handleIncrement = () => {
    const newCount = counter + 1;
    setCounter(newCount);
  };

  const handleAddToCart = () => {
    const tempItem = { ...item, quantity: counter };
    addItem(tempItem);
    setCounter(1);
  };

  return (
    <section className="product-card">
      <div className="product-card__image">
        <img
          src={imageUrl}
          alt={seedName}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="product-card__details">
        <h5>{seedName}</h5>
        <p className="product-card__price">{(price * counter).toFixed(2)}Kr</p>
      </div>
      <div className="product-card__actions">
        <div className="product-card__quantity">
          <button onClick={handleDecrement} disabled={counter <= 0}>
            -
          </button>
          <span>{counter}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
        <button className="product-card__add" onClick={() => handleAddToCart()}>
          Add to Cart
        </button>
      </div>
    </section>
  );
};

export default ProductCard;
