import { handleActions } from 'redux-actions';
import { snackbar as actions } from '../../actions';

const initialState = {
  notifications: [],
};

const snackbar = handleActions(
  new Map([
    [
      actions.addSnack,
      (state, action) => {
        const notifications = [...state.notifications, action.payload];
        return { notifications };
      },
    ],
    [
      actions.removeSnack,
      (state, action) => {
        if (action.payload.dismissAll) {
          return initialState;
        }
        const notifications = state.notifications.filter((n) => n.key !== action.payload.key);
        return { notifications };
      },
    ],
  ]),
  initialState
);

export default snackbar;
