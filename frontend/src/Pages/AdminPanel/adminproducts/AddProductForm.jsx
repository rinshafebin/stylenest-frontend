import React, { useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from '../../../context/AuthContext'

import ProductBasicFields from "./ProductBasicFields";
import ProductDetailsInput from "./ProductDetailsInput";
import ProductImageUploader from "./ProductImageUploader";

export default function AddProductForm() {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "women",
    description: "",
    details: [],
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Stable callback — no rerender in children
  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const setDetails = useCallback(details => {
    setFormData(prev => ({ ...prev, details }));
  }, []);

  const handleImageSelect = useCallback((file, preview) => {
    setFormData(prev => ({ ...prev, image: file }));
    setImagePreview(preview);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(
        key,
        Array.isArray(formData[key])
          ? JSON.stringify(formData[key])
          : formData[key]
      );
    });

    try {
      await axios.post(
        `https://stylenest.up.railway.app/api/products/admin/create/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product added!");

      setFormData({
        name: "",
        price: "",
        stock: "",
        category: "women",
        description: "",
        details: [],
        image: null,
      });

      setImagePreview(null);

    } catch {
      toast.error("Failed to add product");
    }

    setLoading(false);
  }, [formData, token]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>

      <ProductBasicFields
        formData={formData}
        updateField={updateField}
      />

      <ProductDetailsInput
        details={formData.details}
        setDetails={setDetails}
      />

      <ProductImageUploader
        imagePreview={imagePreview}
        onImageSelected={handleImageSelect}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-rose-500 text-white w-full py-3 rounded-lg"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}
