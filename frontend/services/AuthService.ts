import { AxiosResponse } from 'axios';
import $api, { $apiRefresh }from 'api/api';
import { AuthResponse } from 'types/models/apiResponse/AuthResponse';
import { User } from 'types/models/User';
import { Plan } from 'types/Plan';

export default class AuthService {
  static async login (email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', { email, password });
  }

  static async registration (email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration', { email, password });
  }

  static async logout(): Promise<void> {
    return $api.post('/logout');
  }

  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return $apiRefresh.get<AuthResponse>('/refresh');
  }

  static async setPlan(email: string, plan: Plan): Promise<AxiosResponse<User>>{
    return $api.patch<User>('/setPlan', {email, plan});
  }
}
