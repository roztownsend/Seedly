import { useEffect } from "react";
import "./shippingSelector.css";
import {
  useAllShippingOptions,
  useShippingOptionsActions,
} from "../../stores/shippingOptionStore";
import ShippingOptionCard from "./ShippingOptionCard";
import { Link } from "react-router-dom";
export const ShippingSelector: React.FC = () => {
  const allShippingOptions = useAllShippingOptions();
  const { fetchAllOptions } = useShippingOptionsActions();

  useEffect(() => {
    fetchAllOptions();
  }, []);

  return (
    <form className="shipping-options">
      {allShippingOptions.map((option) => (
        <ShippingOptionCard key={option.id} option={option} />
      ))}
      <div>
          <button type="submit" className="button-primary submit-button">
            <Link to="/checkout/payment">Continue to payment</Link>
          </button>
      </div>
    </form>
  );
};
