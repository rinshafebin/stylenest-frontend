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
          className="text-black hover:text-rose-600 transition-colors font-medium"
        >
          {link.label}
        </button>
      ))}
    </>
  );
});
