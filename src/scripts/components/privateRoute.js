import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { user as UserActions } from '../actions';
import renderWithActions from '../helpers/renderWithActions';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const q = props.location.search;
        const search = `?${q
          .substring(q.indexOf('?') + 1)
          .split('&')
          .filter((a) => a.substring(0, 2) !== 'p=')
          .join('')}`;
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: { ...props.location, search } } }} />
        );
      }}
    />
  );
};

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.user.isLoggedIn,
    ownProps,
  };
}

const mapDispatchToProps = (dispatch, props) => {
  const params = new URLSearchParams(props.location.search);
  const providerToken = params.get('p');

  return {
    setToken: () => {
      if (providerToken) {
        dispatch(UserActions.setToken(providerToken));
      }
    },
  };
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  renderWithActions(['setToken'])
);
export default withRouter(enhance(PrivateRoute));
