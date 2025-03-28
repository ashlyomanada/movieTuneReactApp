import Card from "../components/Card";
import { searchMovies, getNowPlaying } from "../services/Api";
import { useEffect, useState } from "react";
import LandingPage from "../components/LandingPage";
import Navbar from "../components/Navbar";
import Genre from "../components/Genre";
import { useToggleContext } from "../context/ToggleContext";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Header from "../components/typography/Header";
function Home() {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomImage, setRandomImage] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const { isNavShow } = useToggleContext();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await getNowPlaying();
        setMovies(response);
        setTrendingMovies(response);
        const first3Movies = response.slice(0, 10);
        setRandomImage(first3Movies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  const handleInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceTimer) clearTimeout(debounceTimer);

    const newTimer = setTimeout(async () => {
      if (value.trim() === "") {
        setMovies(trendingMovies);
        setIsSearch(false);
      } else {
        try {
          const response = await searchMovies(value);
          setMovies(response);
          setIsSearch(true);
        } catch (error) {
          console.error("Search failed:", error);
        }
      }
    }, 500);

    setDebounceTimer(newTimer);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen ">
        {loading ? (
          <Loader />
        ) : (
          <>
            <LandingPage randomImage={randomImage} />
            <div className="flex flex-col items-start lg:px-20 bg-black text-white">
              <div className="flex pt-10 bg-black w-full">
                <Genre />
              </div>
              <div id="moviesSection" style={{ background: "black" }}>
                <div
                  className={`${
                    isNavShow ? "flex" : "hidden"
                  }  justify-center pt-4 pb-3 sticky top-14 bg-black z-10`}
                >
                  <form
                    className="flex flex-wrap gap-2 items-stretch justify-center"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      type="text"
                      className="py-2 px-3 w-[65%] md:w-auto rounded-md bg-white text-xl text-black"
                      placeholder="Search for movies..."
                      onChange={handleInput}
                      value={searchQuery}
                    />
                    <Button>
                      <i className="flex md:hidden fa-solid fa-magnifying-glass"></i>
                      <span className="hidden md:flex text-md">Search</span>
                    </Button>
                  </form>
                </div>

                <div className="flex justify-center items-center py-3 lg:py-5">
                  {isSearch ? (
                    <Header>Results for "{searchQuery}"</Header>
                  ) : (
                    <Header>
                      <i className="fa-solid fa-fire-flame-curved text-orange-600"></i>
                      Now Playing
                    </Header>
                  )}
                </div>

                <div className="px-3 md:px-10">
                  <Card movies={movies} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
