import { useEffect, useRef } from "react";
import {
  useCartItems,
  useCartActions,
  useCartTotal,
} from "../stores/cartStore";
import { useShippingStore } from "../stores/shippingStore";
import { useShippingOptionsActions, useSelection } from "../stores/shippingOptionStore";
import { useFormData } from "../stores/paymentStore";
import ProductCardCartMobile from "../components/card-component/ProductCardCartMobile";
import { OrderSummary } from "../components/order-summary/OrderSummary";

const CheckoutPayment = () => {
  const cartItems = useCartItems();
  const { clearCart } = useCartActions();
  const cartTotal = useCartTotal();
  const { formData: shippingFormData, resetForm } = useShippingStore();

  const shippingOption = useSelection();
  const { reset: resetShippingOption } = useShippingOptionsActions();

  const lastShippingRef = useRef(shippingFormData);
  const lastShippingOptionRef = useRef(shippingOption);

  useEffect(() => {
    lastShippingRef.current = shippingFormData;
    clearCart();
    resetForm();

    resetShippingOption();
  }, []);

  const paymentFormData = useFormData();

  const lastOrderTotal = useRef(0);
  const lastOrderItemsRef = useRef<typeof cartItems>([]);

  useEffect(() => {
    if (cartItems.length > 0) {
      lastOrderTotal.current = cartTotal;
      lastOrderItemsRef.current = cartItems;
      clearCart();
    }
  }, [cartItems, cartTotal]);

  const maskedCard = paymentFormData.cardNumber?.slice(-4) || "****";

  return (
    <section className="container-wrapper">
      <div className="section-heading">
        <h1 className="h2">Thank you for your order!</h1>
        <p>You should receive a confirmation email shortly.</p>
      </div>

      <div className="layout-flex">
        <div className="content-block">
          <h4>Order Summary</h4>
          <div className="vertical-stack">
            {lastOrderItemsRef.current.map((item) => (
              <div className="card-wrapper" key={item.id}>
                <ProductCardCartMobile
                  id={item.id}
                  item={item}
                  showQuantity={false}
                  showRemove={false}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="content-block">
          <OrderSummary
            showButton={false}
            refTotal={lastOrderTotal.current}
            shippingOption={lastShippingOptionRef.current}
          />
          <div className="vertical-stack">
            <h4>Shipping Information</h4>
            <ul className="info-list">
              <li><strong>Name:</strong> {lastShippingRef.current.name}</li>
              <li><strong>Email:</strong> {lastShippingRef.current.email}</li>
              <li><strong>Address:</strong> {lastShippingRef.current.address}</li>
              <li><strong>Apartment:</strong> {lastShippingRef.current.apartment}</li>
              <li>
                <strong>City & Postal Code:</strong>{" "}
                {lastShippingRef.current.city} - {lastShippingRef.current.postalCode}
              </li>
            </ul>
          </div>

          <div className="vertical-stack">
            <h4>Payment Method</h4>
            <p>Card: **** **** **** {maskedCard}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPayment;
