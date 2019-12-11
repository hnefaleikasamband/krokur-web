import { handleActions, combineActions } from 'redux-actions';
import { user as actions } from '../../actions';

const initialState = {
  isFetching: false,
  isLoggedIn: false,
  token: null,
  userInfo: {
    id: null,
    email: null,
    name: null,
    club: null,
    role: null,
  },
};

const user = handleActions(
  new Map([
    [
      combineActions(actions.receiveUserData, actions.getUserByToken, actions.setToken),
      (state, action) => ({
        ...state,
        ...action.payload,
      }),
    ],
    [
      actions.login,
      (state) => ({
        ...state,
        isFetching: true,
      }),
    ],
    [
      actions.logout,
      (state) => ({
        ...state,
        ...initialState,
      }),
    ],
  ]),
  initialState
);

export default user;
