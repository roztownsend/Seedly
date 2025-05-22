import { Link } from "react-router-dom";
import ProductCardCart from "../components/card-component/ProductCardCart";
import { OrderSummary } from "../components/order-summary/OrderSummary";
import { LoginCta } from "../components/login-cta/LoginCta";
import { useCartUniqueItems, useCartItemIds } from "../stores/cartStore";
import { ShippingSelector } from "../components/shipping-selector/ShippingSelector";
import "./page-styles/cart.css";

const Cart: React.FC = () => {
  const cartUniqueItems = useCartUniqueItems();
  const cartItemsIds = useCartItemIds();

  if (cartUniqueItems === 0) {
    return (
      <div className="cart-header--nothing">
        <h1 className="h3">Your Cart</h1>
        <div className="cart-header--nothing__no-items">
          <p className="no-items">You currently have no items in your cart.</p>
          <p className="no-items">
            Why not{" "}
            <Link to="/seeds" className="text-link-primary">
              check out our selection of seeds
            </Link>{" "}
            and add something?
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="cart">
        <div className="cart-sections">
          <div className="cart-header">
            <h1 className="h3">Your Cart</h1>
            <div className="cart-header__not-ready">
              Not ready to checkout?{" "}
              <Link to="/seeds" className="text-link-primary">
                Continue shopping
              </Link>
              .
            </div>
          </div>
          <section className="cart-items">
            <div className="cart-items__list">
              {cartItemsIds.map((id) => {
                return (
                  <div key={id} className="list-wrapper">
                    <ProductCardCart id={id} />
                  </div>
                );
              })}
            </div>
          </section>
          <section className="order-summary">
            <OrderSummary />
            <LoginCta />
          </section>
        </div>
      </div>
    );
  }
};

export default Cart;
