import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../Pages/User/Products/ProductCard';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Get search term from URL
  const searchTerm = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      // Force console log
      console.log('=== SEARCH DEBUG ===');
      console.log('Search term:', searchTerm);
      console.log('Location:', location.search);

      try {
        // Build URL
        const url = searchTerm
          ? `https://stylenest.up.railway.app/api/products/search/?q=${encodeURIComponent(searchTerm)}`
          : `https://stylenest.up.railway.app/api/products/latest/?limit=10`;

        console.log('Fetching URL:', url);

        const response = await axios.get(url);
        
        console.log('Response status:', response.status);
        console.log('Response data:', response.data);
        console.log('Response data type:', typeof response.data);
        console.log('Has results?', response.data?.results);

        // Extract products based on API structure
        let products = [];
        
        if (Array.isArray(response.data)) {
          // Direct array
          products = response.data;
        } else if (response.data && Array.isArray(response.data.results)) {
          // Paginated response with results array
          products = response.data.results;
        } else if (response.data && typeof response.data === 'object') {
          // Single object - wrap in array
          products = [response.data];
        }

        console.log('Extracted products count:', products.length);
        console.log('Products array:', products);

        setResults(products);
      } catch (error) {
        console.error('=== SEARCH ERROR ===');
        console.error('Error message:', error.message);
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
        
        setError(error.message);
        setResults([]);
      } finally {
        setLoading(false);
        console.log('=== SEARCH COMPLETE ===');
      }
    };

    fetchResults();
  }, [searchTerm, location.search]);

  // Debug render
  console.log('Rendering with:', { loading, resultsCount: results.length, error });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg font-bold mb-4">
        {searchTerm
          ? `Search Results for "${searchTerm}"`
          : 'Explore the latest collection'}
      </h1>

      {/* Show count if available */}
      {!loading && results.length > 0 && (
        <p className="text-sm text-gray-600 mb-2">
          Found {results.length} product{results.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : results.length > 0 ? (
        /* Products grid */
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((product) => {
            // Debug each product
            console.log('Rendering product:', product.id, product.name);
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      ) : (
        /* No results */
        <div className="text-center py-10">
          <p className="text-gray-500">
            {searchTerm 
              ? `No products found for "${searchTerm}"`
              : 'No products available.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;