import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../Pages/User/Products/ProductCard';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  // Get search term from URL
  const searchTerm = new URLSearchParams(location.search).get('query') || '';

  const fetchResults = useCallback(async () => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://stylenest.up.railway.app/api/products/search/?q=${encodeURIComponent(searchTerm)}`
      );

      const data = response.data.results || response.data || [];
      setResults(data);
    } catch (error) {
      console.error('Search error:', error.response?.data || error.message);
      setResults([]);
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

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
