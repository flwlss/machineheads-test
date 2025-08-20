import type { PaginationMeta } from "../../api";
import type { AuthTokens } from "../../types/auth";
import { SET_AUTH_ERROR, SET_AUTH_TOKENS, SET_PAGINATION } from "../constants";

export const setAuthTokens = (tokens: AuthTokens) => ({
  type: SET_AUTH_TOKENS,
  payload: tokens
})

export const setAuthError = (error: string | null) => ({
  type: SET_AUTH_ERROR,
  payload: error
});

export const setPagination = (pagination: PaginationMeta) => ({
  type: SET_PAGINATION,
  payload: pagination
});