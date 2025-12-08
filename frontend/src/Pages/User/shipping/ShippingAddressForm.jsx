import React, { useState, useEffect, useCallback, useMemo } from "react";
import { MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../../../context/AuthContext';
import Navbar from "../../../Components/Common/Nav/Navbar";
import Footer from "../../../Components/Common/Footer";

import AddressForm from './AddressForm';
import AddressLoader from './AddressLoader';

export default function ShippingAddressForm() {
  const navigate = useNavigate();
  const { token } = useAuth();

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

  // ENV backend URL
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

  // Fetch address
  const fetchAddress = useCallback(async () => {
    if (!token) return navigate("/login");

    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/orders/shipping-address/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data) setFormData(res.data);
    } catch {
      toast("No existing address found.");
    } finally {
      setLoading(false);
    }
  }, [token, navigate, BACKEND_URL]);

  useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  // Submit handler
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSaving(true);
      setErrors({});

      try {
        await axios.post(
          `${BACKEND_URL}/api/orders/shipping-address/`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        toast.success("Address saved!");
        navigate("/checkout");
      } catch (err) {
        if (err.response?.data) setErrors(err.response.data);
        toast.error("Failed to save address.");
      } finally {
        setSaving(false);
      }
    },
    [formData, token, navigate, BACKEND_URL]
  );

  // Memoized props for AddressForm
  const formProps = useMemo(
    () => ({
      formData,
      setFormData,
      errors,
      saving,
      handleSubmit,
    }),
    [formData, errors, saving, handleSubmit]
  );

  if (loading) return <AddressLoader />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-12 px-4 flex justify-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl p-8 shadow-md">
          <h2 className="text-3xl font-bold flex items-center gap-3 mb-8 text-gray-800">
            <MapPin className="text-rose-500" /> Shipping Address
          </h2>

          <AddressForm {...formProps} />
        </div>
      </div>
      <Footer />
    </>
  );
}
