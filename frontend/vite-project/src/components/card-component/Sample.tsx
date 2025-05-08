import { useState, useEffect } from "react";
import ProductCard from "../card-component/ProductCard";
import ProductCardCartMobile from "./ProductCardCartMobile";
import ProductCardCart from "./ProductCardCart";

import { useCartStore } from "../../stores/cartStore";

const Sample = () => {
  const {
    cartItems,
    addItem,
    removeItem,
    cartTotal,
    calculateCartTotal,
    updateQuantity,
  } = useCartStore();

  const productCatalog = [
    {
      id: 1,
      imageUrl:
        "https://images.pexels.com/photos/54082/carrots-vegetables-food-orange-54082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      seedName: "Carrot",
      price: 10,
      quantity: 0,
    },
    {
      id: 2,
      imageUrl:
        "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg",
      seedName: "Tomato",
      price: 12,
      quantity: 0,
    },
    {
      id: 3,
      imageUrl:
        "https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg",
      seedName: "Zucchini",
      price: 8,
      quantity: 0,
    },
  ];

  useEffect(() => {
    // Need some condition so it doesn't fire on first render, but too lazy to fix it now.
    calculateCartTotal();
    console.log(cartItems);
  }, [cartItems]);

  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);

  const handleAddToCart = (id: number, quantity: number) => {
    const item = productCatalog.find((product) => product.id === id);
    if (!item) return;
    addItem(item, quantity);
  };

  const handleRemove = (id: number) => {
    removeItem(id);
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemove(id);
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getProductData = (id: number) =>
    productCatalog.find((product) => product.id === id);

  return (
    <>
      <div>
        <div className="flex">
          {productCatalog.map((product) => (
            <ProductCard
              key={product.id}
              imageUrl={product.imageUrl}
              seedName={product.seedName}
              price={product.price}
              id={product.id}
              quantity={1}
              onAddToCart={(qty) => handleAddToCart(product.id, qty)}
            />
          ))}
        </div>
        <h2>Cart total: {cartTotal}Kr</h2>
        <div className="flex">
          {cartItems.map((item) => {
            return (
              <ProductCardCart
                key={`cart-${item.id}`}
                imageUrl={item.imageUrl}
                seedName={item.seedName}
                price={item.price}
                quantity={item.quantity}
                id={item.id}
                onRemove={() => removeItem(item.id)}
                showQuantityControls={true}
              />
            );
          })}
        </div>
      </div>
      {cartItems.map((item) => {
        return (
          <ProductCardCart
            key={`checkout-${item.id}`}
            imageUrl={item.imageUrl}
            seedName={item.seedName}
            price={item.price}
            quantity={item.quantity}
            id={item.id}
            onQuantityChange={(qty) => updateQuantity(item.id, qty)}
            onRemove={() => removeItem(item.id)}
            showQuantityControls={false}
          />
        );
      })}

      {cart.map((item) => {
        const product = getProductData(item.id);
        if (!product) return null;
        return (
          <ProductCardCartMobile
            key={`cart-${item.id}`}
            imageUrl={product.imageUrl}
            seedName={product.seedName}
            price={product.price}
            id={item.id}
            quantity={item.quantity}
            onQuantityChange={(qty) => handleQuantityChange(item.id, qty)}
            onRemove={() => removeItem(item.id)}
            showQuantityControls={true}
          />
        );
      })}

      {cart.map((item) => {
        const product = getProductData(item.id);
        if (!product) return null;
        return (
          <ProductCardCartMobile
            key={`checkout-${item.id}`}
            imageUrl={product.imageUrl}
            seedName={product.seedName}
            price={product.price}
            id={item.id}
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
