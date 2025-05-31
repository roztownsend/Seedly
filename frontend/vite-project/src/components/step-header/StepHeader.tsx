import React from "react";
import './stepHeader.css';

type Step = "Address" | "Shipping" | "Payment";

type StepHeaderProps = {
  currentStep: Step;
};

const StepHeader: React.FC<StepHeaderProps> = ({ currentStep }) => {
  const steps: Step[] = ["Address", "Shipping", "Payment"];

  return (
    <section className="step-header-container">
      <h3 className="step-header-title">Checkout</h3>
      <div>
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <span className={`step-label ${currentStep === step ? "step-label-active" : ""}`}>
              {step}
            </span>
            {index < steps.length - 1 && <span className="step-line"></span>}
          </React.Fragment>
        ))}
      </div>
      
    </section>
  );
};

export default StepHeader;
