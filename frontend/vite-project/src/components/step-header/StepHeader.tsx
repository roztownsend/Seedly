import React from "react";
//import './stepHeader.css';

type Step = "Address" | "Shipping" | "Payment";

type StepHeaderProps = {
  currentStep: Step;
};

const StepHeader: React.FC<StepHeaderProps> = ({ currentStep }) => {
  const steps: Step[] = ["Address", "Shipping", "Payment"];

  return (
    <section className="px-6 py-4">
      <h3 className="mb-3">Checkout</h3>
      <div className="flex flex-row items-center justify-start gap-4 text-sm text-gray-600">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <span className={`text-lg text-gray-400 whitespace-nowrap ${currentStep === step ? "font-bold text-black" : ""}`}>
              {step}
            </span>
            {index < steps.length - 1 && <span className="w-6 h-0.5 bg-gray-300 inline-block align-middle"></span>}
          </React.Fragment>
        ))}
      </div>
      
    </section>
  );
};

export default StepHeader;
