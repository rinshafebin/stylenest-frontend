import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import CartWishlistButtons from "./CartWishlistButtons";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const Navbar = () => {
  const { user, cartCount, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
      setIsMobileMenuOpen(false);
    },
    [navigate]
  );

  // Logout handler using AuthContext
  const handleLogout = useCallback(() => {
    logout();          
    navigate("/");     
  }, [logout, navigate]);

  const handleLogin = useCallback(() => navigate("/login"), [navigate]);

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          <NavLinks handleNavigate={handleNavigate} />
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center space-x-3">
          <SearchBar />

          <CartWishlistButtons 
            handleNavigate={handleNavigate} 
            cartCount={cartCount} 
          />

          <UserMenu
            user={user}
            handleNavigate={handleNavigate}
            handleLogout={handleLogout}
            handleLogin={handleLogin}
          />
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="flex flex-col px-4 py-2 space-y-3">
            <NavLinks handleNavigate={handleNavigate} />
            <SearchBar />
            <CartWishlistButtons 
              handleNavigate={handleNavigate} 
              cartCount={cartCount} 
            />
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-500 font-medium py-2"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="w-full text-left text-rose-500 font-medium py-2"
              >
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
