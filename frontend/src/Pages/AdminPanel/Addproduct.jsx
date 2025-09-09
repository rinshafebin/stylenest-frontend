import React, { useState } from "react";
import Sidebar from "../../Components/Admin/Sidebar";
import Header from "../../Components/Admin/Header";
import axiosInstance from "../../api/axios";
import { Upload, X } from "lucide-react";
import toast from "react-hot-toast";

export default function AddProduct() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "women",
        stock: "",
        details: [],
        image: null,
    });

    const [detailInput, setDetailInput] = useState("");

    const inputClass =
        "w-full rounded-lg px-4 py-2 border border-gray-300 bg-white " +
        "focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-200 placeholder-gray-500 transition duration-200";

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
            setImagePreview(URL.createObjectURL(files[0]));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleAddDetail = () => {
        if (detailInput.trim() && !formData.details.includes(detailInput.trim())) {
            setFormData((prev) => ({
                ...prev,
                details: [...prev.details, detailInput.trim()],
            }));
            setDetailInput("");
        }
    };

    const handleRemoveItem = (item) => {
        setFormData((prev) => ({
            ...prev,
            details: prev.details.filter((i) => i !== item),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const productData = new FormData();
        Object.keys(formData).forEach((key) => {
            if (Array.isArray(formData[key])) {
                productData.append(key, formData[key].join(", "));
            } else {
                productData.append(key, formData[key]);
            }
        });


        try {
            await axiosInstance.post("/adminside/createproducts/", productData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Product added successfully!");
            setFormData({
                name: "",
                description: "",
                price: "",
                category: "women",
                stock: "",
                details: [],
                image: null,
            });
            setImagePreview(null);
        } catch (err) {
            console.error(err);
            toast.error("Failed to add product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="flex flex-1">
                <Sidebar sidebarOpen={sidebarOpen} />
                <div className="flex-1 flex flex-col">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main className="flex-1 p-6 bg-gray-50">
                        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

                            {message && (
                                <p
                                    className={`mb-4 p-3 rounded-lg ${message.includes("✅")
                                        ? "bg-green-50 text-green-600"
                                        : "bg-red-50 text-red-600"
                                        }`}
                                >
                                    {message}
                                </p>
                            )}

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* Product Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block font-medium mb-1">Product Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium mb-1">Price</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium mb-1">Stock</label>
                                        <input
                                            type="number"
                                            name="stock"
                                            value={formData.stock}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium mb-1">Category</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className={inputClass}
                                        >
                                            <option value="women">Women's Collection</option>
                                            <option value="men">Men's Collection</option>
                                            <option value="kids">Kids Collection</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block font-medium mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className={inputClass}
                                        rows="3"
                                    />
                                </div>

                                {/* Details */}
                                <div>
                                    <label className="block font-medium mb-2">Details</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={detailInput}
                                            onChange={(e) => setDetailInput(e.target.value)}
                                            className={inputClass}
                                            placeholder="Enter detail"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddDetail}
                                            className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.details.map((detail) => (
                                            <span
                                                key={detail}
                                                className="flex items-center gap-1 bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm"
                                            >
                                                {detail}
                                                <X
                                                    size={14}
                                                    className="cursor-pointer"
                                                    onClick={() => handleRemoveItem(detail)}
                                                />
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label className="block font-medium mb-2">Product Image</label>
                                    <div
                                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-rose-400 transition"
                                        onClick={() => document.getElementById("fileInput").click()}
                                    >
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="max-h-48 rounded-lg object-contain"
                                            />
                                        ) : (
                                            <>
                                                <Upload className="w-10 h-10 text-gray-400" />
                                                <p className="mt-2 text-gray-500">Click to upload</p>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        id="fileInput"
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg w-full font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02] transition disabled:opacity-60"
                                    disabled={loading}
                                >
                                    {loading ? "Adding..." : "Add Product"}
                                </button>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
