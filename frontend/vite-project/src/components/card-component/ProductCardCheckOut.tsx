import { useState, useEffect } from 'react';
import { ProductCardProps } from '../../types/types';
import './productCardCartCheckOut.css';

const ProductCardCheckOut: React.FC<ProductCardProps> = ({
  imageUrl,
  seedName,
  price,
  quantity,
  onQuantityChange
}) => {
  const [counter, setCounter] = useState(quantity);

  useEffect(() => {
    onQuantityChange?.(counter);
  }, [counter, onQuantityChange]);

  return (
    <section className="product-card">
      <div className="product-card__image">
        <img src={imageUrl} alt={seedName} className="object-cover w-full h-full" />
      </div>
      <div className="product-card__details">
        <h2 className="product-card__title">{seedName}</h2>
        <p className="product-card__quantity-text">Quantity: {counter}</p>
        <h2 className="product-card__price">{price.toFixed(2)}Kr</h2>
      </div>
      <button className="product-card__remove">Remove</button>
    </section>
  );
};

export default ProductCardCheckOut;
