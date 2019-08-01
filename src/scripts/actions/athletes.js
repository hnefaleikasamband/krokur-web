import { createActions } from 'redux-actions';

export const {
  athletes: {
    getAllAthletes,
    getManagedAthletes,
    getAthlete,
    receiveAllAthletes,
    receiveManagedAthletes,
    receiveAthlete,
    addAthlete,
    updateAthlete,
  },
} = createActions({
  ATHLETES: {
    GET_ALL_ATHLETES: () => ({
      isFetchingAllAthletes: true,
    }),
    GET_MANAGED_ATHLETES: () => ({
      isFetchingManagedAthletes: true,
    }),
    GET_ATHLETE: () => ({
      isFetchingAthlete: true,
    }),
    RECEIVE_ALL_ATHLETES: (allAthletes) => ({
      isFetchingAllAthletes: false,
      allAthletes,
    }),
    RECEIVE_MANAGED_ATHLETES: (managedAthletes) => ({
      isFetchingManagedAthletes: false,
      managedAthletes,
    }),
    RECEIVE_ATHLETE: (athlete) => ({
      isFetchingAthlete: false,
      athlete,
    }),
    ADD_ATHLETE: (athlete) => ({
      athlete,
    }),
    UPDATE_ATHLETE: (athlete) => ({
      athlete,
    }),
  },
});
