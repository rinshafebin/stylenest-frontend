import React, { useCallback } from "react";
import { User, Home, MapPin, Globe, Phone } from "lucide-react";
import AddressInput from "./AddressInput";

function AddressForm({
  formData,
  setFormData,
  errors,
  saving,
  handleSubmit,
}) {
  // Memoized change handler
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [setFormData]
  );

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AddressInput
        icon={<User />}
        label="Full Name "
        name="address_line1"
        value={formData.address_line1}
        onChange={handleChange}
        error={errors.address_line1}
        full
      />
      <AddressInput
        icon={<Home />}
        label="Address Line 2"
        name="address_line2"
        value={formData.address_line2}
        onChange={handleChange}
        error={errors.address_line2}
        full
      />
      <AddressInput
        icon={<MapPin />}
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        error={errors.city}
      />
      <AddressInput
        icon={<MapPin />}
        label="State"
        name="state"
        value={formData.state}
        onChange={handleChange}
        error={errors.state}
      />
      <AddressInput
        icon={<MapPin />}
        label="Zip Code"
        name="zip_code"
        value={formData.zip_code}
        onChange={handleChange}
        error={errors.zip_code}
      />
      <AddressInput
        icon={<Globe />}
        label="Country"
        name="country"
        value={formData.country}
        onChange={handleChange}
        error={errors.country}
      />
      <AddressInput
        icon={<Phone />}
        label="Phone Number"
        name="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
        error={errors.phone_number}
      />

      <div className="md:col-span-2 mt-4">
        <button
          type="submit"
          disabled={saving}
          className={`w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition ${
            saving ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {saving ? "Saving..." : "Save Address"}
        </button>
      </div>
    </form>
  );
}

export default React.memo(AddressForm);
