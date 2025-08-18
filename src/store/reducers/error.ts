import { SET_AUTH_ERROR } from "../constants";

type ErrorState = {
  authError: string | null;
};

const initialState: ErrorState = {
  authError: null,
};

const error = (
  state: ErrorState = initialState,
  action: { type: string, payload: string }
): ErrorState => {
  switch (action.type) {
    case SET_AUTH_ERROR:
      return {
        ...state,
        authError: action.payload
      };
    default:
      return state;
  }
};

export default error;