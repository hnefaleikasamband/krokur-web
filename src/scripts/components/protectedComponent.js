import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

const ProtectedComponent = ({ component: Component, roles, userRole, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      roles.includes(userRole) ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
    }
  />
);

function mapStateToProps(state, ownProps) {
  return {
    userRole: state.user.userInfo.role,
    ownProps,
  };
}

const enhance = compose(connect(mapStateToProps));
export default enhance(ProtectedComponent);
