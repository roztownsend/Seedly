import { useState, useEffect } from 'react';
import { ProductCardProps } from '../../types/types';
import { QuantityControl } from '../quantity-control/QuantityControl';
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

  useEffect(() => {
    setCounter(quantity);
  }, [quantity]);

  const handleDecrement = () => {
    const newCount = Math.max(counter - 1, 0); // Prevent going below 0
    setCounter(newCount);
    onQuantityChange?.(newCount);
  };

  const handleIncrement = () => {
    const newCount = counter + 1;
    setCounter(newCount);
    onQuantityChange?.(newCount);
  };

  const handleAddToCart = () => {
    onAddToCart?.(counter);
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
        <QuantityControl
          counter={counter}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          disableDecrement={counter <= 0}
        />
          <button className="product-card__add" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
