import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";
import Sidebar from "../../Components/Admin/Sidebar";
import Header from "../../Components/Admin/Header";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function EditProduct() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/adminside/getproduct/${id}/`);
      setFormData({
        name: res.data.name || "",
        category: res.data.category || "",
        price: res.data.price || "",
        stock: res.data.stock || "",
        image: null,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          form.append(key, formData[key]);
        }
      });

      await axiosInstance.patch(`/adminside/updateproduct/${id}/`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product updated successfully");
      navigate("/allproducts");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

          {loading && <p className="text-gray-500">Loading...</p>}

          {!loading && (
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow rounded-lg p-6 space-y-4"
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  required
                >
                  <option value="">Select category</option>
                  <option value="women">Women's Collection</option>
                  <option value="men">Men's Collection</option>
                  <option value="kids">Kids Collection</option>
                </select>
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                    required
                  />
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
