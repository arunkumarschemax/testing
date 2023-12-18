import axios from 'axios';
import { AxiosError } from 'axios';
import { readToken } from '../common/utils/localStorage.service';
import { ApiError } from './ApiError';

export const httpApi = axios.create({
  baseURL: process.env['REACT_APP_BASE_URL'],
});

httpApi.interceptors.request.use((config) => {
  const headers: any = { ...config.headers, Authorization: `Bearer ${readToken()}` };
  config.headers = headers

  return config;
});
//error: AxiosError
httpApi.interceptors.response.use(undefined, (error: any) => {
  throw new ApiError<ApiErrorData>(error.response?.data.message || error.message, error.response?.data);
});

export interface ApiErrorData {
  message: string;
}
