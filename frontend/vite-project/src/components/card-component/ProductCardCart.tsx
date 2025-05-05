import { useEffect, useState } from 'react';
import { ProductCardProps } from '../../types/types';
import './productCardCart.css';

const ProductCardCart: React.FC<ProductCardProps> = ({
  imageUrl,
  seedName,
  price,
  quantity,
  onQuantityChange,
  onRemove,
  showQuantityControls = true,
}) => {
  const [counter, setCounter] = useState(quantity);

  useEffect(() => {
    setCounter(quantity);
  }, [quantity]);

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
        <h4 className="product-card-cart__title">{seedName}</h4>
        <div className="product-card-cart__actions">

          {/* Quantity controls */}
          {showQuantityControls ? (
            <div className="product-card-cart__quantity">
              <button onClick={handleDecrement} disabled={counter <= 0}>-</button>
              <span>{counter}</span>
              <button onClick={handleIncrement}>+</button>
            </div>
          ) : (
            // If showQuantityControls is false, display quantity text
            <p className="product-card-checkout__quantity-text">Quantity: {counter}</p>
          )}

        </div>
        <h4 className="product-card-cart__price">{(price * counter).toFixed(2)}Kr</h4>
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
