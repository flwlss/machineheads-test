import { Switch, Redirect } from "react-router-dom";
import { PATHS } from "./paths";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { lazy, Suspense } from "react";
import { Spin } from "antd";

const AuthPage = lazy(() => import("../pages/AuthPage"));
const PostsPage = lazy(() => import("../pages/PostsPage"));
const AuthorsPage = lazy(() => import("../pages/AuthorsPage"));
const TagsPage = lazy(() => import("../pages/TagsPage"));

const Router = () => {
  return (
    <Suspense fallback={<Spin fullscreen />}>
      <Switch>
        <PublicRoute path={PATHS.AUTH} component={AuthPage} />

        <PrivateRoute path={PATHS.POSTS} component={PostsPage} />
        <PrivateRoute path={PATHS.AUTHORS} component={AuthorsPage} />
        <PrivateRoute path={PATHS.TAGS} component={TagsPage} />

        <Redirect to={PATHS.AUTH} />
      </Switch>
    </Suspense>
  );
};

export default Router;
