import type { PaginationMeta } from "../../api";
import type { AuthTokens } from "../../types/auth";
import type { ValidationError } from "../../types/posts";
import { SET_AUTH_ERROR, SET_AUTH_TOKENS, SET_LOADING, SET_PAGINATION, VALIDATION_ERROR } from "../constants";

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

export const setValidationError = (payload: ValidationError[] | null) => ({
  type: VALIDATION_ERROR,
  payload
});

export const setLoading = (payload: boolean) => ({
  type: SET_LOADING,
  payload
});