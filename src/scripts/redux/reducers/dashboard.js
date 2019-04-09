import { handleActions, combineActions } from "redux-actions";
import { dashboard as actions } from "../../actions";

const initialState = {
  isFetching: false,
  hasAccess: null,
  data: null
};

const dashboard = handleActions(
  new Map([
    [
      combineActions(actions.refreshDashboard, actions.receiveDashboard),
      (state, action) => ({
        ...state,
        ...action.payload
      })
    ]
  ]),
  initialState
);

export default dashboard;
