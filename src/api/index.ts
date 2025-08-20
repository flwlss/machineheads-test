import axios from "axios";
import type { AuthCredentials, AuthTokens } from "../types/auth";
import type { Author, DetailAuthor } from "../types/authors";
import type { DetailPost, Post } from "../types/posts";
import type { Tag } from "../types/tags";
import Cookies from 'js-cookie';
import { PATHS } from "../navigation/paths";

export const api = axios.create({
  baseURL: 'https://rest-test.machineheads.ru',
  withCredentials: false
});

export interface PaginationMeta {
  currentPage: number;
  pageCount: number;
  perPage: number;
  totalCount: number;
}

export const TOKEN_KEY = 'auth_token';
export const REFRESH_TOKEN_KEY = 'auth_refresh_token';

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh_token = Cookies.get(REFRESH_TOKEN_KEY);
        if (!refresh_token) throw new Error('No refresh token');

        const formData = new FormData();
        formData.append('refresh_token', refresh_token);

        const { data } = await axios.post<AuthTokens>(
          'https://rest-test.machineheads.ru/auth/token-refresh',
          formData,
        );

        storeTokens(data);
        api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
        originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        clearTokens()
        window.location.href = PATHS.AUTH
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export function storeTokens(tokens: AuthTokens) {
  Cookies.set(TOKEN_KEY, tokens.access_token, { expires: 1 });
  Cookies.set(REFRESH_TOKEN_KEY, tokens.refresh_token, { expires: 7 })
  api.defaults.headers.common['Authorization'] = `Bearer ${tokens.access_token}`;
}

export function clearTokens() {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
  delete api.defaults.headers.common['Authorization'];
}

export const authAPI = {
  async login(credentials: AuthCredentials): Promise<AuthTokens> {
    const formData = new FormData();
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);

    const { data } = await api.post<AuthTokens>('/auth/token-generate', formData);
    return data;
  },

  async refreshToken(refresh_token: string): Promise<AuthTokens> {
    const { data } = await api.post<AuthTokens>('/auth/token-refresh', { refresh_token });
    return data;
  }
};

export const contentAPI = {
  async getPosts(page = 1): Promise<{ data: Post[]; pagination: PaginationMeta }> {
    const response = await api.get('/manage/posts', {
      params: { page }
    });
    return {
      data: response.data,
      pagination: {
        currentPage: parseInt(response.headers['x-pagination-current-page']),
        pageCount: parseInt(response.headers['x-pagination-page-count']),
        perPage: parseInt(response.headers['x-pagination-per-page']),
        totalCount: parseInt(response.headers['x-pagination-total-count'])
      }
    };
  },

  async addPost(formData: FormData): Promise<Post> {
    try {
      const { data } = await api.post('/manage/posts/add', formData);
      return data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  },

  async deletePost(id: number): Promise<Post> {
    const { data } = await api.delete('/manage/posts/remove', {
      params: { id }
    })
    return data;
  },

  async getDetailPost(id: number): Promise<DetailPost> {
    const { data } = await api.get('/manage/posts/detail', {
      params: { id }
    })
    return data;
  },

  async editPost(id: number, formData: FormData): Promise<Post> {
    try {
      const { data } = await api.post('/manage/posts/edit', formData, {
        params: { id }
      });
      return data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  },

  async getAuthors(): Promise<Author[]> {
    const { data } = await api.get('/manage/authors');
    return data;
  },

  async addAuthor(formData: FormData): Promise<Author> {
    try {
      const { data } = await api.post('/manage/authors/add', formData);
      return data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  },

  async getDetailAuthor(id: number): Promise<DetailAuthor> {
    const { data } = await api.get('/manage/authors/detail', {
      params: { id }
    })
    return data;
  },

  async editAuthor(id: number, formData: FormData): Promise<Author> {
    try {
      const { data } = await api.post('/manage/authors/edit', formData, {
        params: { id }
      });
      return data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  },

  async deleteAuthor(id: number): Promise<Author> {
    const { data } = await api.delete('/manage/authors/remove', {
      params: { id }
    })
    return data;
  },

  async getTags(): Promise<Tag[]> {
    const { data } = await api.get('/manage/tags');
    return data;
  }
};