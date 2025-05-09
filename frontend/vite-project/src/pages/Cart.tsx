import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCardCartMobile from "../components/card-component/ProductCardCartMobile";
import ProductCardCart from "../components/card-component/ProductCardCart";
import { OrderSummary } from "../components/order-summary/OrderSummary";
import { useProductsStore } from "../stores/productsStore";
import { useCartStore } from "../stores/cartStore";
import "./page-styles/cart.css";

const Sample = () => {
  const { cartItems, cartTotal, calculateCartTotal } = useCartStore();
  const { productList } = useProductsStore();
  useEffect(() => {
    calculateCartTotal();
    console.log(cartItems);
  }, [cartItems]);

  return (
    <div className="cart">
      <div className="cart-sections">
      <div className="header">
        <h1 className="h3">Your Cart</h1>
        <p>Not ready to checkout? 
          <Link to="/seeds" className="header-link">
            Continue shopping</Link>.
        </p>
      </div>
        <section className="cart-items">
          <div className="cart-items__list">
            {cartItems.map((item) => {
              return (
                <div className="list-wrapper">
                <ProductCardCart key={item.id} item={item} /> 
                </div>
              );
            })}
          </div>
        </section>
        <section className="order-summary">
          <OrderSummary />
      </section>
      </div>
    </div>
  );
};

export default Sample;
