import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../Pages/User/Products/ProductCard';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const searchTerm = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const url = searchTerm
          ? `https://stylenest.up.railway.app/api/products/search/?q=${encodeURIComponent(searchTerm)}`
          : `https://stylenest.up.railway.app/api/products/latest/?limit=10`;

        const response = await axios.get(url);
        console.log('API response:', response.data);

        const data = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data.results)
          ? response.data.results
          : [];

        console.log('Processed results:', data);

        setResults(data);
      } catch (error) {
        console.error('Error fetching products:', error.response?.data || error.message);
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
        {searchTerm ? `Search Results for "${searchTerm}"` : 'Explore the latest collection'}
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
        <p className="text-center col-span-full mt-10 text-gray-500">No products available.</p>
      )}
    </div>
  );
};

export default SearchResults;
