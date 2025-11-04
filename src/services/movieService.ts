import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const RAW = import.meta.env.VITE_TMDB_TOKEN as string | undefined;
const AUTH = RAW?.trim().startsWith("Bearer") ? RAW.trim() : `Bearer ${RAW ?? ""}`;

export async function fetchMovies(query: string, page: number): Promise<MoviesResponse> {
  const { data } = await axios.get<MoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: { query, include_adult: false, language: "en-US", page },
      headers: { Authorization: AUTH, Accept: "application/json" },
    }
  );
  return data;
}
