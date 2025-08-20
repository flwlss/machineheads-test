import { api } from ".";
import type { Tag } from "../types/tags";

export const tagApi = {
  async getTags(): Promise<Tag[]> {
    const { data } = await api.get('/manage/tags');
    return data;
  }
}