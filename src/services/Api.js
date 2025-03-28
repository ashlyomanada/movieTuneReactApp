// Search Movies by Name
export async function searchMovies(searchQuery) {
  const response = await fetch(
    `https://express-api-two-taupe.vercel.app/api/v1/movies/search?query=${searchQuery}`
  );
  const data = await response.json();
  return data;
}

// Fetch Now Playing Movies
export async function getNowPlaying() {
  const response = await fetch(
    `https://express-api-two-taupe.vercel.app/api/v1/movies/now_playing`
  );
  const data = await response.json();
  return data;
}

// Find Movies by Genre
export async function getGenreById(id) {
  const response = await fetch(
    `https://express-api-two-taupe.vercel.app/api/v1/movies/genres/${id}`
  );
  const data = await response.json();
  return data;
}

// Get Movie Genre List
export async function getGenre() {
  const response = await fetch(
    `https://express-api-two-taupe.vercel.app/api/v1/movies/genres`
  );
  const data = await response.json();
  return data;
}

// Get Popular Movies
export async function getPopularMovies() {
  const response = await fetch(
    `https://express-api-two-taupe.vercel.app/api/v1/movies/popular`
  );
  const data = await response.json();
  return data;
}

// Get Movie Details by ID
export async function getSelectedMovieDetails(selectedMovieId) {
  const response = await fetch(
    `https://express-api-two-taupe.vercel.app/api/v1/movies/${selectedMovieId}`
  );
  const data = await response.json();
  return data;
}
// Get Top Rated Movies
export async function getTopRatedMovies() {
  const response = await fetch(
    `https://express-api-two-taupe.vercel.app/api/v1/movies/top-rated`
  );
  const data = await response.json();
  return data;
}

// Get Home Page
export async function getHomepage() {
  const response = await fetch(
    `https://movieapp-zyqr.onrender.com/api/v2/tvshows`
  );
  const data = await response.json();
  return data;
}

// Get TV Show Overview
export async function getTvShowOverview(id) {
  const response = await fetch(
    `https://movieapp-zyqr.onrender.com/api/v2/tvshows_overview/${id}`
  );
  const data = await response.json();
  return data;
}

// Find TV Shows
export async function findTvShow(query) {
  const response = await fetch(
    `https://movieapp-zyqr.onrender.com/api/v2/find_tvshows/${query}`
  );
  const data = await response.json();
  return data;
}

// Find Movies and TV Shows
export async function findMovieAndTvShows(query) {
  const response = await fetch(
    `https://movieapp-zyqr.onrender.com/api/v2/all_series/${query}`
  );
  const data = await response.json();
  return data;
}
