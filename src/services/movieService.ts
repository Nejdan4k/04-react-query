import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;


console.log("TMDB TOKEN:", TOKEN ? '✅ Exists' : '❌ Missing');

interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const config = {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  };

  try {
    const response = await axios.get<MovieSearchResponse>(BASE_URL, config);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error; // або setError(true);
  }
};
