import { useShippingStore } from "../../stores/shippingStore";

const ShippingForm = () => {
  const { formData, updateFormField } = useShippingStore();
  

  return (
    <section className="p-6">
      <p className="text-lg font-semibold mb-4">Shipping Information</p>

      <form className="max-w-md h-full flex flex-col justify-between p-4 space-y-4">
        {/* Name Fields */}
        <div className="flex justify-between">
          <input
            className="border border-black w-48 h-10 pl-4"
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateFormField("firstName", e.target.value)}
            placeholder="First name"
          />
          <input
            className="border border-black w-48 h-10 pl-4"
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => updateFormField("lastName", e.target.value)}
            placeholder="Last name"
          />
        </div>

        {/* Address Fields */}
        <div className="flex flex-col">
          <input
            className="border border-black w-full h-10 pl-4 mb-3"
            type="text"
            id="address"
            value={formData.address}
            onChange={(e) => updateFormField("address", e.target.value)}
            placeholder="Address"
          />
          <input
            className="border border-black w-full h-10 pl-4"
            type="text"
            id="apartment"
            value={formData.apartment || ""}
            onChange={(e) => updateFormField("apartment", e.target.value)}
            placeholder="Apartment, Suite, optional"
          />
        </div>

        {/* Postal Code & City */}
        <div className="flex justify-between">
          <input
            className="border border-black w-48 h-10 pl-4"
            type="text"
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => updateFormField("postalCode", e.target.value)}
            placeholder="Postal Code"
          />
          <input
            className="border border-black w-48 h-10 pl-4"
            type="text"
            id="city"
            value={formData.city}
            onChange={(e) => updateFormField("city", e.target.value)}
            placeholder="City"
          />
        </div>

        {/* Save Contact */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="saveContact"
            checked={formData.saveContact}
            onChange={(e) => updateFormField("saveContact", e.target.checked)}
          />
          <label htmlFor="saveContact" className="text-sm">Save contact information</label>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="button-primary px-4 py-2 rounded w-full"
            onClick={(e) => {
              e.preventDefault();
              console.log("Shipping form submitted", formData);
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default ShippingForm;
