import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import { Navigation } from "./scripts/components";
//import Navigation from "./scripts/components/navigation/navigation";
import { Dashboard } from "./scripts/routes";
import { Login, PrivateRoute } from "./scripts/components";

const loggedIn = () => false;

const requireAuth = (nextState, replace) => {
  if (!loggedIn()) {
    replace({
      pathname: "/login"
    });
  }
};

const ProtectedApp = () => (
  <Navigation>
    <Route path="/" exact render={() => <Dashboard myText="Hello world" />} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/allathletes" exact component={Dashboard} />
    <Route path="/myathletes" component={Dashboard} />
    <Route path="/myathletes/:userId" component={Dashboard} />
    <Route path="/bout-logs" component={Dashboard} />
    <Route path="/system" component={Dashboard} />
    <Route path="/account" component={Dashboard} onEnter={requireAuth} />
  </Navigation>
);

class App extends Component {
  render() {
    const hasJWTkey = false;
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={ProtectedApp} />
        </Switch>
      </Router>
    );
  }
}

export default App;
