import { useState } from "react";
import { useFormData, usePaymentActions } from "../../stores/paymentStore";
import { ValidationRule } from "../../types/paymentFormTypes";
import swishIcon from '../../assets/image/swish.svg';
import klarnaIcon from '../../assets/image/klarna.svg';
import "../payment-form/PaymentForm.css";
import { useNavigate } from "react-router-dom";
import valid from "card-validator";


const PaymentForm = () => {
    const formData = useFormData();
    const { updateFormField } = usePaymentActions();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [cardBrand, setCardBrand] = useState<string>("");
    const navigate = useNavigate();

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
        ["cardNumber", (v) => valid.number(v).isValid, "Card number is invalid."],
        ["expMonth", (v) => !!v, "Month required."],
        ["expYear", (v) => !!v, "Year required."],
        ["cvc", (v) => valid.cvv(v).isValid, "CVC is invalid."],
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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        updateFormField("paymentMethod", "card");
        navigate("/checkout/confirm");
    };

    // Allow only numeric input with a max length
    const handleNumericInput = (value: string, maxLength: number) =>
        value.replace(/\D/g, "").slice(0, maxLength);

    // Dummy handlers for Swish and Klarna
    const handleSwish = () => {
        updateFormField("paymentMethod", "swish");
        navigate("/checkout/confirm");
    };

    const handleKlarna = () => {
        updateFormField("paymentMethod", "klarna");
        navigate("/checkout/confirm");
    };

    // Detect card brand on input change
    const handleCardNumberChange = (value: string) => {
        const formatted = formatCardNumber(value);
        updateFormField("cardNumber", formatted);
        const result = valid.number(formatted);
        setCardBrand(result.card ? result.card.niceType : "");
    };

    return (
        <section className="payment-section">
            <div className="payment-form-container">
                {/* Title */}
                <h1 className="h4">Payment Details</h1>

                {/* Payment Form */}
                <form className="payment-form" onSubmit={handleSubmit}>
                    {/* Cardholder Name */}
                    <div>
                        <label htmlFor="cardHolderName" className="sr-only">Cardholder Name</label>
                        <input
                            className="payment-input"
                            type="text"
                            id="cardHolderName"
                            placeholder="Cardholder Name"
                            value={formData.cardholderName}
                            onChange={(e) => updateFormField("cardholderName", e.target.value)}
                        />
                        {errors.cardholderName && <p className="payment-error">{errors.cardholderName}</p>}
                    </div>

                    {/* Card Number + Brand */}
                    <div className="card-number-container">
                        <label htmlFor="cardNumber" className="sr-only">Card Number</label>
                        <input
                            className="payment-input pr-20"
                            type="text"
                            id="cardNumber"
                            inputMode="numeric"
                            placeholder="Card Number"
                            value={formData.cardNumber}
                            onChange={(e) => handleCardNumberChange(e.target.value)}
                        />
                        {cardBrand && (
                            <span className="card-brand-badge">
                                {cardBrand}
                            </span>
                        )}
                        {errors.cardNumber && <p className="payment-error">{errors.cardNumber}</p>}
                    </div>

                    {/* Expiration Date and CVC */}
                    <div className="payment-exp-group">
                        {/* Exp Month */}
                        <div className="w-1/3">
                            <label htmlFor="expMonth" className="sr-only"> Exp. Date</label>
                            <select
                                className="payment-input"
                                id="expMonth"
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
                            <label htmlFor="expYear" className="sr-only"> Exp. Year</label>
                            <select
                                className="payment-input"
                                id="expYear"
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
                            <label htmlFor="cvc" className="sr-only">CVC</label>
                            <input
                                className="payment-input"
                                type="text"
                                id="cvc"
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
                    <div className="payment-savecard-disabled" title="This option will be available soon.">
                        <label htmlFor="savecard" className="sr-only"></label>
                        <input
                            type="checkbox"
                            id="saveCard"
                            disabled
                            checked={formData.saveCard}
                            onChange={(e) => updateFormField("saveCard", e.target.checked)}
                        />
                        <label htmlFor="saveCard" className="text-sm">
                            Save card data for future payments
                        </label>
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="button-primary w-full">
                        Pay with card
                    </button>

                    <div className="payment-divider">
                        <span className="payment-divider-text">or pay with:</span>
                    </div>

                    <div className="payment-button-group">
                        <button
                            className="button-secondary__payment flex-1"
                            type="button"
                            onClick={handleSwish}
                        >
                            <img src={swishIcon} alt="Swish" className="h-8 w-auto mx-auto" />
                        </button>
                        <button
                            className="button-secondary__payment flex-1"
                            type="button"
                            onClick={handleKlarna}
                        >
                            <img src={klarnaIcon} alt="Klarna" className="h-8 w-auto mx-auto" />
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default PaymentForm;
