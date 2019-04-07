import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import { Navigation } from "./scripts/components";
import {
  Dashboard,
  AllAthletes,
  MyAthletes,
  ManageAthletes
} from "./scripts/routes";
import { CssBaseline } from "@material-ui/core";
import { Login, PrivateRoute } from "./scripts/components";

import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./themes";

const ProtectedApp = () => (
  <Navigation>
    <Route path="/" exact render={() => <Dashboard myText="Hello world" />} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/all-athletes" exact component={AllAthletes} />
    <Route path="/my-athletes" component={MyAthletes} />
    <Route path="/manage-athletes" component={ManageAthletes} />
    <Route path="/my-athletes/:userId" component={Dashboard} />
    <Route path="/bout-logs" component={Dashboard} />
    <Route path="/system" component={Dashboard} />
    <Route path="/account" component={Dashboard} />
  </Navigation>
);

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={ProtectedApp} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
