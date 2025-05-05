import { useState, useEffect } from 'react';
import { ProductCardProps } from '../../types/types';
import './productCard.css';

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  seedName,
  price,
  quantity,
  onQuantityChange,
  onAddToCart
}) => {
  const [counter, setCounter] = useState(quantity);

  // Keep the quantity updated if the parent changes it
  useEffect(() => {
    setCounter(quantity);
  }, [quantity]);

  // Prevent going below 0
  const handleDecrement = () => {
    const newCount = Math.max(counter - 1, 0);
    setCounter(newCount);
    onQuantityChange?.(newCount);  // Notify parent component of the change
  };

  const handleIncrement = () => {
    const newCount = counter + 1;
    setCounter(newCount);
    onQuantityChange?.(newCount);  // Notify parent component of the change
  };

  const handleAddToCart = () => {
    onAddToCart?.(counter);  // Pass the quantity to the parent
  };

  return (
    <section className="product-card">
      <div className="product-card__image">
        <img src={imageUrl} alt={seedName} className="object-cover w-full h-full" />
      </div>
      <div className="product-card__content">
        <div className="product-card__listing">
        <h5 className="product-card__title">{seedName}</h5>
        <p className="product-card__price">{price.toFixed(2)}Kr</p>
        </div>
      <div className="product-card__actions">
        <div className="product-card__quantity">
          <button onClick={handleDecrement} disabled={counter <= 0}>-</button>
          <span>{counter}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
        <button className="product-card__add" onClick={handleAddToCart}>Add to Cart</button>
      </div>
      </div>
    </section>
  );
};

export default ProductCard;
