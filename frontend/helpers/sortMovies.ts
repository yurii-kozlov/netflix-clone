import { Movie } from 'types/MovieAPI'
import { MovieSorting } from 'enums/MovieSorting'

export const sortMovies = (sortingOption: MovieSorting, movies: Movie[]): Movie[] => {
  const sortedMovies = [...movies];

  switch (sortingOption) {
    case MovieSorting.title:
      return sortedMovies.sort((movie1, movie2) =>
        movie1.title.toLowerCase().localeCompare(movie2.title.toLowerCase()));

    case MovieSorting.popularity:
      return sortedMovies.sort((movie1, movie2) => movie1.popularity - movie2.popularity);

    case MovieSorting.voteAverage:
      return sortedMovies.sort((movie1, movie2) => movie1.vote_average - movie2.vote_average);

    default:
      return sortedMovies;
  }
}
