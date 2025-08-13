import { combineReducers } from "redux";
import { createBrowserHistory } from 'history'
import { connectRouter } from "connected-react-router";

export const history = createBrowserHistory()

const reducer = combineReducers({
  router: connectRouter(history)
})

export default reducer