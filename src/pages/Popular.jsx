import React from "react";
import { useState, useEffect } from "react";
import { getPopularMovies } from "../services/Api.js";
import Card from "../components/Card.jsx";
import Navbar from "../components/Navbar.jsx";
import Loader from "../components/Loader.jsx";

const Popular = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPopular = async () => {
    try {
      const response = await getPopularMovies();
      setPopularMovies(response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPopular();
  }, []);
  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen text-white flex flex-col items-center justify-center py-20 lg:py-14 lg:px-20 bg-black">
          <div className="flex flex-col items-center gap-4 pt-3 md:pt-5 ">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold flex gap-3 items-center lg:pt-5">
              <i className="fa-solid fa-fire text-orange-600"></i> Popular
              Movies
            </h1>
            <Card movies={popularMovies} />
          </div>
        </div>
      )}
    </>
  );
};

export default Popular;
