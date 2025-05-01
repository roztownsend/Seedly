import { useState } from 'react';
import { ProductCardProps } from '../../types/types';
import './productCardCart.css';

const ProductCardCart: React.FC<ProductCardProps> = ({
  imageUrl,
  seedName,
  price,
  quantity,
  onQuantityChange
}) => {
  const [counter, setCounter] = useState(quantity);

  const handleDecrement = () => {
    const newCount = Math.max(counter - 1, 0);
    setCounter(newCount);
    onQuantityChange?.(newCount);
  };

  const handleIncrement = () => {
    const newCount = counter + 1;
    setCounter(newCount);
    onQuantityChange?.(newCount);
  };

  return (
    <section className="product-card">
      <div className="product-card__image">
        <img src={imageUrl} alt={seedName} className="object-cover w-full h-full" />
      </div>
      <div className="product-card__details">
        <h2 className="product-card__title">{seedName}</h2>
          <div className="product-card__actions">
            <div className="product-card__quantity">
              <button onClick={handleDecrement} disabled={counter <= 0}>-</button>
              <span>{counter}</span>
              <button onClick={handleIncrement}>+</button>
            </div>
          </div>
        <h2 className="product-card__price">{price.toFixed(2)}Kr</h2>
      </div>
      <button className="product-card__remove">Remove</button>
    </section>
  );
};

export default ProductCardCart;
