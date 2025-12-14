import axios from "axios";
import type Movie from "../../src/types/movie";

const myKey = import.meta.env.VITE_API_KEY;

interface TmdbSearchResponse {
    results: Movie[];
}

export default async function fetchMovies(query: string): Promise<Movie[]> {
    const url = "https://api.themoviedb.org/3/search/movie";
    const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${myKey}`,
    },
    params: {
        query,
    },
    };
    const response = await axios.get<TmdbSearchResponse>(url, options);
    const movies = response.data.results;
    console.log(movies);

    return movies;
}
