import { createActions } from 'redux-actions';

export const {
  athletes: {
    getAllAthletes,
    getManagedAthletes,
    getAthlete,
    getAthleteBouts,
    receiveAllAthletes,
    receiveManagedAthletes,
    receiveAthlete,
    receiveAthleteBouts,
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
    GET_ATHLETE: (athleteId) => ({
      isFetchingAthlete: true,
      athleteDetailsId: athleteId,
      athlete: null,
    }),
    GET_ATHLETE_BOUTS: (athleteId) => ({
      isFetchingAthleteBouts: true,
      athleteBoutFetchingId: athleteId,
      athleteBouts: [],
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
    RECEIVE_ATHLETE_BOUTS: (athleteBouts) => ({
      isFetchingAthleteBouts: false,
      athleteBouts,
    }),
    ADD_ATHLETE: (athlete) => ({
      athlete,
    }),
    UPDATE_ATHLETE: (athlete) => ({
      athlete,
    }),
  },
});
