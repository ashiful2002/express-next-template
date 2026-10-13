export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'TRADER' | 'CUSTOMER';
export type UserStatus = 'ACTIVE' | 'BLOCKED' | 'DELETED';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  image?: string | null;
  needPasswordChange?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errorSources?: Array<{ path: string; message: string }>;
  stack?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponseData {
  user: IUser;
  token?: string;
  accessToken?: string;
  refreshToken?: string;
}

