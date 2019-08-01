import { handleActions, combineActions } from 'redux-actions';
import { athletes as actions } from '../../actions';

const initialState = {
  isFetchingAllAthletes: false,
  isFetchingManagedAthletes: false,
  isFetchingAthlete: false,
  allAthletes: [],
  managedAthletes: [],
  athlete: null,
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
        actions.receiveAllAthletes,
        actions.receiveManagedAthletes
      ),
      mergeState,
    ],
  ]),
  initialState
);

export default athletes;
