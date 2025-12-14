import css from "./App.module.css";

import type {Movie} from "../../types/movie";

import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("")
  
  const { data, isLoading, isError} = useQuery({
    queryKey: [query, page],
    queryFn:  () => fetchMovies(query, page),
    enabled: query !== ""
  })

useEffect(() => {
  if (data?.results.length === 0){
    toast("No movies for your request.")
  }
}, [data])


  const handleSearch  = (searchQuery:  string) => {
    setQuery(searchQuery);
    setPage(1)
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-center" />
      {isLoading && <Loader/>}
      {isError && <ErrorMessage/>}
      {data && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
      />
      )}
      {!isLoading && !isError && data?.results && data?.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={setSelectedMovie} />
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
