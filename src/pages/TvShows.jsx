import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getHomepage } from "../services/Api";
import TvCard from "../components/TvCard";
import { useToggleContext } from "../context/ToggleContext";
import { findTvShow } from "../services/Api";
import Loader from "../components/Loader";
import Button from "../components/Button";
const TvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [curShows, setCurShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isNavShow } = useToggleContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);

  const fetchTvShows = async () => {
    setLoading(true);
    try {
      const response = await getHomepage();
      setTvShows(response);
      setCurShows(response);
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceTimer) clearTimeout(debounceTimer);

    const newTimer = setTimeout(async () => {
      if (value.trim() === "") {
        setTvShows(curShows);
      } else {
        try {
          const response = await findTvShow(value);
          setTvShows(response);
        } catch (error) {
          console.error("Search failed:", error);
        }
      }
    }, 500);

    setDebounceTimer(newTimer);
  };

  useEffect(() => {
    fetchTvShows();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen text-white flex flex-col items-center justify-center py-20 lg:py-14 lg:px-20 bg-black">
          <div className="flex flex-col items-center pt-3 md:pt-5">
            <div
              className={`${
                isNavShow ? "flex" : "hidden"
              } justify-center pt-3 pb-3 sticky top-14 bg-black z-10 w-full`}
            >
              <form
                className="flex flex-wrap gap-2 items-stretch justify-center"
                onSubmit={(e) => e.preventDefault()} // Prevent form submission
              >
                <input
                  type="text"
                  className="py-2 px-3 w-[65%] md:w-auto rounded-md bg-white text-xl text-black"
                  placeholder="Search for TV shows..."
                  onChange={handleSearch} // Dynamic search while typing
                  value={searchQuery}
                />
                <Button type="submit">
                  <i className="flex md:hidden fa-solid fa-magnifying-glass"></i>
                  <span className="hidden md:flex">Search</span>
                </Button>
              </form>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold flex gap-3 items-center text-white lg:pb-4">
              <i className="fa-solid fa-star text-orange-600"></i> TV Shows
            </h1>
            <TvCard tvShows={tvShows} />
          </div>
        </div>
      )}
    </>
  );
};

export default TvShows;
