import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { getGenreById, getGenre } from "../services/Api";
import Genre from "../components/Genre";

const GenrePage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movieGenres, setMovieGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenreData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [moviesResponse, genresResponse] = await Promise.all([
          getGenreById(id),
          getGenre(),
        ]);

        const genre =
          genresResponse.find((g) => parseInt(g.id) === parseInt(id)) || null;

        setMovieGenres(moviesResponse);
        setSelectedGenre(genre);
      } catch (err) {
        console.error("Error fetching genre data:", err);
        setError("Failed to load genre data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGenreData();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen text-white flex flex-col items-center justify-center py-20 lg:py-14 px-3 md:px-10 lg:px-20 bg-black">
        {loading ? (
          <div id="loaderSection" className="loader-container">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-xl">{error}</p>
        ) : (
          <>
            <Genre />
            <div className="flex flex-col items-center gap-4 pt-3 md:pt-5">
              <h1 className="text-xl sm:text-2xl md:text-3xl flex gap-3 items-center lg:pt-5">
                <i className="fa-solid fa-star text-orange-600"></i>
                Genre {selectedGenre ? selectedGenre.name : "Unknown Genre"}
              </h1>

              <Card movies={movieGenres} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GenrePage;
