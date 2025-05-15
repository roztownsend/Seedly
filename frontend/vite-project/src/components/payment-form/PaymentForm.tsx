import { useState } from "react";
import { usePaymentStore } from "../../stores/paymentStore";
import { ValidationRule } from "../../types/paymentFormTypes";
import paypalIcon from '../../assets/image/paypal.svg';
import applepayIcon from '../../assets/image/applepay.svg';

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
        <section className="p-6">
            <div className="max-w-md mx-auto">
                <p className="text-lg font-semibold mb-4">Payment Details</p>

                {/* Payment form fields */}
                <form className="flex flex-col space-y-4 p-4" onSubmit={handleSubmit}>
                    {/* Cardholder Name */}
                    <div>
                        <input
                            className="border border-black w-full h-10 pl-4"
                            type="text"
                            placeholder="Cardholder Name"
                            value={formData.cardholderName}
                            onChange={(e) => updateFormField("cardholderName", e.target.value)}
                        />
                        {errors.cardholderName && <p className="text-sm text-red-600">{errors.cardholderName}</p>}
                    </div>

                    {/* Card Number */}
                    <div>
                        <input
                            className="border border-black w-full h-10 pl-4"
                            type="text"
                            inputMode="numeric"
                            placeholder="Card Number"
                            value={formData.cardNumber}
                            onChange={(e) => updateFormField("cardNumber", formatCardNumber(e.target.value))}
                        />
                        {errors.cardNumber && <p className="text-sm text-red-600">{errors.cardNumber}</p>}
                    </div>

                    {/* Expiration and CVC */}
                    <div className="flex justify-between gap-2">
                        {/* Month */}
                        <div className="w-1/3">
                            <select
                                className="border border-black w-full h-10 pl-2"
                                value={formData.expMonth}
                                onChange={(e) => updateFormField("expMonth", e.target.value)}
                            >
                                <option value="">Month</option>
                                {[...Array(12)].map((_, i) => (
                                    <option key={i} value={(i + 1).toString().padStart(2, "0")}>{(i + 1).toString().padStart(2, "0")}</option>
                                ))}
                            </select>
                            {errors.expMonth && <p className="text-sm text-red-600">{errors.expMonth}</p>}
                        </div>

                        {/* Year */}
                        <div className="w-1/3">
                            <select
                                className="border border-black w-full h-10 pl-2"
                                value={formData.expYear}
                                onChange={(e) => updateFormField("expYear", e.target.value)}
                            >
                                <option value="">Year</option>
                                {[...Array(10)].map((_, i) => {
                                    const year = new Date().getFullYear() + i;
                                    return <option key={year} value={year}>{year}</option>;
                                })}
                            </select>
                            {errors.expYear && <p className="text-sm text-red-600">{errors.expYear}</p>}
                        </div>

                        {/* CVC */}
                        <div className="w-1/3">
                            <input
                                className="border border-black w-full h-10 pl-4"
                                type="text"
                                inputMode="numeric"
                                pattern="\d*"
                                placeholder="CVC"
                                value={formData.cvc}
                                onChange={(e) => updateFormField("cvc", handleNumericInput(e.target.value, 4))}
                            />
                            {errors.cvc && <p className="text-sm text-red-600">{errors.cvc}</p>}
                        </div>
                    </div>

                    {/* Save card checkbox (currently disabled) */}
                    <div className="flex items-center gap-2 opacity-50 cursor-not-allowed">
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
                    <button type="submit" className="bg-black text-white py-2 w-full">
                        Pay with card
                    </button>

                    {/* Alternative payment methods */}
                    <div className="flex gap-2 mb-4">
                        <button className="border border-black px-4 py-2 flex-1 flex justify-center items-center gap-2">
                            <img src={applepayIcon} alt="Apple Pay" className="h-6 w-auto" />
                        </button>
                        <button className="border border-black px-4 py-2 flex-1 flex justify-center items-center gap-2">
                            <img src={paypalIcon} alt="PayPal" className="h-6 w-auto" />
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default PaymentForm;
