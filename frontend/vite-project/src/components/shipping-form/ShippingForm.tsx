import { useShippingStore } from "../../stores/shippingStore";
import './shippingForm.css'

const ShippingForm = () => {
  const { formData, updateFormField } = useShippingStore();

  return (
    <section className="section-wrapper">
      <form
        className="shipping-form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Shipping form submitted", formData);
        }}
      >
        <div className="input-container-flex-col">
          <p className="section-title">Shipping Information</p>

          <div className="input-group">
              <div className="label-input">
                <label htmlFor="name">Name</label>
                <input
                  className="text-input"
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormField("name", e.target.value)}
                  placeholder="Tom Seedly"
                  required
                />
              </div>
              <div className="label-input">
                <label htmlFor="email">Email</label>
                <input
                  className="text-input"
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => updateFormField("email", e.target.value)}
                  placeholder="tom@seedly.se"
                  required
                />
              </div>
          </div>
        </div>

        <div className="input-container-flex-col">
          <div className="label-input">
            <label htmlFor="address">Address</label>
            <input
              className="full-width-input"
              type="text"
              id="address"
              value={formData.address}
              onChange={(e) => updateFormField("address", e.target.value)}
              placeholder="Address"
              required
            />
          </div>
          <div className="label-input">
            <label htmlFor="apartment">Apartment</label>
            <input
              className="text-input"
              type="text"
              id="apartment"
              value={formData.apartment || ""}
              onChange={(e) => updateFormField("apartment", e.target.value)}
              placeholder="Apartment, Suite, optional"
            />
          </div>
        </div>

        <div className="input-group">
          <div className="label-input">
            <label htmlFor="postal code">Postal code</label>
            <input
              className="text-input"
              type="text"
              id="postalCode"
              value={formData.postalCode}
              onChange={(e) => updateFormField("postalCode", e.target.value)}
              placeholder="Postal Code"
              required
            />
          </div>
          <div className="label-input">
            <label htmlFor="City">City</label>
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
        </div>

        <div className="checkbox-container">
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
          <button type="submit" className="button-primary submit-button">
            Continue to shipping
          </button>
        </div>
      </form>
    </section>
  );
};

export default ShippingForm;
