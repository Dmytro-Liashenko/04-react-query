import css from "./App.module.css";

import type {Movie} from "../../types/movie";

import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch  = async (query: string) => {
    setMovies([]);
    setError(false);
    setLoading(true);

    try {
      const result = await fetchMovies(query);
      if (result.length === 0) {
        toast("No movies found for your request.");
      }
      setMovies(result);
    } catch  {
      setError(true);
      toast("Error, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch } />
      <Toaster position="top-center" />
      {loading && <Loader/>}
      {error && <ErrorMessage/>}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
