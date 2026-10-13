export interface ISignUpPayload {
  name: string;
  email: string;
  password: string;
}
export interface ISignInPayload {
  email: string;
  password: string;
}

export interface IChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
