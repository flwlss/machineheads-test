
import type { Author } from "../../types/authors";
import type { Post } from "../../types/posts";
import type { Tag } from "../../types/tags";
import { SET_ALL_AUTHORS, SET_ALL_POSTS, SET_ALL_TAGS } from "../constants";

type ContentState = {
  allPosts: Post[] | null;
  allAuthors: Author[] | null;
  allTags: Tag[] | null;
};

type Action =
  | { type: typeof SET_ALL_POSTS; payload: Post[] }
  | { type: typeof SET_ALL_AUTHORS; payload: Author[] }
  | { type: typeof SET_ALL_TAGS; payload: Tag[] };

const initialState: ContentState = {
  allPosts: null,
  allAuthors: null,
  allTags: null,
};

const content = (
  state: ContentState = initialState,
  action: Action
): ContentState => {
  switch (action.type) {
    case SET_ALL_POSTS:
      return {
        ...state,
        allPosts: action.payload
      };
    case SET_ALL_AUTHORS:
      return {
        ...state,
        allAuthors: action.payload
      };
    case SET_ALL_TAGS:
      return {
        ...state,
        allTags: action.payload
      };
    default:
      return state;
  }
};

export default content;