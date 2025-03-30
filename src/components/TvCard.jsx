import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFavoritesContext } from "../context/FavoritesContext";

const TvCard = ({ tvShows }) => {
  const [imageLoad, setImageLoad] = useState({});

  const { favorites, addToFavorites, removeFromFavorites } =
    useFavoritesContext();

  const isFavorite = (movie) => favorites.some((fav) => fav.id === movie.id);

  const handleImageLoad = (id) => {
    setImageLoad((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="min-h-screen">
      {tvShows && tvShows.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 place-items-center">
          {tvShows.map((movie, index) => (
            <div
              className="flex flex-col gap-2 w-full relative "
              key={`${movie.id}-${index}`}
            >
              <Link
                to={`/tvShows/details/${movie.id}`}
                className="flex justify-center items-stretch relative group"
              >
                {!imageLoad[movie.id] && (
                  <div className="skeleton aspect-[2/3] w-full bg-gray-300 animate-pulse rounded-lg"></div>
                )}
                <img
                  className="object-contain rounded-lg"
                  src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
                  alt={movie.title}
                  onLoad={() => handleImageLoad(movie.id)}
                  style={{
                    display: imageLoad[movie.id] ? "block" : "none",
                  }}
                />
              </Link>

              {isFavorite(movie) ? (
                <button
                  className="absolute top-0 right-1 text-2xl rounded-full text-red-600 p-1"
                  onClick={() => removeFromFavorites(movie.id)}
                >
                  <i className="fa-solid fa-heart"></i>
                </button>
              ) : (
                <button
                  className="absolute top-0 right-1 text-2xl rounded-full text-red-600 p-1"
                  onClick={() => addToFavorites(movie)}
                >
                  <i className="fa-regular fa-heart"></i>
                </button>
              )}

              <div className="text-center flex flex-col items-center justify-center min-h-20">
                <p className="text-white text-xs sm:text-sm">{movie.name}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen w-full">
          <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold">
            <i className="fa-solid fa-clapperboard text-orange-600 "></i> No TV
            Shows found.
          </h1>
        </div>
      )}
    </div>
  );
};

export default TvCard;
