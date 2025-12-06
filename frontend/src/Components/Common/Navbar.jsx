import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
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

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const accessToken = localStorage.getItem("access_token");

    if (accessToken && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  // Handlers
  const handleLogout = useCallback(() => navigate("/logout"), [navigate]);
  const handleLogin = useCallback(() => navigate("/login"), [navigate]);
  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
      setIsMobileMenuOpen(false);
    },
    [navigate]
  );

  // Debounced search
  const fetchSearchResults = useCallback(async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(`/search/?query=${searchTerm}`);
      if (Array.isArray(response.data)) {
        setSearchResults(response.data);
      } else {
        setSearchResults(response.data.results || []);
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  }, [searchTerm]);

  useEffect(() => {
    const delay = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(delay);
  }, [fetchSearchResults]);

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        navigate(`/search?query=${searchTerm}`);
        setSearchResults([]);
        setIsMobileMenuOpen(false);
      }
    },
    [navigate, searchTerm]
  );

  // Memoized nav links
  const navLinks = useMemo(
    () => [
      { label: "All Products", path: "/products" },
      { label: "Women", path: "/products/women" },
      { label: "Men", path: "/products/men" },
      { label: "Kids", path: "/products/kids" },
    ],
    []
  );

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
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavigate(link.path)}
              className="text-black hover:text-rose-600 transition-colors font-medium"
            >
              {link.label}
            </button>
          ))}
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
                    onClick={() => handleNavigate(`/product/${product.id}`)}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Wishlist */}
          <button onClick={() => handleNavigate("/wishlist")}>
            <Heart className="w-5 h-5 text-black hover:text-rose-700" />
          </button>

          {/* Cart */}
          <button onClick={() => handleNavigate("/cart")} className="relative">
            <ShoppingBag className="w-5 h-5 text-black hover:text-rose-700" />
            <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </button>

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
                <button
                  onClick={() => handleNavigate("/profile")}
                  className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full"
                >
                  <User className="w-4 h-4 mr-2" /> My Profile
                </button>
                <button
                  onClick={() => handleNavigate("/orders")}
                  className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full"
                >
                  <ClipboardList className="w-4 h-4 mr-2" /> Orders
                </button>
                <button
                  onClick={() => handleNavigate("/changepassword")}
                  className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full"
                >
                  <Key className="w-4 h-4 mr-2" /> Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
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
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center border border-gray-300 rounded px-3 py-1"
            >
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

            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavigate(link.path)}
                className="text-left text-black"
              >
                {link.label}
              </button>
            ))}

            <div className="flex space-x-4 mt-2">
              <button onClick={() => handleNavigate("/wishlist")}>
                <Heart className="w-5 h-5" />
              </button>
              <button onClick={() => handleNavigate("/cart")}>
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>

            {user ? (
              <>
                <button onClick={() => handleNavigate("/profile")}>My Profile</button>
                <button onClick={() => handleNavigate("/orders")}>Orders</button>
                <button onClick={() => handleNavigate("/changepassword")}>Change Password</button>
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
              <button onClick={handleLogin} className="text-left">
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default React.memo(Navbar);
