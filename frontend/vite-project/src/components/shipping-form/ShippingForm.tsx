import { useShippingStore } from "../../stores/shippingStore";
import './shippingForm.css'

const ShippingForm = () => {
  const formData = useFormData();
  const {updateFormField} = useShippingActions()
  console.log(formData)

  return (
    <section className="section-wrapper">
      <form
        className="shipping-form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Shipping form submitted", formData);
        }}
      >
        <div className="flex flex-col">
          <p className="section-title">Shipping Information</p>

          <div className="input-group">
            <input
              className="text-input"
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => updateFormField("firstName", e.target.value)}
              placeholder="First name"
              required
            />
            <input
              className="text-input"
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => updateFormField("lastName", e.target.value)}
              placeholder="Last name"
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <input
            className="full-width-input"
            type="text"
            id="address"
            value={formData.address}
            onChange={(e) => updateFormField("address", e.target.value)}
            placeholder="Address"
            required
          />
          <input
            className="text-input"
            type="text"
            id="apartment"
            value={formData.apartment || ""}
            onChange={(e) => updateFormField("apartment", e.target.value)}
            placeholder="Apartment, Suite, optional"
          />
        </div>

        <div className="input-group">
          <input
            className="text-input"
            type="text"
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => updateFormField("postalCode", e.target.value)}
            placeholder="Postal Code"
            required
          />
          <input
            className="text-input"
            type="text"
            id="city"
            value={formData.city}
            onChange={(e) => updateFormField("city", e.target.value)}
            placeholder="City"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="saveContact"
            checked={formData.saveContact}
            onChange={(e) => updateFormField("saveContact", e.target.checked)}
            className="checkbox-input"
          />
          <label htmlFor="saveContact" className="checkbox-label">
            Save contact information
          </label>
        </div>

        <div>
          <button type="submit" className="submit-button">
            Continue to shipping
          </button>
        </div>
      </form>
    </section>
  );
};

export default ShippingForm;
