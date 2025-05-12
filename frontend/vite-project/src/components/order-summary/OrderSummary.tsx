import { useCartStore } from "../../stores/cartStore";
import "./OrderSummary.css";

export const OrderSummary: React.FC = () => {
    const { cartTotal } = useCartStore();

    return (
        <div className="order-summary-box">
            <h4>Order Summary</h4>
            <div className="subtotal">
                <div className="subtotal__label">Subtotal</div>
                <div className="subtotal__figure">{cartTotal} kr</div>
            </div>
            <div className="shipping">
                <div className="shipping__label">Shipping</div>
                <div className="shipping__figure--next-step">Calculated at next step</div>
                 {/* todo: logic to show shipping based on stage of flow */}
            </div>
            <div className="total">
                <div className="total__label">Subtotal</div>
                <div className="total__figure">{cartTotal} kr</div>
                {/* todo: cart total + shipping */}
            </div>
            <button className="button-primary continue">Continue to checkout</button>
        </div>

    )
}

