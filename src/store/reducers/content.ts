import type { Author, DetailAuthor } from "../../types/authors";
import type { DetailPost, Post } from "../../types/posts";
import type { Tag } from "../../types/tags";
import {
  SET_ALL_AUTHORS,
  SET_ALL_POSTS,
  SET_ALL_TAGS,
  SET_DETAIL_AUTHOR,
  SET_DETAIL_POST,
  SET_DETAIL_TAG,
} from "../constants";

type ContentState = {
  allPosts: Post[] | null;
  detailPost: DetailPost | null;
  allAuthors: Author[] | null;
  detailAuthor: DetailAuthor | null;
  allTags: Tag[] | null;
  detailTag: Tag | null;
};

type Action =
  | { type: typeof SET_ALL_POSTS; payload: Post[] }
  | { type: typeof SET_DETAIL_POST; payload: DetailPost }
  | { type: typeof SET_ALL_AUTHORS; payload: Author[] }
  | { type: typeof SET_DETAIL_AUTHOR; payload: DetailAuthor }
  | { type: typeof SET_ALL_TAGS; payload: Tag[] }
  | { type: typeof SET_DETAIL_TAG; payload: Tag };

const initialState: ContentState = {
  allPosts: null,
  detailPost: null,
  allAuthors: null,
  detailAuthor: null,
  allTags: null,
  detailTag: null,
};

const content = (
  state: ContentState = initialState,
  action: Action
): ContentState => {
  switch (action.type) {
    case SET_ALL_POSTS:
      return {
        ...state,
        allPosts: action.payload,
      };
    case SET_DETAIL_POST:
      return {
        ...state,
        detailPost: action.payload,
      };
    case SET_ALL_AUTHORS:
      return {
        ...state,
        allAuthors: action.payload,
      };
    case SET_DETAIL_AUTHOR:
      return {
        ...state,
        detailAuthor: action.payload,
      };
    case SET_ALL_TAGS:
      return {
        ...state,
        allTags: action.payload,
      };
    case SET_DETAIL_TAG:
      return {
        ...state,
        detailTag: action.payload,
      };
    default:
      return state;
  }
};

export default content;
