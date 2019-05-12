import { createActions } from 'redux-actions';

export const {
  dashboard: { refreshDashboard, receiveDashboard },
} = createActions({
  DASHBOARD: {
    REFRESH_DASHBOARD: null,
    RECEIVE_DASHBOARD: (data) => ({
      isFetching: false,
      data,
    }),
  },
});
