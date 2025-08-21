import type { PaginationMeta } from "../../api";
import { SET_LOADING, SET_PAGINATION } from "../constants";

type CommonState = {
  pagination: PaginationMeta;
  loading: boolean;
};

const initialState: CommonState = {
  pagination: {
    currentPage: 0,
    pageCount: 0,
    perPage: 0,
    totalCount: 0
  },
  loading: false,
};

const common = (
  state: CommonState = initialState,
  action: any
): CommonState => {
  switch (action.type) {
    case SET_PAGINATION:
      return {
        ...state,
        pagination: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export default common;