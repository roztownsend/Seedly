import { useState } from "react";
import { usePaymentStore } from "../../stores/paymentStore";

const PaymentForm = () => {
    const { formData, updateFormField } = usePaymentStore();
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.cardholderName.trim()) newErrors.cardholderName = "Cardholder name is required.";
        if (!/^\d{16}$/.test(formData.cardNumber)) newErrors.cardNumber = "Card number must be 16 digits.";
        if (!formData.expMonth) newErrors.expMonth = "Month required.";
        if (!formData.expYear) newErrors.expYear = "Year required.";
        if (!/^\d{3,4}$/.test(formData.cvc)) newErrors.cvc = "CVC must be 3 or 4 digits.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        console.log("Payment submitted", formData);
    };

    return (
        <section className="p-6">
            <p className="text-lg font-semibold mb-4">Payment Details</p>

            <form className="max-w-md flex flex-col space-y-4 p-4" onSubmit={handleSubmit}>
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

                <div>
                    <input
                        className="border border-black w-full h-10 pl-4"
                        type="text"
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={(e) => updateFormField("cardNumber", e.target.value)}
                    />
                    {errors.cardNumber && <p className="text-sm text-red-600">{errors.cardNumber}</p>}
                </div>

                <div className="flex justify-between gap-2">
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

                    <div className="w-1/3">
                        <input
                            className="border border-black w-full h-10 pl-4"
                            type="text"
                            placeholder="CVC"
                            value={formData.cvc}
                            onChange={(e) => updateFormField("cvc", e.target.value)}
                        />
                        {errors.cvc && <p className="text-sm text-red-600">{errors.cvc}</p>}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="saveCard"
                        checked={formData.saveCard}
                        onChange={(e) => updateFormField("saveCard", e.target.checked)}
                    />
                    <label htmlFor="saveCard" className="text-sm">Save card data for future payments</label>
                </div>

                <button
                    type="submit"
                    className="bg-black text-white py-2 w-full"
                >
                    Pay with card
                </button>
            </form>
        </section>
    );
};

export default PaymentForm;
