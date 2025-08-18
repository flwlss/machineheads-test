export type AuthCredentials = {
  email: string;
  password: string;
}

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
  access_expired_at: number;
  refresh_expired_at: number;
}

export interface AuthError {
  response: {
    data: {
      message: string;
    };
  };
}