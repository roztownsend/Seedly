import React from "react";
import "./StepHeader.css";

type Step = "Address" | "Shipping" | "Payment";

type StepHeaderProps = {
  currentStep: Step;
};

const StepHeader: React.FC<StepHeaderProps> = ({ currentStep }) => {
  const steps: Step[] = ["Address", "Shipping", "Payment"];

  return (
    <section className="step-header-container">
      <h3 className="step-header-title">Checkout</h3>

      <div className="step-header-wrapper">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            <span
              className={`step-label ${
                currentStep === step ? "step-label-active" : ""
              }`}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <div
                className="step-line"
              ></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StepHeader;
