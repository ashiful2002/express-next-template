import { apiClient } from './api-client';
import { AuthResponseData, IUser, LoginPayload, SignUpPayload } from '@/types';

export const authApi = {
  login: async (payload: LoginPayload) => {
    return apiClient.post<AuthResponseData>('/auth/sign-in', payload);
  },

  signUp: async (payload: SignUpPayload) => {
    return apiClient.post<AuthResponseData>('/auth/sign-up', payload);
  },
 
  getMe: async () => {
    return apiClient.get<IUser>('/auth/me');
  },

  logout: async () => {
    return apiClient.post<{ message: string }>('/auth/logout');
  },

  verifyEmail: async (email: string, otp: string) => {
    return apiClient.post<{ message: string }>('/auth/verify-email', { email, otp });
  },

  forgotPassword: async (email: string) => {
    return apiClient.post<{ message: string }>('/auth/forgot-password', { email });
  },

  resetPassword: async (payload: { email: string; otp: string; newPassword: string }) => {
    return apiClient.post<{ message: string }>('/auth/reset-password', payload);
  },

  changePassword: async (payload: { currentPassword: string; newPassword: string }) => {
    return apiClient.post<{ message: string }>('/auth/change-password', payload);
  },

  refreshToken: async () => {
    return apiClient.post<{ accessToken: string; refreshToken: string; sessionToken: string }>(
      '/auth/refresh-token'
    );
  },

  getGoogleLoginUrl: (redirectPath: string = '/dashboard') => {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';
    return `${backendUrl}/api/v1/auth/login/google?redirectPath=${encodeURIComponent(
      redirectPath
    )}`;
  },
};

