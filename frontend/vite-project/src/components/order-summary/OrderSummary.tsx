import { Link } from "react-router-dom";
import { useCartTotal } from "../../stores/cartStore";
import "./OrderSummary.css";
import { GetAllOptions } from "../../types/shippingOptionTypes";

type OrderSummaryProps = {
  showButton?: boolean;
  refTotal?: number;
  shippingOption?: GetAllOptions[number] | null;
};

export const OrderSummary: React.FC<OrderSummaryProps> = ({ showButton = true, refTotal, shippingOption }) => {
  const cartTotal = useCartTotal();

  const selectedShipping = shippingOption ?? null;

  const subtotal = refTotal ?? cartTotal ?? 0;
  const shippingCost = selectedShipping ? Number(selectedShipping.price) : 0;
  const finalTotal = subtotal + shippingCost;
  console.log("Selected shipping option in OrderSummary:", selectedShipping)

  return (
    <div className="order-summary-box">
      <h4>Order Summary</h4>
      <div className="subtotal">
        <div className="subtotal__label">Subtotal</div>
        <div className="total__figure">{subtotal} kr</div>
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
      {showButton && <Link to="/checkout/shipping" className="button-primary continue">Continue to shipping</Link>}
    </div>
  );
};
