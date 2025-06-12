// Import the CSS styles specific to the Favorites component
import "../css/Favorites.css";

// Import the custom context hook to access movie favorites
import { useMovieContext } from "../contexts/MovieContext";

// Import the component used to render each individual movie
import MovieCard from "../components/MovieCard";

function Favorites() {
  // Destructure the `favorites` list from the MovieContext
  const { favorites } = useMovieContext();

  // If the favorites list exists (even if empty), render the favorites section
  if (favorites) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {/* Loop through each movie in the favorites list and display it using MovieCard */}
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  // If the favorites list is null or undefined (unlikely but safe fallback), show a message
  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here!</p>
    </div>
  );
}

// Export the Favorites component so it can be used in other parts of the app
export default Favorites;
