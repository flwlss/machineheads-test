import { api } from ".";
import type { Author, DetailAuthor } from "../types/authors";

export const authorApi = {
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
  }
}