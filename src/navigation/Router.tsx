import { Route, Switch, Redirect } from 'react-router-dom';
import { PATHS } from "./paths"
import AuthPage from "../pages/AuthPage"

const Router = () => {
  return (
    <Switch>
      <Route exact path={PATHS.ROOT}>
        <Redirect to={PATHS.AUTH} />
      </Route>
      <Route path={PATHS.AUTH} component={AuthPage} />
    </Switch>
  )
}

export default Router