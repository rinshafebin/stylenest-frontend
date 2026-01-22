import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../Pages/User/Products/ProductCard';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  
  // Get search term from URL
  const searchTerm = new URLSearchParams(location.search).get('query') || '';

  const fetchResults = useCallback(async () => {
    if (!searchTerm.trim()) {
      setResults([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Searching for:', searchTerm); // Debug log
      
      const response = await axios.get(
        `${BACKEND_URL}/api/products/search/`,
        {
          params: { q: searchTerm },
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10 second timeout
        }
      );

      console.log('API Response:', response.data); // Debug log

      // Handle the response structure from your backend
      const data = response.data.results || [];
      setResults(data);
      
      if (data.length === 0) {
        setError('No products found for your search.');
      }
    } catch (err) {
      console.error('Search error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });

      // Set user-friendly error messages
      if (err.code === 'ECONNABORTED') {
        setError('Request timeout. Please try again.');
      } else if (err.response?.status === 404) {
        setError('Search endpoint not found.');
      } else if (err.response?.status >= 500) {
        setError('Server error. Please try again later.');
      } else if (err.message === 'Network Error') {
        setError('Network error. Please check your connection or CORS settings.');
      } else {
        setError('An error occurred while searching. Please try again.');
      }
      
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
        Search Results for "{searchTerm}"
      </h1>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <span className="ml-3 text-gray-600">Searching...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!loading && !error && results.length === 0 && searchTerm && (
        <p className="text-gray-500 text-center py-8">
          No products found for "{searchTerm}". Try a different search term.
        </p>
      )}
    </div>
  );
};

export default SearchResults;