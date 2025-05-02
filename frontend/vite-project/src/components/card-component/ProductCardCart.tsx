import { useState } from 'react';
import { ProductCardProps } from '../../types/types';
import './productCardCart.css';

const ProductCardCart: React.FC<ProductCardProps> = ({
  imageUrl,
  seedName,
  price,
  quantity,
  onQuantityChange,
  onRemove
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
    <section className="product-card-cart">
      <div className="product-card-cart__image">
        <img src={imageUrl} alt={seedName} className="object-cover w-full h-full" />
      </div>
      <div className="product-card-cart__details">
        <h2 className="product-card-cart__title">{seedName}</h2>
        <div className="product-card-cart__actions">
          <div className="product-card-cart__quantity">
            <button onClick={handleDecrement} disabled={counter <= 0}>-</button>
            <span>{counter}</span>
            <button onClick={handleIncrement}>+</button>
          </div>
        </div>
        <h2 className="product-card-cart__price">{(price * counter).toFixed(2)}Kr</h2>
      </div>
      <button 
        className="product-card-cart__remove"
        onClick={onRemove}
      >
        Remove
      </button>
    </section>
  );
};

export default ProductCardCart;
