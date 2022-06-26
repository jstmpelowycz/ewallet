import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import AuthCreateAccount from "../Auth/AuthCreateAccount";
import AuthHome from "../Auth/AuthHome";
import AuthLogin from "../Auth/AuthLogin";
import CreateAccount from "../Auth/CreateAccount";

const Auth = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <AuthHome />
      </Route>
      <Route path={`${path}/login`}>
        <AuthLogin />
      </Route>
      <Route path={`${path}/create-account`} exact>
        <AuthCreateAccount />
      </Route>
      <Route path={`${path}/create-account/new-user`}>
        <CreateAccount />
      </Route>
    </Switch>
  );
};

export default Auth;
