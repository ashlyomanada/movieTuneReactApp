import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getCastDetails,
  getCastMovies,
  getCastTvShows,
} from "../services/Tmdb";
import Loader from "./Loader";
import Card from "./Card";
import TvCard from "./TvCard";

const CastDetails = () => {
  const navigate = useNavigate();
  const [cast, setCast] = useState([]);
  const [castMovies, setCastMovies] = useState([]);
  const [castTvShows, setCastTvShows] = useState([]);
  const { castId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const castMovieSection = useRef(null);

  useEffect(() => {
    const fetchCastDetails = async () => {
      setIsLoading(true);
      try {
        const response = await getCastDetails(castId);
        const responseMovies = await getCastMovies(castId);
        const responseTvShows = await getCastTvShows(castId);
        setCast(response);
        setCastMovies(responseMovies.cast);
        setCastTvShows(responseTvShows.cast);
        // console.log(responseTvShows.cast);
      } catch (error) {
        console.error(error);
        setIsLoading(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCastDetails();
  }, [castId]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionTop = castMovieSection.current
        ? castMovieSection.current.offsetTop
        : 300;
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
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen flex flex-col px-3 md:px-10 lg:px-20 pb-20 md:pt-10 bg-black relative">
          <div className="w-full flex flex-col py-3 lg:py-10 lg:flex-row gap-5">
            <div className="flex items-center lg:h-full lg:w-[25%]">
              <img
                className="h-64 md:h-80 aspect-[2/3] lg:h-auto rounded-lg"
                src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                alt=""
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-3 lg:h-full lg:w-[75%]">
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-orange-600 font-bold">
                {cast.name}
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-white">
                {cast.biography || "Biography : No Biography"}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-white">
                Birthday : {cast.birthday || "No Birthday to show"}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-white">
                Place of Birth : {cast.place_of_birth || "No Place of Birth"}
              </p>

              <div className="flex gap-3">
                <Link
                  className="py-2 px-4 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl font-medium bg-[#1f1f1f] no-underline text-white"
                  to="/"
                >
                  <i className="fa-solid fa-house"></i>
                </Link>
                <button
                  className="py-2 px-4 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl font-medium bg-[#1f1f1f] text-white"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col items-start justify-center lg:pt-5 min-h-screen gap-5"
            ref={castMovieSection}
          >
            <div className="flex  w-full flex-col items-start gap-5">
              <h3 className="text-orange-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                Movies
              </h3>
              <Card movies={castMovies} />
            </div>

            <div className="flex h-[50%] flex-col items-start gap-5">
              <h3 className="text-orange-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                Tv Shows
              </h3>
              <TvCard tvShows={castTvShows} />
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className={`${
              isScrolled
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            } fixed right-5 bottom-5 text-white bg-orange-600 rounded-full px-4 py-3 shadow-md transition-all duration-300`}
          >
            <i className="fa-solid fa-angle-up"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default CastDetails;
