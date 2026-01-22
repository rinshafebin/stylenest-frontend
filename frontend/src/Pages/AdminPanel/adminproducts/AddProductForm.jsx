import React, { useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";

import ProductBasicFields from "./ProductBasicFields";
import ProductDetailsInput from "./ProductDetailsInput";

export default function AddProductForm() {
  const { token } = useAuth();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "women",
    description: "",
    details: [],
    image_url: "",  
  });

  const [loading, setLoading] = useState(false);

  // Universal field updater
  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setDetails = useCallback((details) => {
    setFormData((prev) => ({ ...prev, details }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      const data = {
        ...formData,
        details: JSON.stringify(formData.details),  
      };

      try {
        await axios.post(
          `${BACKEND_URL}/api/products/admin/create/`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Product added!");

        // Reset Form
        setFormData({
          name: "",
          price: "",
          stock: "",
          category: "women",
          description: "",
          details: [],
          image_url: "",
        });

      } catch (error) {
        console.log(error);
        toast.error("Failed to add product");
      }

      setLoading(false);
    },
    [formData, token]
  );

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      
      {/* Basic fields (name, price, stock, etc.) */}
      <ProductBasicFields formData={formData} updateField={updateField} />

      {/* Details input */}
      <ProductDetailsInput details={formData.details} setDetails={setDetails} />

      {/* CLOUDINARY URL INPUT */}
      <div>
        <label className="font-medium">Product Image URL</label>
        <input
          type="text"
          placeholder="Paste Cloudinary URL here"
          value={formData.image_url}
          onChange={(e) => updateField("image_url", e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
      </div>

      {/* Submit Button */}
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
