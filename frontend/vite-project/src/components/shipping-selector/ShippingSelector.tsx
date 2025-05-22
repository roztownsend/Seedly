import { useEffect } from "react";
import "./shippingSelector.css";
import {
  useAllShippingOptions,
  useShippingOptionsActions,
} from "../../stores/shippingOptionStore";
import ShippingOptionCard from "./ShippingOptionCard";
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
    </form>
  );
};
