import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    }
  />
);

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.user.isLoggedIn,
    ownProps,
  };
}

const enhance = compose(connect(mapStateToProps));
export default enhance(PrivateRoute);
