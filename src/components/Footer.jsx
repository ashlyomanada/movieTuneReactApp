import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-5">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start mb-5 md:mb-0">
            <h1 className="text-2xl font-bold text-orange-500">
              Movie<span className="text-white">TuneApp</span>
            </h1>
            <p className="text-white text-sm text-center md:text-left mt-2">
              Your ultimate destination for movies and TV shows.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-5 justify-center md:justify-start">
            <a
              href="/about"
              className="text-white hover:text-orange-500 transition duration-300"
            >
              Home
            </a>
            <a
              href="/contact"
              className="text-white hover:text-orange-500 transition duration-300"
            >
              Popular
            </a>
            <a
              href="/privacy-policy"
              className="text-white hover:text-orange-500 transition duration-300"
            >
              Movies
            </a>
            <a
              href="/terms"
              className="text-white hover:text-orange-500 transition duration-300"
            >
              Favorites
            </a>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex justify-center gap-5 mt-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-orange-500 transition duration-300 text-xl"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-orange-500 transition duration-300 text-xl"
          >
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-orange-500 transition duration-300 text-xl"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-orange-500 transition duration-300 text-xl"
          >
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-gray-500 text-sm mt-6">
          &copy; {new Date().getFullYear()} MovieTuneApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
