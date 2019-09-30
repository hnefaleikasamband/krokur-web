import { handleActions, combineActions } from 'redux-actions';
import { system as actions } from '../../actions';

const initialState = {
  isFetchingClubs: false,
  isFetchingUsers: false,
  clubs: [],
  users: [],
};

const system = handleActions(
  new Map([
    [
      combineActions(
        actions.receiveClubs,
        actions.receiveUsers,
        actions.fetchAllUsers,
        actions.fetchClubs
      ),
      (state, action) => ({
        ...state,
        ...action.payload,
      }),
    ],
  ]),
  initialState
);

export default system;
