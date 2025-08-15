import { combineReducers } from "redux";
import { createBrowserHistory } from 'history'
import { connectRouter } from "connected-react-router";
import content from "./content";

export const history = createBrowserHistory()

export const rootReducer = combineReducers({
  content,
  router: connectRouter(history)
})

export type RootState = ReturnType<typeof rootReducer>;