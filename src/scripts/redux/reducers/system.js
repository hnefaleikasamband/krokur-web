import { handleActions, combineActions } from 'redux-actions';
import { system as actions } from '../../actions';

const initialState = {
  clubs: {
    isFetching: false,
    data: [],
  },
  users: {
    isFetching: false,
    data: [],
  },
};

const system = handleActions(
  new Map([
    [
      combineActions(actions.receiveClubs, actions.receiveUsers),
      (state, action) => ({
        ...state,
        ...action.payload,
      }),
    ],
    [
      actions.fetchAllUsers,
      (state) => ({
        ...state,
        users: {
          ...state.users,
          isFetching: true,
        },
      }),
    ],
    [
      actions.fetchClubs,
      (state) => ({
        ...state,
        clubs: {
          ...state.clubs,
          isFetching: true,
        },
      }),
    ],
  ]),
  initialState
);

export default system;
