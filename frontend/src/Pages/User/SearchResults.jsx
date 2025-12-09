import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../Pages/User/Products/ProductCard";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Get search term from URL
  const searchTerm = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchTerm.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(
          `https://stylenest.up.railway.app/api/products/search/?q=${encodeURIComponent(
            searchTerm
          )}`
        );

        console.log("Fetched products:", res.data);

        const data = Array.isArray(res.data.results) ? res.data.results : res.data;
        setResults(data);
      } catch (error) {
        console.error("Search fetch error:", error.response?.data || error.message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg font-bold mb-4">
        {searchTerm ? `Search Results for "${searchTerm}"` : "Explore the latest collection"}
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 col-span-full">No products available.</p>
      )}
    </div>
  );
};

export default SearchResults;
