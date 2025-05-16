import { useShippingStore } from "../../stores/shippingStore";

const ShippingForm = () => {
  const { formData, updateFormField } = useShippingStore();

  return (
    <section className="p-4 sm:p-6 max-w-lg mx-auto">
      <form
        className="w-full flex flex-col justify-between space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Shipping form submitted", formData);
        }}
      >
        <div className="flex flex-col">
          <p className="text-lg font-medium mb-2">Shipping Information</p>

          {/* Name Fields */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <input
              className="flex-1 border border-black text-black p-3 placeholder:text-gray-400 text-sm font-normal"
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => updateFormField("firstName", e.target.value)}
              placeholder="First name"
            />
            <input
              className="flex-1 border border-black text-black p-3 placeholder:text-gray-400 text-sm font-normal"
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => updateFormField("lastName", e.target.value)}
              placeholder="Last name"
            />
          </div>
        </div>

        {/* Address Fields */}
        <div className="flex flex-col">
          <input
            className="border border-black text-black p-3 placeholder:text-gray-400 text-sm font-normal mb-3"
            type="text"
            id="address"
            value={formData.address}
            onChange={(e) => updateFormField("address", e.target.value)}
            placeholder="Address"
          />
          <input
            className="border border-black text-black p-3 placeholder:text-gray-400 text-sm font-normal"
            type="text"
            id="apartment"
            value={formData.apartment || ""}
            onChange={(e) => updateFormField("apartment", e.target.value)}
            placeholder="Apartment, Suite, optional"
          />
        </div>

        {/* Postal Code & City */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <input
            className="flex-1 border border-black text-black p-3 placeholder:text-gray-400 text-sm font-normal"
            type="text"
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => updateFormField("postalCode", e.target.value)}
            placeholder="Postal Code"
          />
          <input
            className="flex-1 border border-black text-black p-3 placeholder:text-gray-400 text-sm font-normal"
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
            className="w-5 h-5 rounded-none cursor-pointer"
          />
          <label
            htmlFor="saveContact"
            className="text-gray-400 font-normal text-sm leading-4 tracking-tighter"
          >
            Save contact information
          </label>
        </div>

        {/* Submit */}
        <div>
          <button type="submit" className="button-primary w-full">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default ShippingForm;
