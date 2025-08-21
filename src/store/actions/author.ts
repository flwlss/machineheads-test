import type { Author, DetailAuthor } from "../../types/authors";
import { CREATE_AUTHOR_REQUEST, DELETE_AUTHOR_REQUEST, EDIT_AUTHOR_REQUEST, SET_ALL_AUTHORS, SET_DETAIL_AUTHOR, SET_DETAIL_AUTHOR_REQUEST } from "../constants";

export const setAllAuthors = (payload: Author[]) => ({
  type: SET_ALL_AUTHORS,
  payload
});

export const createAuthorRequest = (postData: FormData) => ({
  type: CREATE_AUTHOR_REQUEST,
  payload: postData
});

export const setDetailAuthorRequest = (id: number) => ({
  type: SET_DETAIL_AUTHOR_REQUEST,
  payload: id
});

export const setDetailAuthor = (author: DetailAuthor) => ({
  type: SET_DETAIL_AUTHOR,
  payload: author
});

export const editAuthorRequest = (id: number, authorData: FormData) => ({
  type: EDIT_AUTHOR_REQUEST,
  id: id,
  payload: authorData
});

export const deleteAuthorRequest = (id: number) => ({
  type: DELETE_AUTHOR_REQUEST,
  payload: id
});