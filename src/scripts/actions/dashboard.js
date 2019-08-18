import { createActions } from 'redux-actions';

export const {
  dashboard: { refreshDashboard, receiveDashboard },
} = createActions({
  DASHBOARD: {
    REFRESH_DASHBOARD: () => ({ isFetching: true }),
    RECEIVE_DASHBOARD: (data) => ({
      isFetching: false,
      data,
    }),
  },
});
