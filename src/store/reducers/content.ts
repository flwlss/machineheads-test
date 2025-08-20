
import type { Author } from "../../types/authors";
import type { DetailPost, Post } from "../../types/posts";
import type { Tag } from "../../types/tags";
import { SET_ALL_AUTHORS, SET_ALL_POSTS, SET_ALL_TAGS, SET_DETAIL_POST } from "../constants";

type ContentState = {
  allPosts: Post[] | null;
  detailPost: DetailPost | null;
  allAuthors: Author[] | null;
  allTags: Tag[] | null;
};

type Action =
  | { type: typeof SET_ALL_POSTS; payload: Post[] }
  | { type: typeof SET_DETAIL_POST; payload: DetailPost }
  | { type: typeof SET_ALL_AUTHORS; payload: Author[] }
  | { type: typeof SET_ALL_TAGS; payload: Tag[] };

const initialState: ContentState = {
  allPosts: null,
  detailPost: null,
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
    case SET_DETAIL_POST:
      return {
        ...state,
        detailPost: action.payload
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