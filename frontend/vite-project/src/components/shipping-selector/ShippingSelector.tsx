import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
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
  const [loading, setLoading] = useState(false);
  const [minDelayDone, setMinDelayDone] = useState(false);

  useEffect(() => {
    fetchAllOptions();
    const timer = setTimeout(() => setMinDelayDone(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedOption) {
      setError("Please select a shipping method before continuing.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/checkout/payment");
    } finally {
      setLoading(false);
    }
  };

 // Show loading spinner if no options are available or if minimum delay is not done
  if (!allShippingOptions.length || !minDelayDone) {
    return (
      <div className="spinner-with-text">
        <ClipLoader size={32} color="#22c55e" />
        <span className="spinner-message">Loading shipping options...</span>
      </div>
    );
  }

  return (
    <section className="section-wrapper">
      <form className="shipping-options" onSubmit={handleSubmit}>
        {allShippingOptions.map((option) => (
          <ShippingOptionCard key={option.id} option={option} />
        ))}

        {error && <p className="error-message">{error}</p>}

        <div className="continue-container">
          {loading ? (
            <div className="spinner-center">
              <ClipLoader size={32} color="#22c55e" />
            </div>
          ) : (
            <button
              type="submit"
              className="button-primary submit-button"
              disabled={loading}
            >
              Continue to payment
            </button>
          )}
        </div>
      </form>
    </section>
  );
};
