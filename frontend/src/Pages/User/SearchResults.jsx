import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axiosInstance from '../../api/axios';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search') || '';
  console.log('data id.   ',searchTerm)

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchTerm.trim()) return;
      try {
        const response = await axiosInstance.get(`/products/search/?search=${searchTerm}`);
        console.log(' show.  product ',response.data)
        setResults(response.data || []);
      } catch (error) {
        console.error("Search error:", error);
      }
    };
    fetchResults();
  }, [searchTerm]);
   console.log('datas. ',results.data)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg font-bold mb-4">Search Results for "{searchTerm}"</h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map(product => (
            <Link key={product.id} to={`/products/${product.id}`} className="border p-2 rounded">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
              <h2 className="text-sm mt-2">{product.name}</h2>
            </Link>
          ))}
        </div>
      ) : (
        
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
