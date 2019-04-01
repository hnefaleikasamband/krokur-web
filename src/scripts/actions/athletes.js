import { createActions } from "redux-actions";

export const {
  athletes: { getAthletes, updateAthletes }
} = createActions({
  ATHLETES: {
    GET_ATHLETES: null,
    UPDATE_ATHLETES: data => ({
      isFetching: false,
      data
    })
  }
});
