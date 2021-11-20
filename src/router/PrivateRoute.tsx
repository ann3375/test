import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import * as H from 'history';
import { SCREENS } from './endpoints';

interface IProps {
  component: React.FC<RouteComponentProps>;
  path: SCREENS | SCREENS[];
  redirectPath: H.LocationDescriptor;
  exact: boolean;
  isUserAuthenticate: boolean;
}

export const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  isUserAuthenticate,
  redirectPath,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isUserAuthenticate ? <Component {...props} /> : <Redirect to={redirectPath} />;
      }}
    />
  );
};
