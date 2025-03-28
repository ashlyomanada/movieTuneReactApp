import React, { useState, useEffect } from "react";
import { getTopRatedMovies } from "../services/Api";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Header from "../components/typography/Header";

const Movies = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopRatedMovies = async () => {
    setLoading(true);
    try {
      const response = await getTopRatedMovies();
      setTopRatedMovies(response);
    } catch (e) {
      console.error("Error fetching top movies:", e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTopRatedMovies();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen text-white flex flex-col items-center justify-center py-20 lg:py-14 lg:px-20 bg-black">
          <div className="flex flex-col items-center gap-4 pt-3 md:pt-5">
            <Header>
              <i className="fa-solid fa-star text-orange-600"></i> Top Rated
              Movies
            </Header>
            <div className="px-3 md:px-10">
              <Card movies={topRatedMovies} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Movies;
