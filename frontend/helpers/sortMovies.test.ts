import { Movie } from 'types/MovieAPI';
import { sortMovies } from './sortMovies';
import { describe, it, expect} from 'vitest';
import { MovieSorting } from 'enums/MovieSorting';

const mockedMovies: Movie[] = [
  {
    title: 'Zootopia',
    backdrop_path: '',
    first_air_date: '2016-03-17',
    genre_ids: [],
    id: 1,
    name: '',
    original_country: '',
    original_language: 'en',
    original_name: '',
    overview: '',
    popularity: 90,
    poster_path: '',
    vote_average: 8.0,
    vote_count: 100,
  },
  {
    title: 'Avengers',
    backdrop_path: '',
    first_air_date: '2012-05-04',
    genre_ids: [],
    id: 2,
    name: '',
    original_country: '',
    original_language: 'en',
    original_name: '',
    overview: '',
    popularity: 95,
    poster_path: '',
    vote_average: 8.5,
    vote_count: 200,
  },
  {
    title: 'Batman',
    backdrop_path: '',
    first_air_date: '2008-07-18',
    genre_ids: [],
    id: 3,
    name: '',
    original_country: '',
    original_language: 'en',
    original_name: '',
    overview: '',
    popularity: 85,
    poster_path: '',
    vote_average: 7.5,
    vote_count: 150,
  },
];

describe('sortMovies', () => {
  it('sorts movies aplhabetically by title', () => {
    const result = sortMovies(MovieSorting.title, mockedMovies)
    expect(result.map(m => m.title)).toEqual(['Avengers', 'Batman', 'Zootopia'])
  })

  it('sorts movies by popularity ascending', () => {
    const result = sortMovies(MovieSorting.popularity, mockedMovies)
    expect(result.map(m => m.popularity)).toEqual([85, 90, 95])
  })

  it('sorts movies by vote average ascending', () => {
    const result = sortMovies(MovieSorting.voteAverage, mockedMovies)
    expect(result.map(m => m.vote_average)).toEqual([7.5, 8.0, 8.5])
  })

  it('returns the same array if sorting option is unknown', () => {
    // @ts-expect-error testing default case
    const result = sortMovies('unknown', mockedMovies)
    expect(result).toEqual(mockedMovies)
  })
});
