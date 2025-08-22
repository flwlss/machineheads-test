import axios from "axios";
import type { AuthCredentials, AuthTokens } from "../types/auth";
import Cookies from "js-cookie";
import { PATHS } from "../navigation/paths";

export const api = axios.create({
  baseURL: "https://rest-test.machineheads.ru",
  withCredentials: false,
});

export interface PaginationMeta {
  currentPage: number;
  pageCount: number;
  perPage: number;
  totalCount: number;
}

export const TOKEN_KEY = "auth_token";
export const REFRESH_TOKEN_KEY = "auth_refresh_token";

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh_token = Cookies.get(REFRESH_TOKEN_KEY);
        if (!refresh_token) throw new Error("No refresh token");

        const formData = new FormData();
        formData.append("refresh_token", refresh_token);

        const { data } = await axios.post<AuthTokens>(
          "https://rest-test.machineheads.ru/auth/token-refresh",
          formData
        );

        storeTokens(data);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.access_token}`;
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${data.access_token}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        clearTokens();
        window.location.href = PATHS.AUTH;
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export function storeTokens(tokens: AuthTokens) {
  Cookies.set(TOKEN_KEY, tokens.access_token, { expires: 1 });
  Cookies.set(REFRESH_TOKEN_KEY, tokens.refresh_token, { expires: 7 });
  api.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${tokens.access_token}`;
}

export function clearTokens() {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
  delete api.defaults.headers.common["Authorization"];
}

export const authAPI = {
  async login(credentials: AuthCredentials): Promise<AuthTokens> {
    const formData = new FormData();
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);

    const { data } = await api.post<AuthTokens>(
      "/auth/token-generate",
      formData
    );
    return data;
  },

  async refreshToken(refresh_token: string): Promise<AuthTokens> {
    const { data } = await api.post<AuthTokens>("/auth/token-refresh", {
      refresh_token,
    });
    return data;
  },
};
