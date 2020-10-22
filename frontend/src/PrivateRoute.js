import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const signIn = JSON.parse(window.sessionStorage.getItem("signedIn"));
  console.log(signIn);
  return (
    <Route
      {...rest}
      render={(props) =>
        signIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/admin-sign" />
        )
      }
    />
  );
};

export default PrivateRoute;
