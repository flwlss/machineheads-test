import type { Post, DetailPost } from "../../types/posts";
import {
  SET_ALL_POSTS,
  CREATE_POST_REQUEST,
  DELETE_POST_REQUEST,
  SET_DETAIL_POST_REQUEST,
  SET_DETAIL_POST,
  EDIT_POST_REQUEST
} from "../constants";

export const setAllPosts = (payload: Post[]) => ({
  type: SET_ALL_POSTS,
  payload
});

export const createPostRequest = (postData: FormData) => ({
  type: CREATE_POST_REQUEST,
  payload: postData
});

export const setDetailPostRequest = (id: number) => ({
  type: SET_DETAIL_POST_REQUEST,
  payload: id
});

export const setDetailPost = (post: DetailPost) => ({
  type: SET_DETAIL_POST,
  payload: post
});

export const editPostRequest = (id: number, postData: FormData) => ({
  type: EDIT_POST_REQUEST,
  id: id,
  payload: postData
});

export const deletePostRequest = (id: number) => ({
  type: DELETE_POST_REQUEST,
  payload: id
});