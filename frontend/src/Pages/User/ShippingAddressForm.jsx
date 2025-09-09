import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { MapPin, Phone, User, Home, Globe } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Common/Navbar";
import Footer from "../../Components/Common/Footer";

export default function ShippingAddressForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await axiosInstance.get("/orders/shipping/");
        setFormData(res.data);
      } catch {
        toast("No existing address found.");
      } finally {
        setLoading(false);
      }
    };
    fetchAddress();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSaving(true);
    try {
      await axiosInstance.post("/orders/shipping/", formData);
      toast.success("Shipping address saved successfully!");
      navigate("/checkout");

    } catch (err) {
      if (err.response?.data) setErrors(err.response.data);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <p className="text-center mt-6 text-gray-500">Loading address...</p>;

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
            <FormField icon={<User />} label="Full Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
            <FormField icon={<Phone />} label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} />
            <FormField icon={<Home />} label="Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} full />
            <FormField icon={<MapPin />} label="City" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
            <FormField icon={<MapPin />} label="State" name="state" value={formData.state} onChange={handleChange} error={errors.state} />
            <FormField icon={<MapPin />} label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} error={errors.pincode} />
            <FormField icon={<Globe />} label="Country" name="country" value={formData.country} onChange={handleChange} error={errors.country} />

            <div className="md:col-span-2 mt-4">
              <Link to={"/checkout"}>
                <button
                  type="submit"
                  disabled={saving}
                  className={`w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all flex justify-center items-center ${saving ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {saving ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </Link>
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
