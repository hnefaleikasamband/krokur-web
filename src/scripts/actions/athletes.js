import { createActions } from "redux-actions";

export const {
  athletes: {
    getAllAthletes,
    receiveAllAthletes,
    getManagedAthletes,
    receiveManagedAthletes
  }
} = createActions({
  ATHLETES: {
    GET_ALL_ATHLETES: null,
    RECEIVE_ALL_ATHLETES: data => ({
      isFetching: false,
      ...data
    }),
    GET_MANAGED_ATHLETES: null,
    RECEIVE_MANAGED_ATHLETES: data => ({
      isFetching: false,
      ...data
    })
  }
});
