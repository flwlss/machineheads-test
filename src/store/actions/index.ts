import type { AuthTokens } from "../../types/auth";
import type { Author } from "../../types/authors";
import type { Post } from "../../types/posts";
import type { Tag } from "../../types/tags";
import { SET_ALL_AUTHORS, SET_ALL_POSTS, SET_ALL_TAGS, SET_AUTH_TOKENS } from "../constants";

export const setAuthTokens = (tokens: AuthTokens) => ({
  type: SET_AUTH_TOKENS,
  payload: tokens
})

export const setAllAuthors = (payload: Author[]) => ({
  type: SET_ALL_AUTHORS,
  payload
});

export const setAllPosts = (payload: Post[]) => ({
  type: SET_ALL_POSTS,
  payload
});

export const setAllTags = (payload: Tag[]) => ({
  type: SET_ALL_TAGS,
  payload
});