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
                    ${selection === option.id ? "selection" : ""}`} key={option.id}>
                    <div className="shipping-options__check-and-details">
                        <div className="radio-box">
                            <input
                            type="radio"
                            id={`shipping-option-${option.id}`}
                            name="shipping-option"
                            value={option.label}
                            checked={selection === option.id}
                            onChange={() => setSelectionData(option.id)}
                            />
                        </div>
                    <div className="details">
                        <div className="option--label">
                            <label htmlFor={`shipping-option-${option.id}`}>
                                <h4>{option.label}</h4>
                            </label>
                        </div>

                        <div className="option--details">
                            {option.min_days}-{option.max_days} business days - <strong>{option.price} kr</strong>
                        </div>
                    </div>
                    </div>
                </div>
            ))}
        </form>

    )
}