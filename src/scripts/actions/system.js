import { createActions } from 'redux-actions';

export const {
  system: { receiveUsers, fetchAllUsers, receiveClubs, fetchClubs, addClub, updateClub },
} = createActions({
  SYSTEM: {
    RECEIVE_USERS: (users) => ({
      users: {
        isFetching: false,
        ...users,
      },
    }),
    FETCH_ALL_USERS: null,
    RECEIVE_CLUBS: (clubs) => ({
      clubs: {
        isFetching: false,
        ...clubs,
      },
    }),
    FETCH_CLUBS: null,
    ADD_CLUB: (club) => ({
      ...club,
    }),
    UPDATE_CLUB: (club) => ({
      ...club,
    }),
  },
});
