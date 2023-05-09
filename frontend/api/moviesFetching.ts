import { AxiosResponse } from 'axios';
import { movieFetcher } from 'api/api';
import { Movie, MovieAPIResponse} from 'types/MovieAPI';

const MOVIE_API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

export const moviesFetchRequests = {
  fetchTrending: `/trending/all/week?api_key=${MOVIE_API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/movie?api_key=${MOVIE_API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${MOVIE_API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${MOVIE_API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${MOVIE_API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${MOVIE_API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${MOVIE_API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${MOVIE_API_KEY}&language=en-US&with_genres=99`,
}

type MoviesFetchRequestKey = keyof typeof moviesFetchRequests;

export const fetchMovies = async (requestKey: MoviesFetchRequestKey): Promise<Movie[]> => {
  const response: AxiosResponse<MovieAPIResponse> = await movieFetcher
    .get<MovieAPIResponse>(moviesFetchRequests[requestKey]);

  return response.data.results;
}
