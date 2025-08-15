import { Route, Switch, Redirect } from 'react-router-dom';
import { PATHS } from "./paths"
import AuthPage from "../pages/AuthPage"
import AuthorsPage from '../pages/AuthorsPage';
import PostsPage from '../pages/PostsPage';
import TagsPage from '../pages/TagsPage';

const Router = () => {
  return (
    <Switch>
      <Route exact path={PATHS.ROOT}>
        <Redirect to={PATHS.AUTH} />
      </Route>
      <Route path={PATHS.AUTH} component={AuthPage} />
      <Route path={PATHS.AUTHORS} component={AuthorsPage} />
      <Route path={PATHS.POSTS} component={PostsPage} />
      <Route path={PATHS.TAGS} component={TagsPage} />
    </Switch>
  )
}

export default Router