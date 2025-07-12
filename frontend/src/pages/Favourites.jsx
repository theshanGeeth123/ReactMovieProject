import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContexts";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  const hasFavorites = favorites && favorites.length > 0;

  return (
    <div className="favorites">
      <h2>Your Favorites</h2>
      {hasFavorites ? (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div className="favorites-empty">
          <h3>No Favorite Movies Yet</h3>
          <p>Start adding movies to your favorites and they will appear here!</p>
        </div>
      )}
    </div>
  );
}

export default Favorites;
