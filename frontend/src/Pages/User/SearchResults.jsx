import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../Pages/User/Products/ProductCard';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');
  const location = useLocation();

  const searchTerm = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      
      const debug = [];
      debug.push(`🔍 Search term: "${searchTerm}"`);
      debug.push(`📍 Location: ${location.search}`);

      try {
        const url = searchTerm
          ? `https://stylenest.up.railway.app/api/products/search/?q=${encodeURIComponent(searchTerm)}`
          : `https://stylenest.up.railway.app/api/products/latest/?limit=10`;

        debug.push(`🌐 Fetching: ${url}`);
        
        const response = await axios.get(url);
        
        debug.push(`✅ Status: ${response.status}`);
        debug.push(`📦 Raw data type: ${typeof response.data}`);
        debug.push(`📦 Raw data: ${JSON.stringify(response.data, null, 2)}`);

        let products = [];
        
        // Handle different response formats
        if (Array.isArray(response.data)) {
          products = response.data;
          debug.push(`✓ Format: Direct array`);
        } else if (response.data && Array.isArray(response.data.results)) {
          products = response.data.results;
          debug.push(`✓ Format: Paginated (results array)`);
        } else if (response.data && typeof response.data === 'object') {
          products = [response.data];
          debug.push(`✓ Format: Single object`);
        }

        debug.push(`📊 Products extracted: ${products.length}`);
        
        if (products.length > 0) {
          debug.push(`📝 First product: ${JSON.stringify(products[0])}`);
        }

        setDebugInfo(debug.join('\n'));
        setResults(products);

        // Force console output
        console.clear();
        console.log('%c=== SEARCH RESULTS DEBUG ===', 'color: blue; font-size: 16px; font-weight: bold;');
        debug.forEach(line => console.log(line));
        console.log('%c=========================', 'color: blue; font-size: 16px; font-weight: bold;');

      } catch (error) {
        debug.push(`❌ Error: ${error.message}`);
        if (error.response) {
          debug.push(`❌ Response status: ${error.response.status}`);
          debug.push(`❌ Response data: ${JSON.stringify(error.response.data)}`);
        }
        
        setDebugInfo(debug.join('\n'));
        setError(error.message);
        setResults([]);
        
        console.error('%c=== ERROR ===', 'color: red; font-size: 16px; font-weight: bold;');
        debug.forEach(line => console.error(line));
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm, location.search]);

  return (
    <div className="container mx-auto p-4">
      {/* Debug Panel - Remove this in production */}
      <div className="bg-gray-100 border-2 border-blue-500 p-4 mb-4 rounded text-xs font-mono whitespace-pre-wrap">
        <div className="font-bold text-blue-700 mb-2">🐛 DEBUG INFO (remove in production):</div>
        <div className="text-gray-800">{debugInfo || 'Loading...'}</div>
        <div className="mt-2 text-red-600">
          Loading: {loading ? 'YES' : 'NO'} | 
          Results: {results.length} | 
          Error: {error || 'NONE'}
        </div>
      </div>

      <h1 className="text-lg font-bold mb-4">
        {searchTerm
          ? `Search Results for "${searchTerm}"`
          : 'Explore the latest collection'}
      </h1>

      {!loading && results.length > 0 && (
        <p className="text-sm text-gray-600 mb-2">
          Found {results.length} product{results.length !== 1 ? 's' : ''}
        </p>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          ⚠️ Error: {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((product, index) => {
            console.log(`Rendering product ${index + 1}:`, product);
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      ) : (
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