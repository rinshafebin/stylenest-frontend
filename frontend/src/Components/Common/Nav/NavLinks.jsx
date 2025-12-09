import React, { useMemo } from "react";

export default React.memo(function NavLinks({ handleNavigate }) {
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
    <>
      {navLinks.map((link) => (
        <button
          key={link.path}
          onClick={() => handleNavigate(link.path)}
          className="text-black text-sm sm:text-base px-2 sm:px-3 py-1 rounded hover:bg-gray-100 hover:text-rose-600 transition-colors font-medium"
        >
          {link.label}
        </button>
      ))}
    </>
  );
});
