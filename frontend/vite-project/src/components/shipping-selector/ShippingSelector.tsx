import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./shippingSelector.css";
import {
  useAllShippingOptions,
  useShippingOptionsActions,
  useSelectedShippingOption,
} from "../../stores/shippingOptionStore";
import ShippingOptionCard from "./ShippingOptionCard";

export const ShippingSelector: React.FC = () => {
  const allShippingOptions = useAllShippingOptions();
  const { fetchAllOptions } = useShippingOptionsActions();
  const selectedOption = useSelectedShippingOption();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllOptions();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedOption) {
      setError("Please select a shipping method before continuing.");
      return;
    }

    setError("");
    navigate("/checkout/payment");
  };

  return (
    <section className="section-wrapper">
      <form className="shipping-options" onSubmit={handleSubmit}>
        {allShippingOptions.map((option) => (
          <ShippingOptionCard key={option.id} option={option} />
        ))}

        {error && <p className="error-message">{error}</p>}

        <div className="continue-container">
          <button type="submit" className="button-primary submit-button">
            Continue to payment
          </button>
        </div>
      </form>
    </section>
  );
};
