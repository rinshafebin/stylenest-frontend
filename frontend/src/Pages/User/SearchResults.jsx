import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../Pages/User/Products/ProductCard';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Correctly get search term from URL (supports ?q=ts)
  const searchTerm = new URLSearchParams(location.search).get('q') || '';

  const fetchResults = useCallback(async () => {
    setLoading(true);
    console.log('Fetching products for searchTerm:', searchTerm);

    try {
      // Decide URL based on search term
      const url = searchTerm
        ? `https://stylenest.up.railway.app/api/products/search/?q=${encodeURIComponent(searchTerm)}`
        : `https://stylenest.up.railway.app/api/products/latest/?limit=10`;

      const response = await axios.get(url);
      console.log('Raw API response:', response.data);

      // Safely process data
      const data = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.results)
        ? response.data.results
        : [];

      console.log('Processed products array:', data);

      setResults(data);
    } catch (error) {
      console.error('Search error:', error.response?.data || error.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults, location]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg font-bold mb-4">
        {searchTerm
          ? `Search Results for "${searchTerm}"`
          : 'Explore the latest collection'}
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
        <p className="text-center col-span-full mt-10 text-gray-500">
          No products available.
        </p>
      )}
    </div>
  );
};

export default SearchResults;
