import { useState } from "react";
import './shippingSelector.css';

//to be processed from backend
const shippingOptions = [
    {label: "PostNord SnigelPost", price: "49 kr", timeframe: "4-197"},
    {label: "BootBee Box", price: "59 kr", timeframe: "10-21"},
    {label: "DB Stinker Ombud", price: "79 kr", timeframe: "7-19"}
];

export const ShippingSelector: React.FC = () => {
    const [isSelected, setIsSelected] = useState("");

    const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSelected(event.target.value)
    };


    return (
        <form className="shipping-options">
            {shippingOptions.map((option) => (

                <div className={`shipping-options__option 
                    ${isSelected === option.label ? "selection" : ""}`} key={option.label}>
                    <div className="shipping-options__check-and-details">
                        <div className="radio-box">
                            <input 
                                type="radio"
                                className="radio-box__input"
                                value={option.label}
                                checked={isSelected === option.label}
                                onChange={handleSelection}
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