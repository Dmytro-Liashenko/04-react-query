import axios from "axios";
import type { TmdbSearchResponse} from "../../src/types/movie";

const myKey = import.meta.env.VITE_API_KEY;



export default async function fetchMovies(query: string, page: number): Promise<TmdbSearchResponse> {
    const url = "https://api.themoviedb.org/3/search/movie";
    const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${myKey}`,
    },
    params: {
        query,
        page
    },
    };
    const response = await axios.get<TmdbSearchResponse>(url, options);
    const movies = response.data
    console.log(movies);

    return movies;
}
