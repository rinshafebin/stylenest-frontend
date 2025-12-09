import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../Pages/User/Products/ProductCard';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Get search term from URL
  const searchTerm = new URLSearchParams(location.search).get('query') || '';

  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      let response;

      if (!searchTerm.trim()) {
        // If search is empty, fetch latest 8 products as fallback
        response = await axios.get(
          'https://stylenest.up.railway.app/api/products/latest/?limit=8'
        );
      } else {
        // Fetch search results
        response = await axios.get(
          `https://stylenest.up.railway.app/api/products/search/?q=${encodeURIComponent(searchTerm)}`
        );
      }

      // Handle paginated vs non-paginated responses
      const data = response.data.results ?? response.data ?? [];
      setResults(data);
      console.log('Fetched products:', data);
    } catch (error) {
      console.error('Search error:', error.response?.data || error.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

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
        <p className="text-gray-500">No products available.</p>
      )}
    </div>
  );
};

export default SearchResults;
