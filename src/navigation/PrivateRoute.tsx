import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from '../api';
import { PATHS } from './paths';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  path: string;
}

const PrivateRoute = ({ component: Component }: PrivateRouteProps) => {
  const isAuthenticated = !!Cookies.get(TOKEN_KEY);

  return (
    <Route
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: PATHS.AUTH,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;