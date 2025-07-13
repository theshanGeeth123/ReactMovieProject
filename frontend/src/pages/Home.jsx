import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api.js";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadMoreClicked, setLoadMoreClicked] = useState(false);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setLoading(true);
        const popularMovies = await getPopularMovies(page);
        setMovies((prevMovies) => {
          const existingIds = new Set(prevMovies.map((m) => m.id));
          const newUniqueMovies = popularMovies.filter(
            (m) => !existingIds.has(m.id)
          );
          return [...prevMovies, ...newUniqueMovies];
        });

        // ✅ Only scroll to bottom if Load More was clicked
        if (loadMoreClicked) {
          setTimeout(() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
            setLoadMoreClicked(false); // Reset
          }, 100);
        }

      } catch (error) {
        console.log(error);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    if (!searchQuery) {
      loadPopularMovies();
    }
  }, [page]);

  const handleSerch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (error) {
      console.log(error);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSerch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading && page === 1 ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map(
            (movie) =>
              movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
                <MovieCard movie={movie} key={movie.id} />
              )
          )}
        </div>
      )}

      {!searchQuery && !loading && (
        <button
          className="load-more"
          onClick={() => {
            setLoadMoreClicked(true);
            setPage((prev) => prev + 1);
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default Home;
