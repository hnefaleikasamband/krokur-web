import { createActions } from "redux-actions";

export const {
  system: { receiveUsers, fetchAllUsers, receiveClubs, fetchClubs }
} = createActions({
  SYSTEM: {
    RECEIVE_USERS: users => ({
      users: {
        isFetching: false,
        ...users
      }
    }),
    FETCH_ALL_USERS: null,
    RECEIVE_CLUBS: clubs => ({
      clubs: {
        isFetching: false,
        ...clubs
      }
    }),
    FETCH_CLUBS: null
  }
});
