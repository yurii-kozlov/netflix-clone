import { AxiosResponse } from 'axios';
import $api from 'api/api';
import { User } from 'types/models/User';

export default class UserService {
  static async fetchUsers(): Promise<AxiosResponse<User[]>> {
    return $api.get('/users');
  }

  static async clearWatchLaterList(email: string): Promise<AxiosResponse<[]>> {
    return $api.patch<[]>('/clearWatchLaterMoviesList', {email});
  }

  static async clearLikedMoviesList(email: string): Promise<AxiosResponse<[]>> {
    return $api.patch<[]>('/clearLikedMoviesList', {email});
  }
};
