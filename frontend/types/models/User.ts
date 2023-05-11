import { Plan } from 'types/Plan';
import { Movie } from 'types/MovieAPI';

export interface User {
  email: string;
  isActivated: boolean;
  id: string;
  plan: Plan;
  watchLaterMovies: Movie[];
  likedMovies: Movie[];
}
