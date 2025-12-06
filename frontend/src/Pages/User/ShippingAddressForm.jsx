import React, { useState, useEffect, useCallback } from "react";
import { MapPin, Phone, User, Home, Globe } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../Components/Common/Navbar";
import Footer from "../../Components/Common/Footer";

export default function ShippingAddressForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch existing address
  const fetchAddress = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/orders/shipping-address/"
      );
      if (res.data) setFormData(res.data);
    } catch {
      toast("No existing address found.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSaving(true);
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/orders/shipping-address/",
        formData
      );
      toast.success("Shipping address saved successfully!");
      navigate("/checkout");
    } catch (err) {
      if (err.response?.data) setErrors(err.response.data);
      toast.error("Failed to save address.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-6 text-gray-500">Loading address...</p>
    );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-start justify-center py-12 px-4">
        <div className="max-w-2xl w-full bg-white shadow-lg hover:shadow-xl transition-shadow rounded-2xl p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <MapPin className="w-8 h-8 text-rose-500" /> Shipping Address
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <FormField
              icon={<User />}
              label="Full Name / Address Line 1"
              name="address_line1"
              value={formData.address_line1}
              onChange={handleChange}
              error={errors.address_line1}
              full
            />
            <FormField
              icon={<Home />}
              label="Address Line 2"
              name="address_line2"
              value={formData.address_line2}
              onChange={handleChange}
              error={errors.address_line2}
              full
            />
            <FormField
              icon={<MapPin />}
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
            />
            <FormField
              icon={<MapPin />}
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              error={errors.state}
            />
            <FormField
              icon={<MapPin />}
              label="Zip Code"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleChange}
              error={errors.zip_code}
            />
            <FormField
              icon={<Globe />}
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              error={errors.country}
            />
            <FormField
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
                className={`w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all flex justify-center items-center ${
                  saving ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {saving ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
                ) : (
                  "Save Address"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

function FormField({ icon, label, name, value, onChange, error, full }) {
  return (
    <div className={`${full ? "md:col-span-2" : ""}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-rose-400 bg-white overflow-hidden transition-all">
        <span className="px-3 flex items-center bg-gray-50 border-r border-gray-200 text-gray-400">
          {React.cloneElement(icon, { className: "w-5 h-5" })}
        </span>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`Enter ${label.toLowerCase()}`}
          className="w-full px-3 py-2.5 outline-none text-gray-700 placeholder-gray-400 focus:bg-gray-50 transition"
        />
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
