import { handleActions, combineActions } from "redux-actions";
import { athletes as actions } from "../../actions";

const initialState = {
  allAthletes: {
    isFetching: false,
    data: []
  },
  managedAthletes: {
    isFetching: false,
    data: []
  }
};

const athletes = handleActions(
  new Map([
    [
      combineActions(actions.getAllAthletes),
      (state, action) => ({
        ...state,
        allAthletes: {
          ...state.allAthletes,
          isFetching: true
        }
      })
    ],
    [
      combineActions(actions.receiveAllAthletes),
      (state, action) => ({
        ...state,
        allAthletes: {
          ...action.payload
        }
      })
    ],
    [
      combineActions(actions.getManagedAthletes),
      (state, action) => ({
        ...state,
        managedAthletes: {
          ...state.managedAthletes,
          isFetching: true
        }
      })
    ],
    [
      combineActions(actions.receiveManagedAthletes),
      (state, action) => ({
        ...state,
        managedAthletes: {
          ...action.payload
        }
      })
    ]
  ]),
  initialState
);

export default athletes;
