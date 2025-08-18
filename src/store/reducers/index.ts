import { combineReducers } from "redux";
import { createBrowserHistory } from 'history'
import { connectRouter } from "connected-react-router";
import content from "./content";
import pagination from "./pagination";

export const history = createBrowserHistory()

export const rootReducer = combineReducers({
  content,
  pagination,
  router: connectRouter(history)
})

export type RootState = ReturnType<typeof rootReducer>;