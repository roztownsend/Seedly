import { useEffect } from "react";
import './shippingSelector.css';
import { useAllShippingOptionsStore, useShippingSelectionState } from "../../stores/shippingOptionStore";

export const ShippingSelector: React.FC = () => {
    const { allShippingOptions, fetchAllOptions } = useAllShippingOptionsStore();
    const { selection, setSelectionData } = useShippingSelectionState();


    useEffect(() => {
        fetchAllOptions();
    }, [fetchAllOptions]);

    return (
        <form className="shipping-options">
            {allShippingOptions.map((option) => (

                <div className={`shipping-options__option 
                    ${selection.label === option.label ? "selection" : ""}`} key={option.label}>
                    <div className="shipping-options__check-and-details">
                        <div className="radio-box">
                            <input 
                                type="radio"
                                className="radio-box__input"
                                value={option.label}
                                checked={selection.label === option.label}
                                onChange={() => setSelectionData(option)}
                                name="shipping-option" />
                        </div>
                    <div className="details">
                        <div className="option--label">
                            <label htmlFor="shipping-option">
                                <h4>{option.label}</h4>
                            </label>
                        </div>

                        <div className="option--details">
                            {option.timeframe} business days - <strong>{option.price}</strong>
                        </div>
                    </div>
                    </div>
                </div>
            ))}
        </form>

    )
}