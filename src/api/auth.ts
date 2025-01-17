import api from './axios';
import { AuthResponse, LoginCredentials } from '../types/auth';

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    return data;
  },

  getProfile: async () => {
    const { data } = await api.get('/auth/profile');
    return data;
  }
};