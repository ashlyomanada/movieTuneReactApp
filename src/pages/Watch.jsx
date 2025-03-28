import { useState, useEffect } from "react";
import { getSelectedMovieDetails } from "../services/Api.js";
import { useParams, useNavigate } from "react-router-dom";

const Watch = () => {
  const [link, setLink] = useState(null);
  const { id, server } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getSelectedMovie = async () => {
      try {
        const response = await getSelectedMovieDetails(id);
        if (!response) {
          setLink(null);
          return;
        }

        switch (server) {
          case "server1":
            setLink(response.streaming_site_1 || null);
            break;
          case "server2":
            setLink(response.streaming_site_2 || null);
            break;
          case "server3":
            setLink(response.streaming_site_3 || null);
            break;
          default:
            setLink(null);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLink(null);
      }
    };

    getSelectedMovie();
  }, [id, server]); // Added dependencies

  return (
    <div className="min-h-screen flex flex-col bg-black relative">
      {link ? (
        <div className="h-screen w-screen p-3 ">
          <iframe
            className="h-full"
            width="100%"
            src={link}
            title={`Movie Stream - ${id} - ${server}`} // ✅ Added unique title
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div id="loaderSection" className="loader-container">
            <div className="loader"></div>
          </div>
          {link === null && (
            <h1 className="text-xl text-white mt-4">No link available</h1>
          )}
        </div>
      )}

      <button
        className="z-50 absolute top-5 left-5 p-2 text-white text-2xl md:text-3xl lg:text-4xl"
        onClick={() => navigate(-1)}
      >
        <i className="fa-solid fa-house"></i>
      </button>
    </div>
  );
};

export default Watch;
