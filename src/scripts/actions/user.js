import { createActions } from "redux-actions";

export const {
  user: { login, receiveUserData, getUserByToken, setRedirectUrl, logout }
} = createActions({
  USER: {
    LOGIN: null,
    RECEIVE_USER_DATA: userData => ({
      isFetching: false,
      ...userData
    }),
    GET_USER_BY_TOKEN: () => ({
      isFetching: true
    }),
    SET_REDIRECT_URL: url => ({
      setRedirectUrl: url
    }),
    LOGOUT: null
  }
});
