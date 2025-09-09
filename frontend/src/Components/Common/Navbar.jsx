import React, { useState, useEffect } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  LogOut,
  ClipboardList,
  Key,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../api/axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");

    if (accessToken && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => navigate("/logout");
  const handleLogin = () => navigate("/login");

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }
      try {
        const response = await axiosInstance.get(
          `/products/search/?query=${searchTerm}`
        );
        if (Array.isArray(response.data)) {
          setSearchResults(response.data);
        } else {
          setSearchResults(response.data.results || []);
        }
      } catch (error) {
        console.log("Search error", error);
      }
    };

    const delayDebounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
      setSearchResults([]);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SN</span>
          </div>
          <span className="text-xl font-bold text-black">StyleNest</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/products" className="text-black hover:text-rose-600 transition-colors font-medium">
            All Products
          </Link>
          <Link to="/products/women" className="text-black hover:text-rose-600 transition-colors font-medium">
            Women
          </Link>
          <Link to="/products/men" className="text-black hover:text-rose-600 transition-colors font-medium">
            Men
          </Link>
          <Link to="/products/kids" className="text-black hover:text-rose-600 transition-colors font-medium">
            Kids
          </Link>
        </nav>

        {/* Right side (Desktop) */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Search */}
          <div className="relative">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-rose-500 transition-all duration-200 w-fit"
            >
              <input
                type="text"
                placeholder="Search for products..."
                className="bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none px-1 py-1 w-40 md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="ml-1">
                <Search className="w-5 h-5 text-gray-600 hover:text-rose-600" />
              </button>
            </form>
            {searchResults.length > 0 && (
              <ul className="absolute top-full mt-2 left-0 bg-white border border-rose-200 rounded-md shadow-lg w-full max-w-xs max-h-60 overflow-y-auto z-50">
                {searchResults.map((product) => (
                  <li
                    key={product.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      setSearchTerm("");
                      setSearchResults([]);
                    }}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Wishlist */}
          <Link to="/wishlist">
            <Heart className="w-5 h-5 text-black hover:text-rose-700" />
          </Link>

          {/* Cart */}
          <Link to="/cart">
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-black hover:text-rose-700" />
              <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </div>
          </Link>

          {/* User Menu */}
          {user ? (
            <div className="relative group">
              <div className="cursor-pointer flex items-center space-x-2">
                <User className="w-5 h-5 text-black" />
                <span className="hidden sm:block text-sm font-medium">
                  {user.username}
                </span>
              </div>
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                  <User className="w-4 h-4 mr-2" /> My Profile
                </Link>
                <Link to="/orders" className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                  <ClipboardList className="w-4 h-4 mr-2" /> Orders
                </Link>
                <Link to="/changepassword" className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                  <Key className="w-4 h-4 mr-2" /> Change Password
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="text-black hover:text-rose-700 text-sm font-medium"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="p-4 flex flex-col space-y-3">
            <form onSubmit={handleSearchSubmit} className="flex items-center border border-gray-300 rounded px-3 py-1">
              <input
                type="text"
                placeholder="Search..."
                className="flex-grow text-sm focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </form>

            <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>All Products</Link>
            <Link to="/products/women" onClick={() => setIsMobileMenuOpen(false)}>Women</Link>
            <Link to="/products/men" onClick={() => setIsMobileMenuOpen(false)}>Men</Link>
            <Link to="/products/kids" onClick={() => setIsMobileMenuOpen(false)}>Kids</Link>

            <div className="flex space-x-4 mt-2">
              <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)}>
                <Heart className="w-5 h-5" />
              </Link>
              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                <ShoppingBag className="w-5 h-5" />
              </Link>
            </div>

            {user ? (
              <>
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>My Profile</Link>
                <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)}>Orders</Link>
                <Link to="/changepassword" onClick={() => setIsMobileMenuOpen(false)}>Change Password</Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-red-600 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <button onClick={handleLogin} className="text-left">Login</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
