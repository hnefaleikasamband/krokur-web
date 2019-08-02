import { handleActions, combineActions } from 'redux-actions';
import { athletes as actions } from '../../actions';

const initialState = {
  isFetchingAllAthletes: false,
  isFetchingManagedAthletes: false,
  isFetchingAthlete: false,
  isFetchingAthleteBouts: false,
  allAthletes: [],
  managedAthletes: [],
  athlete: null,
  athleteBouts: [],
};

const mergeState = (state, action) => ({
  ...state,
  ...action.payload,
});

const athletes = handleActions(
  new Map([
    [
      combineActions(
        actions.getAllAthletes,
        actions.getManagedAthletes,
        actions.getAthlete,
        actions.getAthleteBouts,
        actions.receiveAllAthletes,
        actions.receiveManagedAthletes,
        actions.receiveAthlete,
        actions.receiveAthleteBouts
      ),
      mergeState,
    ],
  ]),
  initialState
);

export default athletes;
