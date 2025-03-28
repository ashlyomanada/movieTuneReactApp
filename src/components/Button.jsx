import React from "react";

const Button = ({ children }) => {
  return (
    <button className="flex items-center justify-center gap-2 px-5 py-2 bg-orange-600 text-white rounded-md text-sm sm:text-base md:text-lg lg:text-xl font-medium">
      {children}
    </button>
  );
};

export default Button;
