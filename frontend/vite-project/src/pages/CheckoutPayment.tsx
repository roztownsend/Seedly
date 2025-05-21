import { useEffect } from "react";
import { useCartStore } from "../stores/cartStore";
import { useShippingStore } from "../stores/shippingStore";
import { useFormData } from "../stores/paymentStore";
import ProductCardCartMobile from "../components/card-component/ProductCardCartMobile";
import { OrderSummary } from "../components/order-summary/OrderSummary";

const CheckoutPayment = () => {
    const { cartItems, calculateCartTotal } = useCartStore();
    const { formData: shippingFormData } = useShippingStore();
    const paymentFormData = useFormData();

    useEffect(() => {
        calculateCartTotal();
    }, [cartItems]);

    const maskedCard = paymentFormData.cardNumber?.slice(-4) || "****";

    return (
        <section className="container-wrapper">
        {/* Confirmation Message */}
        <div className="section-heading">
            <h1 className="h2">Thank you for your order!</h1>
            <p>You should receive a confirmation email shortly.</p>
        </div>

        {/* Main Content */}
        <div className="layout-flex">
            {/* Order Items */}
            <div className="content-block">
            <h4>Order Summary</h4>
            <div className="vertical-stack">
                {cartItems.map((item) => (
                <div className="card-wrapper" key={item.id}>
                    <ProductCardCartMobile item={item} showQuantity={false} showRemove={false}/>
                </div>
                ))}
            </div>
            </div>

            {/* Summary + Info */}
            <div className="content-block">
            <OrderSummary showLink={false} />

            {/* Shipping Info */}
            <div className="vertical-stack">
                <h4>Shipping Information</h4>
                <ul className="info-list">
                <li><strong>Name:</strong> {shippingFormData.name}</li>
                <li><strong>Email:</strong> {shippingFormData.email}</li>
                <li><strong>Address:</strong> {shippingFormData.address}</li>
                <li><strong>Apartment:</strong> {shippingFormData.apartment}</li>
                <li><strong>City & Postal Code:</strong> {shippingFormData.city} - {shippingFormData.postalCode}</li>
                </ul>
            </div>

            {/* Payment Info */}
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
