import React, { useEffect, useState } from "react";
import { getMovieTrailer } from "../services/Tmdb.js";
import { Link, useParams, useNavigate } from "react-router-dom";

const TrailerPage = () => {
  const [trailerKey, setTrailerKey] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrailer = async () => {
      const trailerResponse = await getMovieTrailer(id);
      if (trailerResponse) {
        const result = trailerResponse.results.find(
          (trailer) =>
            trailer?.type === "Trailer" &&
            trailer?.official === true &&
            trailer?.site === "YouTube"
        );
      }
      setTrailerKey(result?.key);
      //   console.log(trailerResponse.results);
    };

    fetchTrailer();
  }, []);
  return (
    <div className="min-h-screen w-full flex flex-col items-start gap-5 justify-center lg:w-auto p-3 md:p-10 lg:p-0 bg-black">
      {trailerKey !== null ? (
        <iframe
          className="h-full aspect-video w-full"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1&modestbranding=1&rel=0&iv_load_policy=3&fs=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="skeleton h-screen aspect-video w-full bg-gray-300 animate-pulse rounded-lg"></div>
      )}

      <div className="flex gap-5 px-5 pb-5">
        <Link
          to="/"
          className="py-2 px-5 bg-[#1f1f1f] rounded-lg flex gap-3 items-center justify-center"
        >
          <i class="fa-solid fa-house"></i>{" "}
          <span className="hidden md:flex">Home</span>
        </Link>
        <button
          className="py-2 px-5 bg-[#1f1f1f] rounded-lg"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TrailerPage;
