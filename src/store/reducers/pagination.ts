import type { PaginationMeta } from "../../api";
import { SET_PAGINATION } from "../constants";

const initialState: PaginationMeta = {
  currentPage: 0,
  pageCount: 0,
  perPage: 0,
  totalCount: 0
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PAGINATION:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};