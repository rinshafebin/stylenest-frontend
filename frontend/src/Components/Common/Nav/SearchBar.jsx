import React, { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const fetchSearchResults = useCallback(async () => {
    const query = searchTerm.trim();
    if (!query) return setSearchResults([]);

    try {
      const res = await axios.get(
        `https://stylenest.up.railway.app/api/products/search/?q=${query}`
      );
      setSearchResults(Array.isArray(res.data.results) ? res.data.results : res.data);
    } catch (err) {
      console.error(err);
    }
  }, [searchTerm]);

  useEffect(() => {
    const delay = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(delay);
  }, [fetchSearchResults]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;
    navigate(`/search?query=${query}`);
    setSearchResults([]);
  };

  return (
    <div className="relative w-full sm:w-auto">
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-1 shadow-sm w-full sm:w-auto"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for products..."
          className="bg-transparent text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none px-2 py-1 w-full sm:w-40 md:w-64"
        />
        <button type="submit" className="ml-1 p-1 rounded-full hover:bg-gray-100 transition">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-rose-600" />
        </button>
      </form>

      {searchResults.length > 0 && (
        <ul className="absolute top-full mt-2 left-0 bg-white border border-rose-200 rounded-md shadow-lg w-full sm:max-w-xs max-h-60 overflow-y-auto z-50">
          {searchResults.map((product) => (
            <li
              key={product.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
              onClick={() => navigate(`/productdetails/${product.id}/`)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(SearchBar);
