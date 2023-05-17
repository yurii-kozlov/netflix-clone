import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { AuthResponse } from 'types/models/apiResponse/AuthResponse';

interface ExtendedInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _isRetry?: boolean;
}

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

export const $apiRefresh = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

export const movieFetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MOVIE_BASE_URL
})

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

$api.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
})

$api.interceptors.response.use((config: AxiosResponse) => config,
  async (error: AxiosError): Promise<AxiosResponse<AuthResponse>> => {
    const originalRequest = error.config as ExtendedInternalAxiosRequestConfig;

    if (error.response?.status === 401 && error.config && !originalRequest._isRetry ) {
      originalRequest._isRetry = true;

      try {
        const response = await axios.get<AuthResponse>(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, {
          withCredentials: true
        });

        localStorage.setItem('token', response.data.accessToken);

        return $api.request(originalRequest);
      } catch (e: unknown) {
        if (e instanceof Error) {
          throw new Error(e.message);
        }
      }
    }

    throw error;
  }
)

export default $api;
