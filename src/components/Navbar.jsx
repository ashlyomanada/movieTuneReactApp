import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useToggleContext } from "../context/ToggleContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isNavShow, toggleLink, toggleNav } = useToggleContext();

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector("#moviesSection");
      const sectionTop = section ? section.offsetTop : 0;

      if (window.scrollY >= sectionTop - 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className="h-16 flex justify-between items-center fixed w-screen text-white px-5 md:px-10 lg:px-20 py-5 z-50"
      style={{
        backgroundColor: isScrolled ? "black" : "transparent",
        transition: "background-color 0.3s ease-in-out", // Smooth transition
      }}
    >
      <div className="">
        <h5
          className="text-lg lg:text-xl font-medium"
          style={{ textShadow: "2px 2px 4px #000" }}
        >
          MovieTune
        </h5>
      </div>

      <ul
        className={`${
          isNavShow ? "-left-full opacity-0" : "left-0 opacity-100"
        } absolute h-screen w-screen top-0 gap-10 lg:h-auto lg:w-auto lg:opacity-100 lg:static flex flex-col items-center justify-center bg-black lg:bg-transparent lg:flex-row lg:gap-12 xl:gap-16 transition-all duration-500 ease-in-out`}
      >
        {[
          { path: "/", name: "Home" },
          { path: "/movies/popular", name: "Popular" },
          { path: "/movies/top-rated", name: "Movies" },
          { path: "/movies/tv-shows", name: "TV Shows" },
          { path: "/movies/favorites", name: "Favorites" },
        ].map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `anchor ${
                  isActive
                    ? "border-b-4 border-orange-600"
                    : "hover:border-orange-600"
                } transition-all duration-300 text-sm sm:text-base md:text-lg lg:text-sm font-medium`
              }
              onClick={() => toggleLink()}
              style={{ textShadow: "2px 2px 4px #000" }}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        className="lg:hidden z-50 text-xl font-medium"
        onClick={toggleNav}
        style={{ textShadow: "2px 2px 4px #000" }}
      >
        {isNavShow ? (
          <i className="fa-solid fa-bars"></i>
        ) : (
          <i className="fa-solid fa-x"></i>
        )}
      </button>
    </nav>
  );
};

export default Navbar;
