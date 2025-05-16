import { useState } from "react";
import { usePaymentStore } from "../../stores/paymentStore";
import { ValidationRule } from "../../types/paymentFormTypes";
import paypalIcon from '../../assets/image/paypal.svg';
import applepayIcon from '../../assets/image/applepay.svg';
import "../payment-form/PaymentForm.css"; 

const PaymentForm = () => {
    const { formData, updateFormField } = usePaymentStore();
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Format card number with spaces (e.g., 1234 5678 9012 3456)
    const formatCardNumber = (value: string) => {
        return value
            .replace(/\D/g, "")
            .slice(0, 16)
            .replace(/(.{4})/g, "$1 ")
            .trim();
    };

    // Validation rules for each input field
    const validationRules: ValidationRule[] = [
        ["cardholderName", (v) => !!v.trim(), "Cardholder name is required."],
        ["cardNumber", (v) => /^\d{16}$/.test(v.replace(/\s/g, "")), "Card number must be 16 digits."],
        ["expMonth", (v) => !!v, "Month required."],
        ["expYear", (v) => !!v, "Year required."],
        ["cvc", (v) => /^\d{3,4}$/.test(v), "CVC must be 3 or 4 digits."],
    ];

    // Run all validations and set errors
    const validate = () => {
        const newErrors: Record<string, string> = {};
        validationRules.forEach(([key, test, message]) => {
            const value = formData[key];
            if (!test(value as string)) newErrors[key] = message;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        console.log("Payment submitted", formData);
    };

    // Allow only numeric input with a max length
    const handleNumericInput = (value: string, maxLength: number) =>
        value.replace(/\D/g, "").slice(0, maxLength);

    return (
        <section className="payment-section">
            <div className="payment-container">
                {/* Title */}
                <p className="h3 mb-4">Payment Details</p>

                {/* Payment Form */}
                <form className="payment-form" onSubmit={handleSubmit}>
                    {/* Cardholder Name */}
                    <div>
                        <input
                            className="payment-input"
                            type="text"
                            placeholder="Cardholder Name"
                            value={formData.cardholderName}
                            onChange={(e) => updateFormField("cardholderName", e.target.value)}
                        />
                        {errors.cardholderName && <p className="payment-error">{errors.cardholderName}</p>}
                    </div>

                    {/* Card Number */}
                    <div>
                        <input
                            className="payment-input"
                            type="text"
                            inputMode="numeric"
                            placeholder="Card Number"
                            value={formData.cardNumber}
                            onChange={(e) => updateFormField("cardNumber", formatCardNumber(e.target.value))}
                        />
                        {errors.cardNumber && <p className="payment-error">{errors.cardNumber}</p>}
                    </div>

                    {/* Expiration Date and CVC */}
                    <div className="payment-exp-group">
                        {/* Exp Month */}
                        <div className="w-1/3">
                            <select
                                className="payment-input"
                                value={formData.expMonth}
                                onChange={(e) => updateFormField("expMonth", e.target.value)}
                            >
                                <option value="">Month</option>
                                {[...Array(12)].map((_, i) => (
                                    <option key={i} value={(i + 1).toString().padStart(2, "0")}>{(i + 1).toString().padStart(2, "0")}</option>
                                ))}
                            </select>
                            {errors.expMonth && <p className="payment-error">{errors.expMonth}</p>}
                        </div>

                        {/* Exp Year */}
                        <div className="w-1/3">
                            <select
                                className="payment-input"
                                value={formData.expYear}
                                onChange={(e) => updateFormField("expYear", e.target.value)}
                            >
                                <option value="">Year</option>
                                {[...Array(10)].map((_, i) => {
                                    const year = new Date().getFullYear() + i;
                                    return <option key={year} value={year}>{year}</option>;
                                })}
                            </select>
                            {errors.expYear && <p className="payment-error">{errors.expYear}</p>}
                        </div>

                        {/* CVC */}
                        <div className="w-1/3">
                            <input
                                className="payment-input"
                                type="text"
                                inputMode="numeric"
                                pattern="\d*"
                                placeholder="CVC"
                                value={formData.cvc}
                                onChange={(e) => updateFormField("cvc", handleNumericInput(e.target.value, 4))}
                            />
                            {errors.cvc && <p className="payment-error">{errors.cvc}</p>}
                        </div>
                    </div>

                    {/* Save card (disabled for now) */}
                    <div className="payment-savecard-disabled">
                        <input
                            type="checkbox"
                            id="saveCard"
                            disabled
                            checked={formData.saveCard}
                            onChange={(e) => updateFormField("saveCard", e.target.checked)}
                        />
                        <label htmlFor="saveCard" className="text-sm">Save card data for future payments</label>
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="button-primary w-full">
                        Pay with card
                    </button>

                    {/* Alternative payment methods */}
                    <div className="flex gap-2 mb-4">
                        <button className="button-secondary flex-1">
                            <img src={applepayIcon} alt="Apple Pay" className="h-6 w-auto" />
                        </button>
                        <button className="button-secondary flex-1">
                            <img src={paypalIcon} alt="PayPal" className="h-6 w-auto" />
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default PaymentForm;
