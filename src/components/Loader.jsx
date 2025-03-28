import React from "react";

const Loader = () => {
  return (
    <div
      id="loaderSection"
      className="loader-container h-screen w-full flex items-center justify-center bg-black"
    >
      <div className="loader text-white"></div>
    </div>
  );
};

export default Loader;
