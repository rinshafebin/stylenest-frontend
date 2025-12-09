import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductGrid from "../User/Products/ProductGrid";
import Navbar from "../../Components/Common/Nav/Navbar";
import Footer from "../../Components/Common/Footer";

export default function CategoryProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  const fetchCategoryProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://stylenest.up.railway.app/api/products/category/${category}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, [category]);

  useEffect(() => {
    fetchCategoryProducts();
  }, [fetchCategoryProducts]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center my-4 sm:my-5 capitalize">
          {category} Collection
        </h2>

        <p className="text-center text-gray-600 text-sm sm:text-base mt-1 sm:mt-2 mb-4 sm:mb-6">
          Explore the latest {category} fashion and find your perfect style.
        </p>

        <ProductGrid products={products} />
      </div>

      <Footer />
    </div>
  );
}
