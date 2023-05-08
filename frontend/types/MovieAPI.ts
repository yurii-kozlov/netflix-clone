export interface Genre {
  id: number;
  name: string;
};

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Movie {
  title: string;
  backdrop_path: string;
  media_type?: string,
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  original_country: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export enum ElementType {
  Bloopers = 'Bloopers',
  Featurette = 'Featurette',
  BehindTheScenes = 'Behind the Scenes',
  Clip = 'Clip',
  Trailer = 'Trailer',
  Teaser = 'Teaser',
}

export interface Element {
  type: ElementType;
}

export type Movies = {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

export type MovieAPIResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
