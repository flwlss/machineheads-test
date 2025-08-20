import type { ValidationError } from "../../types/posts";
import { SET_AUTH_ERROR, SET_POST_VALIDATION_ERRORS } from "../constants";

type ErrorState = {
  authError: string | null;
  postErrors: ValidationError[] | null;
};

const initialState: ErrorState = {
  authError: null,
  postErrors: null,
};

const error = (
  state: ErrorState = initialState,
  action: { type: string, payload: any }
): ErrorState => {
  switch (action.type) {
    case SET_AUTH_ERROR:
      return {
        ...state,
        authError: action.payload
      };
    case SET_POST_VALIDATION_ERRORS:
      return {
        ...state,
        postErrors: action.payload
      };
    default:
      return state;
  }
};

export default error;