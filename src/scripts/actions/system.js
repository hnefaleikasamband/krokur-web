import { createActions } from 'redux-actions';

export const {
  system: {
    receiveUsers,
    receiveUser,
    fetchAllUsers,
    receiveClubs,
    fetchClubs,
    addClub,
    updateClub,
    addUser,
    updateUser,
    toggleUserDisabledValue,
    updateUserPassword,
  },
} = createActions({
  SYSTEM: {
    RECEIVE_USERS: (users) => ({
      isFetchingUsers: false,
      users,
    }),
    RECEIVE_USER: (user) => ({
      user,
    }),
    FETCH_ALL_USERS: () => ({
      isFetchingUsers: true,
    }),
    RECEIVE_CLUBS: (clubs) => ({
      isFetchingClubs: false,
      clubs,
    }),
    FETCH_CLUBS: () => ({
      isFetchingClubs: true,
    }),
    ADD_CLUB: (club) => ({
      ...club,
    }),
    UPDATE_CLUB: (club) => ({
      ...club,
    }),
    ADD_USER: (user) => ({
      ...user,
    }),
    UPDATE_USER: (user) => ({
      ...user,
    }),
    TOGGLE_USER_DISABLED_VALUE: (userIdAndValue) => ({
      ...userIdAndValue,
    }),
    UPDATE_USER_PASSWORD: (user) => ({
      ...user,
    }),
  },
});
