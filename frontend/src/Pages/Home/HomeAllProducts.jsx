import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ProductGrid from '../User/Products/ProductGrid';
import Navbar from '../../Components/Common/Nav/Navbar';
import Footer from '../../Components/Common/Footer';
import toast from 'react-hot-toast';

export default function HomeAllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`https://stylenest.up.railway.app/api/products/list/`);
      setProducts(response.data.results || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="text-center my-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          <span className="text-black">Our </span>
          <span className="text-rose-500">Products</span>
        </h2>
        <p className="text-black mt-2 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          Discover the latest trends in fashion and lifestyle.
        </p>
      </div>

      <div className="flex-1 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading products...</p>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>

      <Footer />
    </div>
  );
}
