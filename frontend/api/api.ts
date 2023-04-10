import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env._NEXT_PUBLIC_BASE_URL
});
