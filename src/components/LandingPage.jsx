import { Link } from "react-router-dom";
import Button from "./Button";
const LandingPage = ({ randomImage }) => {
  return (
    <>
      <div className="carousel h-screen w-full ">
        {randomImage.map((movie, index) => (
          <div
            key={index}
            id={`slide${index + 1}`} // Unique ID for each slide
            className="carousel-item relative w-full"
          >
            <div className="absolute left-20 md:left-40 lg:left-60 w-[50%] h-screen text-white flex flex-col justify-center items-start gap-3 lg:gap-5">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
                style={{ textShadow: "2px 2px 4px #000" }}
              >
                {movie.title}
              </h1>

              <Button>
                {" "}
                <Link
                  to={`/movies/details/${movie.id}`}
                  className="no-underline"
                >
                  Watch Now
                </Link>
              </Button>
            </div>
            <img
              src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
              className="w-full object-cover h-full" // Optional height for consistency
              alt={movie.title}
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href={`#slide${index === 0 ? randomImage.length : index}`}
                className="btn btn-circle hover:bg-transparent hover:border-transparent hover:border-none bg-transparent border border-transparent text-2xl"
                style={{ textShadow: "2px 2px 4px #000" }}
              >
                ❮
              </a>
              <a
                href={`#slide${
                  index === randomImage.length - 1 ? 1 : index + 2
                }`}
                className="btn btn-circle hover:bg-transparent hover:border-transparent hover:border-none bg-transparent border border-transparent text-2xl"
                style={{ textShadow: "2px 2px 4px #000" }}
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LandingPage;
