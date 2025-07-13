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


      // Optional: Scroll to bottom
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
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


  //   const movies = [
  //     { id: 1, title: "John wick", release_date: "2020" },
  //     { id: 2, title: "Terminator", release_date: "2000" },
  //     { id: 3, title: "The matrix", release_date: "1999" },
  //   ];

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
      setError("Failed to serch movies...");
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

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map(
            (movie) =>
              movie.title.toLowerCase().startsWith(searchQuery) && (
                <MovieCard movie={movie} key={movie.id} />
              )
          )}
        </div>
      )}

      {!searchQuery && !loading && (
        <button
          className="load-more"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default Home;
