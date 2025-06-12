// Import necessary React hooks and components
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard"; // Component to display individual movie
import { searchMovies, getPopularMovies } from "../services/api"; // API service functions
import "../css/Home.css"; // Import CSS styles for the Home component

function Home() {
  // State to hold search input text
  const [searchQuery, setSearchQuery] = useState("");

  // State to hold movie results
  const [movies, setMovies] = useState([]);

  // State to hold any error messages
  const [error, setError] = useState(null);

  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Function to load popular movies from API
  const loadPopularMovies = async () => {
    setLoading(true); // Set loading while fetching
    try {
      const popularMovies = await getPopularMovies(); // Call API to get popular movies
      setMovies(popularMovies); // Update movies state
      setError(null); // Clear any existing errors
    } catch (err) {
      console.error("Error loading popular movies:", err);
      setError("Failed to load popular movies."); // Show error message
    } finally {
      setLoading(false); // Done loading
    }
  };

  // Load popular movies when the component mounts
  useEffect(() => {
    loadPopularMovies();
  }, []); // Empty dependency = runs once on initial render

  // Function to handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form refresh

    // Do nothing if search input is empty or whitespace
    if (!searchQuery.trim()) return;

    setLoading(true); // Start loading
    try {
      const results = await searchMovies(searchQuery); // Call API to search
      setMovies(results); // Update movie list
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search movies."); // Show error message
    } finally {
      setLoading(false); // Done loading
    }
  };

  // When search query is cleared, reload popular movies
  useEffect(() => {
    if (searchQuery.trim() === "") {
      loadPopularMovies();
    }
  }, [searchQuery]); // Runs every time `searchQuery` changes

  return (
    <div className="home">
      {/* Search form */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update input state
          aria-label="Search movies"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Display error message if any */}
      {error && <div className="error-message">{error}</div>}

      {/* Conditional rendering based on loading and movie results */}
      {loading ? (
        <div className="loading">Loading...</div> // Show loading message
      ) : movies.length === 0 ? (
        <div className="no-results">No movies found.</div> // No results message
      ) : (
        <div className="movies-grid">
          {/* Render list of MovieCard components */}
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home; // Export the Home component
