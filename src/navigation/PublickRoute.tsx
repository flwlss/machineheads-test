import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from '../api';
import { PATHS } from './paths';

interface PublicRouteProps {
  component: React.ComponentType<any>;
  path: string;
}

const PublicRoute = ({ component: Component }: PublicRouteProps) => {
  const isAuthenticated = !!Cookies.get(TOKEN_KEY);

  return (
    <Route
      render={(props) =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: PATHS.POSTS,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PublicRoute;