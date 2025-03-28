import React, { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export const useLoaderContext = () => useContext(LoaderContext);

const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
