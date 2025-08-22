import type { Tag } from "../../types/tags";
import {
  CREATE_TAG_REQUEST,
  DELETE_TAG_REQUEST,
  EDIT_TAG_REQUEST,
  SET_ALL_TAGS,
  SET_DETAIL_TAG,
  SET_DETAIL_TAG_REQUEST,
} from "../constants";

export const setAllTags = (payload: Tag[]) => ({
  type: SET_ALL_TAGS,
  payload,
});

export const createTagRequest = (postData: FormData) => ({
  type: CREATE_TAG_REQUEST,
  payload: postData,
});

export const setDetailTagRequest = (id: number) => ({
  type: SET_DETAIL_TAG_REQUEST,
  payload: id,
});

export const setDetailTag = (tag: Tag) => ({
  type: SET_DETAIL_TAG,
  payload: tag,
});

export const editTagRequest = (id: number, tagData: FormData) => ({
  type: EDIT_TAG_REQUEST,
  id: id,
  payload: tagData,
});

export const deleteTagRequest = (id: number) => ({
  type: DELETE_TAG_REQUEST,
  payload: id,
});
