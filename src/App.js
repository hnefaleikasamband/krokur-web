import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import { Navigation } from './scripts/components';
import {
  // Dashboard,
  AllAthletes,
  MyAthletes,
  ManageAthletes,
  System,
  AthleteDetails,
  AccountSettings,
} from './scripts/routes';
import { CssBaseline } from '@material-ui/core';
import { Login, PrivateRoute, ProtectedComponent } from './scripts/components';

import { MuiThemeProvider } from '@material-ui/core/styles';
import themes from './themes';
import { SnackbarService } from './scripts/components';

const ProtectedApp = () => (
  <Navigation>
    <Route path="/" exact component={AllAthletes} />
    <Route path="/all-athletes" exact component={AllAthletes} />
    <ProtectedComponent path="/my-athletes" exact component={MyAthletes} roles={['COACH']} />
    <ProtectedComponent
      path="/manage-athletes"
      exact
      component={ManageAthletes}
      roles={['ADMIN']}
    />
    <Route path="/athlete/:athleteId" exact component={AthleteDetails} />
    <ProtectedComponent path="/system" exact component={System} roles={['ADMIN']} />
    <Route path="/account" exact component={AccountSettings} />
    {/*<Route path="/" exact render={() => <Dashboard myText="Hello world" />} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/bout-logs" component={Dashboard} />
      <Route path="/account" component={Dashboard} />*/}
  </Navigation>
);

const App = () => {
  return (
    <MuiThemeProvider theme={themes.lightTheme}>
      <CssBaseline />
      <SnackbarService />
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/" component={ProtectedApp} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
