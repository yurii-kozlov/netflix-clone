import { User } from 'types/models/User';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
