import { useState, useEffect } from "react";
import ProductCard from "../card-component/ProductCard";
import ProductCardCartMobile from "./ProductCardCartMobile";
import ProductCardCart from "./ProductCardCart";
import { useProductsStore } from "../../stores/productsStore";
import { useCartStore } from "../../stores/cartStore";

const Sample = () => {
  const { cartItems, cartTotal, calculateCartTotal } = useCartStore();
  const { productList } = useProductsStore();
  useEffect(() => {
    // Need some condition so it doesn't fire on first render, but too lazy to fix it now.
    calculateCartTotal();
    console.log(cartItems);
    console.log(productList);
  }, [cartItems]);

  return (
    <>
      <div>
        <div className="flex gap-6 p-6">
          {productList.slice(0, 5).map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
        {/* <h2>Cart total: {cartTotal}Kr</h2>
        <div className="flex">
          {cartItems.map((item) => {
            return <ProductCardCart key={item.id} item={item} />;
          })}
        </div> */}
      </div>
      {/* <div className="flex">
        {cartItems.map((item) => {
          return <ProductCardCart key={item.id} item={item} />;
        })}
      </div>
      <div className="flex">
        {cartItems.map((item) => {
          return <ProductCardCartMobile key={item.id} item={item} />;
        })}
      </div>
      <div className="flex">
        {cartItems.map((item) => {
          return <ProductCardCartMobile key={item.id} item={item} />;
        })}
      </div> */}
    </>
  );
};

export default Sample;
