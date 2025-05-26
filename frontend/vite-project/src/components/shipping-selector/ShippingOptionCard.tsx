import {
  useIsSelected,
  useShippingOptionsActions,
} from "../../stores/shippingOptionStore";

interface ShippingOptionCardProps {
  option: {
    id: string;
    label: string;
    price: string;
    min_days: number;
    max_days: number;
  };
}

function ShippingOptionCard({ option }: ShippingOptionCardProps) {
  const isSelected = useIsSelected(option.id);
  const { setSelectionData } = useShippingOptionsActions();

  return (
    <div
      className={`shipping-options__option ${isSelected ? "selection" : ""}`}
    >
      <div className="shipping-options__check-and-details">
        <div className="radio-box">
          <input
            type="radio"
            id={`shipping-option-${option.id}`}
            name="shipping-option"
            value={option.label}
            checked={isSelected}
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
            {option.min_days}-{option.max_days} business days -{" "}
            <strong>{option.price} kr</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingOptionCard;
