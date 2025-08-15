import { combineReducers } from "redux";
import { createBrowserHistory } from 'history'
import { connectRouter } from "connected-react-router";
import content from "./content";

export type RootState = ReturnType<typeof rootReducer>;

export const history = createBrowserHistory()

const rootReducer = combineReducers({
  content,
  router: connectRouter(history)
})

export default rootReducer;