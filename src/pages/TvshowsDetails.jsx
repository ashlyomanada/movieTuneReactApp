import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getTvShowOverview } from "../services/Api.js";
import Loader from "../components/Loader";

const TvshowsDetails = () => {
  const [details, setDetails] = useState({});
  const [seasons, setSeasons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchTvShowDetails = async () => {
    try {
      const response = await getTvShowOverview(id);
      setDetails(response);
      setSeasons(response.seasons);
    } catch (error) {
      console.error("Error fetching TV show details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTvShowDetails();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="min-h-screen flex flex-col bg-black">
      {/* 🎥 TV Show Overview Section */}
      <div className="min-h-screen bg-[rgba(0,0,0,0.5)] flex justify-center">
        <div className="flex flex-col lg:flex-row justify-center items-center md:gap-4">
          <div className="hidden w-full lg:flex justify-center lg:w-auto p-3">
            <img
              src={`https://image.tmdb.org/t/p/w1280${details.poster_path}`}
              alt={details.original_name}
              className="flex justify-self-start h-52 md:h-96 object-contain"
            />
          </div>

          <div className="text-white flex flex-col items-start w-full px-3 lg:px-0 lg:w-2/3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
              {details.original_name}
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg mt-3">
              Overview: {details.overview}
            </p>

            {/* 🎭 Genres */}
            <div className="flex gap-3 flex-wrap items-center mt-4">
              {details.Genres &&
                details.Genres.map((genre, index) => (
                  <button
                    key={index}
                    className="bg-[#1f1f1f] py-2 px-3 rounded-full text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium"
                  >
                    {genre}
                  </button>
                ))}
            </div>

            <div className="flex gap-3 flex-wrap items-center mt-4">
              {seasons.map((seasons, index) => (
                <Link
                  to={`/tvShows/${id}/season/${seasons.season_number}/episodes`}
                  key={index}
                  className="bg-orange-700 py-2 px-3 rounded-full text-white no-underline text-sm sm:text-base md:text-lg lg:text-xl font-medium"
                >
                  Season {seasons.season_number}
                </Link>
              ))}
            </div>

            {/* 🔙 Back Button */}
            <div className="flex gap-2 items-center pb-5">
              <button
                className="py-2 px-4 mt-4 rounded-md bg-[#1f1f1f] text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvshowsDetails;
