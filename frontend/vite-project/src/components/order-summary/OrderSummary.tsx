import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../stores/cartStore";
import "./OrderSummary.css";

export const OrderSummary = () => {
    const { cartTotal } = useCartStore();

    return (
        <div className="order-summary-box">
            <h4>Order Summary</h4>
            <div className="subtotal">
                <div className="subtotal__label">Subtotal</div>
                <div className="subtotal__figure">{cartTotal} kr</div>
            </div>
            <div className="shipping">
                <div className="subtotal__label">Shipping</div>
                <div className="subtotal__figure">Calculated at next step</div>
                 {/* todo: logic to show shipping based on stage of flow */}
            </div>
            <div className="total">
                <div className="subtotal__label">Subtotal</div>
                <div className="subtotal__figure">{cartTotal} kr</div>
                {/* todo: cart total + shipping */}
            </div>
            <button className="button-secondary continue">Continue to checkout</button>
        </div>

    )
}

