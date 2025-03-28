const APIKEY = "04c35731a5ee918f014970082a0088b1";
// const IMGPATH = "https://image.tmdb.org/t/p/w1280/";

export const getEpisodes = async (tv_id, season_number) => {
  const url = `https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}?api_key=${APIKEY}&language=en-US`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// Get Movie Credits (Cast and Crew Only)
export const getMovieCasts = async (id) => {
  const response =
    await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIKEY}
`);
  const data = await response.json();
  return data;
};

// Get Movie Videos (Trailers, Clips, etc.)
export const getMovieTrailer = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}`
  );
  const data = response.json();
  return data;
};

// Get Similar Movies
export const getSimilarMovies = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${APIKEY}`
  );
  const data = response.json();
  return data;
};

// Get Recommendations
export const getRecommendations = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${APIKEY}`
  );
  const data = response.json();
  return data;
};

// Get Cast details
export const getCastDetails = async (castId) => {
  const response =
    await fetch(`https://api.themoviedb.org/3/person/${castId}?api_key=${APIKEY}&language=en-US
`);
  const data = await response.json();
  return data;
};

// Get Cast Movies
export const getCastMovies = async (castId) => {
  const response =
    await fetch(`https://api.themoviedb.org/3/person/${castId}/movie_credits?api_key=${APIKEY}&language=en-US

`);
  const data = await response.json();
  return data;
};

// Get Cast Tv Shows
export const getCastTvShows = async (castId) => {
  const response =
    await fetch(`https://api.themoviedb.org/3/person/${castId}/tv_credits?api_key=${APIKEY}&language=en-US
`);
  const data = await response.json();
  return data;
};
