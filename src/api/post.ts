import { api, type PaginationMeta } from ".";
import type { Post, DetailPost } from "../types/posts";

export const postApi = {
  async getPosts(
    page = 1
  ): Promise<{ data: Post[]; pagination: PaginationMeta }> {
    const response = await api.get("/manage/posts", {
      params: { page },
    });
    return {
      data: response.data,
      pagination: {
        currentPage: parseInt(response.headers["x-pagination-current-page"]),
        pageCount: parseInt(response.headers["x-pagination-page-count"]),
        perPage: parseInt(response.headers["x-pagination-per-page"]),
        totalCount: parseInt(response.headers["x-pagination-total-count"]),
      },
    };
  },

  async addPost(formData: FormData): Promise<Post> {
    try {
      const { data } = await api.post("/manage/posts/add", formData);
      return data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  },

  async getDetailPost(id: number): Promise<DetailPost> {
    const { data } = await api.get("/manage/posts/detail", {
      params: { id },
    });
    return data;
  },

  async editPost(id: number, formData: FormData): Promise<Post> {
    try {
      const { data } = await api.post("/manage/posts/edit", formData, {
        params: { id },
      });
      return data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  },

  async deletePost(id: number): Promise<Post> {
    const { data } = await api.delete("/manage/posts/remove", {
      params: { id },
    });
    return data;
  },
};
