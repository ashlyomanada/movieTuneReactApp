import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getMovieCasts } from "../services/Tmdb";
import Header from "../components/typography/Header";

const Casts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [casts, setCasts] = useState([]);
  const [imageLoad, setImageLoad] = useState({});

  const fetchCasts = async () => {
    const response = await getMovieCasts(id);
    setCasts(response.cast);
    // console.log(response.cast);
  };

  const handleImageLoad = (id) => {
    setImageLoad((prev) => ({ ...prev, [id]: true }));
  };
  useEffect(() => {
    fetchCasts();
  }, [id]);
  return (
    <div className="min-h-screen p-20 bg-black text-white flex flex-col items-start gap-3">
      <div className="flex justify-between w-full items-center">
        <Header>Casts</Header>
        <button
          className="py-2 px-4 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl font-medium bg-[#1f1f1f]"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      <div className="grid grid-cols-10 gap-3">
        {casts.map((cast) => (
          <Link
            to={`/movies/details/${id}/casts/${cast.id}/biography`}
            className="flex flex-col items-center gap-1 text-white no-underline"
            key={cast.cast_id}
          >
            {!imageLoad[cast.cast_id] && (
              <div className="skeleton aspect-[2/3] w-full bg-gray-300 animate-pulse"></div>
            )}
            <img
              src={`https://image.tmdb.org/t/p/w1280/${cast.profile_path}`}
              alt=""
              onLoad={() => handleImageLoad(cast.cast_id)}
              style={{
                display: imageLoad[cast.cast_id] ? "block" : "none",
              }}
            />
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-center">
              {cast.original_name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Casts;
