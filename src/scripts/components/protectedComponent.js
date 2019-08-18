import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

const ProtectedComponent = ({ component: Component, roles, userRoles, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      roles.includes(userRoles) ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

function mapStateToProps(state, ownProps) {
  return {
    userRoles: state.user.userInfo.role,
    ownProps,
  };
}

const enhance = compose(connect(mapStateToProps));
export default enhance(ProtectedComponent);
