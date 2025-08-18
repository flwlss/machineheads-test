import { combineReducers } from "redux";
import { createBrowserHistory } from 'history'
import { connectRouter } from "connected-react-router";
import content from "./content";
import pagination from "./pagination";
import error from "./error";

export const history = createBrowserHistory()

export const rootReducer = combineReducers({
  content,
  pagination,
  error,
  router: connectRouter(history)
})

export type RootState = ReturnType<typeof rootReducer>;