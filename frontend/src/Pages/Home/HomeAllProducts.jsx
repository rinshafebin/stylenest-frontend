import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ProductGrid from '../User/Products/ProductGrid';
import Navbar from '../../Components/Common/Nav/Navbar';
import Footer from '../../Components/Common/Footer';
import toast from 'react-hot-toast';

export default function HomeAllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${API}api/products/list/`);
      setProducts(response.data.results || []);
      console.log('Fetched products:', response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [API]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="text-center my-6">
        <h2 className="text-3xl font-bold text-gray-800">
          <span className="text-black">Our </span>
          <span className="text-rose-500">Products</span>
        </h2>
        <p className="text-black mt-2 max-w-2xl mx-auto">
          Discover the latest trends in fashion and lifestyle.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-10">Loading products...</p>
      ) : (
        <ProductGrid products={products} />
      )}

      <Footer />
    </div>
  );
}
