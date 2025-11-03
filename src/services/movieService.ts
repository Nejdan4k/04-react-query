import axios from "axios";
import type { MoviesResponse } from "../types/movie";

const RAW_TOKEN = import.meta.env.VITE_TMDB_TOKEN as string | undefined;
const AUTH_HEADER = RAW_TOKEN?.trim().startsWith("Bearer")
  ? RAW_TOKEN!.trim()
  : `Bearer ${RAW_TOKEN ?? ""}`;

export async function fetchMovies(query: string, currentPage: number): Promise<MoviesResponse> {
  const response = await axios.get<MoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page: currentPage,
      },
      headers: {
        Authorization: AUTH_HEADER,
        Accept: "application/json",
      },
    }
  );
  return response.data;
}
