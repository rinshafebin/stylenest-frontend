import React, { useState, useEffect } from "react";
import { Edit, Trash2, PlusCircle, Search } from "lucide-react"; // ✅ Added Search here
import axiosInstance from "../../api/axios";
import Sidebar from "../../Components/Admin/Sidebar";
import Header from "../../Components/Admin/Header";
import { Link } from "react-router-dom";

export default function AllProducts() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Added this

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/adminside/allproducts/");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.detail || err.message || "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axiosInstance.delete(`/adminside/deleteproduct/${id}/`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  }

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="p-6">
          <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
            <h1 className="text-2xl font-bold">All Products</h1>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <Link
              to="/addproduct"
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition"
            >
              <PlusCircle size={18} />
              Add Product
            </Link>
          </div>

          {loading && (
            <div className="text-gray-500 italic">Loading products...</div>
          )}
          {error && (
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && !error && (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <p className="text-gray-500 mb-4">No products found.</p>
              <Link
                to="/addproduct"
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
              >
                Add Your First Product
              </Link>
            </div>
          )}

          {!loading && filteredProducts.length > 0 && (
            <div className="overflow-x-auto bg-white shadow rounded-lg">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50 border-b sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, idx) => (
                    <tr
                      key={product.id}
                      className={`border-b ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {product.id}
                      </td>

                      <td className="px-6 py-4">
                        {product.image ? (
                          <img
                            src={
                              product.image.startsWith("http")
                                ? product.image
                                : `${product.image}`
                            }
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          <span className="text-gray-400 italic">No image</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        ₹{product.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-3">
                          <Link to={`/editproduct/${product.id}/`}>
                            <button className="text-blue-500 hover:text-blue-700">
                              <Edit size={18} />
                            </button>
                          </Link>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
