import type { PaginationMeta } from "../../api";
import type { AuthTokens } from "../../types/auth";
import type { Author } from "../../types/authors";
import type { Post } from "../../types/posts";
import type { Tag } from "../../types/tags";
import { SET_ALL_AUTHORS, SET_ALL_POSTS, SET_ALL_TAGS, SET_AUTH_TOKENS, SET_PAGINATION } from "../constants";

export const setAuthTokens = (tokens: AuthTokens) => ({
  type: SET_AUTH_TOKENS,
  payload: tokens
})

export const setAllPosts = (payload: Post[]) => ({
  type: SET_ALL_POSTS,
  payload
});

export const setAllAuthors = (payload: Author[]) => ({
  type: SET_ALL_AUTHORS,
  payload
});

export const setAllTags = (payload: Tag[]) => ({
  type: SET_ALL_TAGS,
  payload
});

export const setPagination = (pagination: PaginationMeta) => ({
  type: SET_PAGINATION,
  payload: pagination
});