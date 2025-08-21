import { api } from ".";
import type { Tag } from "../types/tags";

export const tagApi = {
  async getTags(): Promise<Tag[]> {
    const { data } = await api.get('/manage/tags');
    return data;
  },

  async addTag(formData: FormData): Promise<Tag> {
    try {
      const { data } = await api.post('/manage/tags/add', formData);
      return data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  },

  async getDetailTag(id: number): Promise<Tag> {
    const { data } = await api.get('/manage/tags/detail', {
      params: { id }
    })
    return data;
  },

  async editTag(id: number, formData: FormData): Promise<Tag> {
    try {
      const { data } = await api.post('/manage/tags/edit', formData, {
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

  async deleteTag(id: number): Promise<Tag> {
    const { data } = await api.delete('/manage/tags/remove', {
      params: { id }
    })
    return data;
  },
}