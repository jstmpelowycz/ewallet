import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./components/Pages/Auth";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Greet from "./components/Pages/Greet";
import Layout from "./components/Pages/Layout";

import "./App.scss";
import { Fragment } from "react";

const App = () => {
  const localId = useSelector((state) => state.user.userId.localId);

  return (
    <Switch>
      <Layout>
        <Route path="/" exact>
          <Redirect to="/auth" />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        {localId && (
          <Fragment>
            <Route path="/greet">
              <Greet />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Fragment>
        )}
      </Layout>
    </Switch>
  );
};

export default App;
