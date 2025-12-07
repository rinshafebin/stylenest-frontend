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
  const { user, cartCount } = useAuth();            
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
      setIsMobileMenuOpen(false);
    },
    [navigate]
  );

  const handleLogout = useCallback(() => navigate("/logout"), [navigate]);
  const handleLogin = useCallback(() => navigate("/login"), [navigate]);

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        <Logo />

        <nav className="hidden lg:flex items-center space-x-8">
          <NavLinks handleNavigate={handleNavigate} />
        </nav>

        <div className="hidden lg:flex items-center space-x-3">
          <SearchBar />

          {/* ✅ Passing cartCount from context */}
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
    </header>
  );
};

export default React.memo(Navbar);
