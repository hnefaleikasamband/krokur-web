import { handleActions, combineActions } from "redux-actions";
import { user as actions } from "../../../actions";

const initialState = {
  isFetching: false,
  isLoggedIn: false,
  token: null,
  userInfo: {
    email: null,
    name: null,
    club: null,
    role: null
  }
};

const user = handleActions(
  new Map([
    [
      combineActions(actions.receiveUserData, actions.getUserByToken),
      (state, action) => ({
        ...state,
        ...action.payload
      })
    ],
    [
      actions.login,
      (state, action) => ({
        ...state,
        isFetching: true
      })
    ],
    [
      actions.logout,
      state => ({
        ...state,
        ...initialState
      })
    ]
  ]),
  initialState
);

export default user;
