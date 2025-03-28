import React from "react";
import { createContext, useContext, useState } from "react";

const NavbarToggleContext = createContext();
export const useToggleContext = () => useContext(NavbarToggleContext);

const ToggleContext = ({ children }) => {
  const [isNavShow, setIsNavShow] = useState(true);
  const toggleNav = () => {
    setIsNavShow(!isNavShow);
  };

  const toggleLink = () => {
    setIsNavShow(true);
  };

  return (
    <NavbarToggleContext.Provider value={{ isNavShow, toggleLink, toggleNav }}>
      {children}
    </NavbarToggleContext.Provider>
  );
};

export default ToggleContext;
