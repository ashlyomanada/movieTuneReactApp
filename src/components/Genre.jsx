import React from "react";
import { getGenre } from "../services/Api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
const Genre = () => {
  const [genre, setGenre] = useState([]);
  const fetchGenre = async () => {
    const response = await getGenre();
    // console.log(response);
    setGenre(response);
  };

  useEffect(() => {
    fetchGenre();
  }, []);
  return (
    <>
      <div className="lg:hidden carousel carousel-end rounded-box flex gap-3 w-full ">
        {genre.map((gen) => (
          <div className="carousel-item" key={gen.id}>
            <Button>
              <Link
                to={`/movies/genre/${gen.id}`}
                className="text-xs no-underline"
              >
                {gen.name}
              </Link>
            </Button>
          </div>
        ))}
      </div>

      <div className="hidden lg:flex items-center justify-center flex-wrap gap-3 pt-10 px-5 md:px-10 lg:px-0">
        {genre.map((gen) => (
          <Button key={gen.id}>
            <Link
              to={`/movies/genre/${gen.id}`}
              key={gen.id}
              className="text-xs no-underline"
            >
              {gen.name}
            </Link>
          </Button>
        ))}
      </div>
    </>
  );
};

export default Genre;
