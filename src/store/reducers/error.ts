import type { ValidationError } from "../../types/posts";
import { SET_AUTH_ERROR, VALIDATION_ERROR } from "../constants";

type ErrorState = {
  authError: string | null;
  validationErrors: ValidationError[] | null;
};

const initialState: ErrorState = {
  authError: null,
  validationErrors: null,
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
    case VALIDATION_ERROR:
      return {
        ...state,
        validationErrors: action.payload
      };
    default:
      return state;
  }
};

export default error;