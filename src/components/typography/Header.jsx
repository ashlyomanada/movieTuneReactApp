import React from "react";

const Header = ({ children }) => {
  return (
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold flex gap-2 items-center text-white py-2 lg:py-3">
      {children}
    </h1>
  );
};

export default Header;
