// src/services/api.js

// Load environment variables
const API_KEY = import.meta.env.VITE_API_KEY; // 🔐 API key from .env
const BASE_URL = import.meta.env.VITE_BASE_URL; // TMDB base URL

// Helper function to handle fetch responses
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (err) {
    console.error("API fetch error:", err);
    throw err; // Let the component handle the error
  }
};

// Fetch popular movies
export const getPopularMovies = async () => {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
  return fetchData(url);
};

// Search for movies by query
export const searchMovies = async (query) => {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}`;
  return fetchData(url);
};
