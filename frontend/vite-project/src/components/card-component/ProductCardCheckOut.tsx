import { useState, useEffect } from 'react';
import { ProductCardProps } from '../../types/types';
import './productCardCartCheckOut.css';

const ProductCardCheckOut: React.FC<ProductCardProps> = ({
  imageUrl,
  seedName,
  price,
  quantity,
  onQuantityChange,
  onRemove
}) => {
  const [counter, setCounter] = useState(quantity);

  useEffect(() => {
    onQuantityChange?.(counter);
  }, [counter, onQuantityChange]);

  return (
    <section className="product-card-checkout">
      <div className="product-card-checkout__image">
        <img src={imageUrl} alt={seedName} className="object-cover w-full h-full" />
      </div>
      <div className="product-card-checkout__details">
        <h2 className="product-card-checkout__title">{seedName}</h2>
        <p className="product-card-checkout__quantity-text">Quantity: {counter}</p>
        <h2 className="product-card-checkout__price">{(price * counter).toFixed(2)}Kr</h2>
      </div>
      <button 
        className="product-card-checkout__remove"
        onClick={onRemove}
      >
        Remove
      </button>
    </section>
  );
};

export default ProductCardCheckOut;
