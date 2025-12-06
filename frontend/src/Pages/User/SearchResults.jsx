import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  const searchTerm = new URLSearchParams(location.search).get('search') || '';

  // Fetch results
  const fetchResults = useCallback(async () => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://stylenest-backend-g16m.onrender.com/products/search/?search=${searchTerm}`
      );
      setResults(response.data || []);
    } catch (error) {
      console.error('Search error:', error.response?.data || error.message);
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
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="border p-2 rounded"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <h2 className="text-sm mt-2">{product.name}</h2>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
