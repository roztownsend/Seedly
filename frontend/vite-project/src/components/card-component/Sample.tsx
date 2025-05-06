import { useState } from 'react';
import ProductCard from "../card-component/ProductCard";
import ProductCardCartMobile from './ProductCardCartMobile';
import ProductCardCart from './ProductCardCart';

const Sample = () => {
    const productCatalog = [
        {
          id: 1,
          imageUrl: "https://images.pexels.com/photos/54082/carrots-vegetables-food-orange-54082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          seedName: "Carrot",
          price: 10,
        },
        {
          id: 2,
          imageUrl: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg",
          seedName: "Tomato",
          price: 12,
        },
        {
          id: 3,
          imageUrl: "https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg",
          seedName: "Zucchini",
          price: 8,
        },
    ];
      

  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);

  const handleAddToCart = (id: number, quantity: number) => {
    if (quantity === 0) return;

    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id, quantity }];
    });
  };

  const handleRemove = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
   if(newQuantity === 0 ){
    handleRemove(id)
   }
     setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getProductData = (id: number) =>
    productCatalog.find(product => product.id === id);

  return (
    <>
      <h2>Product List Desktop</h2>
      {productCatalog.map(product => (
        <ProductCard
          key={product.id}
          imageUrl={product.imageUrl}
          seedName={product.seedName}
          price={product.price}
          quantity={1}
          onAddToCart={(qty) => handleAddToCart(product.id, qty)}
          
        />
      ))}

      <h2>Cart Desktop</h2>
      {cart.map(item => {
        const product = getProductData(item.id);
        if (!product) return null;
        return (
          <ProductCardCart
            key={`cart-${item.id}`}
            imageUrl={product.imageUrl}
            seedName={product.seedName}
            price={product.price}
            quantity={item.quantity}
            onQuantityChange={(qty) => handleQuantityChange(item.id, qty)}
            onRemove={() => handleRemove(item.id)}
            showQuantityControls={true}
          />
        );
      })}

      <h2>Checkout Desktop</h2>
      {cart.map(item => {
        const product = getProductData(item.id);
        if (!product) return null;
        return (
          <ProductCardCart
            key={`checkout-${item.id}`}
            imageUrl={product.imageUrl}
            seedName={product.seedName}
            price={product.price}
            quantity={item.quantity}
            onQuantityChange={(qty) => handleQuantityChange(item.id, qty)}
            onRemove={() => handleRemove(item.id)}
            showQuantityControls={false}
          />
        );
      })}

      <h2>Cart Mobile</h2>
      {cart.map(item => {
        const product = getProductData(item.id);
        if (!product) return null;
        return (
          <ProductCardCartMobile
            key={`cart-${item.id}`}
            imageUrl={product.imageUrl}
            seedName={product.seedName}
            price={product.price}
            quantity={item.quantity}
            onQuantityChange={(qty) => handleQuantityChange(item.id, qty)}
            onRemove={() => handleRemove(item.id)}
            showQuantityControls={true}
          />
        );
      })}

      <h2>Checkout mobile</h2>
      {cart.map(item => {
        const product = getProductData(item.id);
        if (!product) return null;
        return (
          <ProductCardCartMobile
            key={`checkout-${item.id}`}
            imageUrl={product.imageUrl}
            seedName={product.seedName}
            price={product.price}
            quantity={item.quantity}
            onQuantityChange={(qty) => handleQuantityChange(item.id, qty)}
            onRemove={() => handleRemove(item.id)}
            showQuantityControls={false}
          />
        );
      })}
    </>
  );
};

export default Sample;
