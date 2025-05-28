import { Link } from "react-router-dom";
import { useCartTotal } from "../../stores/cartStore";
import "./OrderSummary.css";
import { useSelection } from "../../stores/shippingOptionStore";

type OrderSummaryProps = {
  showButton?: boolean;
  refTotal?: number;
};

export const OrderSummary: React.FC<OrderSummaryProps> = ({ showButton = true, refTotal }) => {
  const cartTotal = useCartTotal();

  const selectedShipping = useSelection();

  const subtotal = refTotal ?? cartTotal ?? 0;
  const shippingCost = selectedShipping ? Number(selectedShipping.price) : 0;
  const finalTotal = subtotal + shippingCost;

  return (
    <div className="order-summary-box">
      <h4>Order Summary</h4>
      <div className="subtotal">
        <div className="subtotal__label">Subtotal</div>
        <div className="total__figure">{refTotal ? refTotal : cartTotal} kr</div>
      </div>
      <div className="shipping">
        <div className="shipping__label">Shipping</div>
        <div className="shipping__figure--next-step">
          {selectedShipping ? `${shippingCost} kr` : "Calculated at next step"}
        </div>
      </div>
      <div className="total">
        <div className="total__label">Total</div>
        <div className="total__figure">{finalTotal} kr</div>
      </div>
      {showButton && <Link to="/checkout/shipping" className="button-primary continue">Continue to checkout</Link>}
    </div>
  );
};