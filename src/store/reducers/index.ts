import { combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import content from "./content";
import common from "./common";
import error from "./error";

export const history = createBrowserHistory();

export const rootReducer = combineReducers({
  content,
  common,
  error,
  router: connectRouter(history),
});

export type RootState = ReturnType<typeof rootReducer>;
