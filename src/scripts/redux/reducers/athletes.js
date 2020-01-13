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
        actions.receiveAthlete,
        actions.receiveAthleteBouts
      ),
      mergeState,
    ], [
      actions.receiveAllAthletes,
      (state, action) => ({
        ...state,
        ...action.payload,
        allAthletes: action.payload.allAthletes.sort((a, b) => a.name.localeCompare(b.name))
      })
    ], [
      actions.receiveManagedAthletes,
      (state, action) => ({
        ...state,
        ...action.payload,
        managedAthletes: action.payload.managedAthletes.sort((a, b) => a.name.localeCompare(b.name))
      })
    ]
  ]),
  initialState
);

export default athletes;
