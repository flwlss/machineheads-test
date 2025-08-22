import { Switch, Redirect } from "react-router-dom";
import { PATHS } from "./paths";
import AuthPage from "../pages/AuthPage";
import AuthorsPage from "../pages/AuthorsPage";
import PostsPage from "../pages/PostsPage";
import TagsPage from "../pages/TagsPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublickRoute";

const Router = () => {
  return (
    <Switch>
      <PublicRoute path={PATHS.AUTH} component={AuthPage} />

      <PrivateRoute path={PATHS.POSTS} component={PostsPage} />
      <PrivateRoute path={PATHS.AUTHORS} component={AuthorsPage} />
      <PrivateRoute path={PATHS.TAGS} component={TagsPage} />

      <Redirect to={PATHS.AUTH} />
    </Switch>
  );
};

export default Router;
