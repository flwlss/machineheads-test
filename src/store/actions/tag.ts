import type { Tag } from "../../types/tags";
import { SET_ALL_TAGS } from "../constants";

export const setAllTags = (payload: Tag[]) => ({
  type: SET_ALL_TAGS,
  payload
});