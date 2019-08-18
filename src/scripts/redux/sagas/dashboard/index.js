import { takeLatest, all, put } from 'redux-saga/effects';
import { matchesType } from '../helpers';
import { dashboard as actions } from '../../../actions';

function* getDashboardData() {
  try {
    // const { isFetching } = yield select((state) => state.dashboard);
    const data = {
      newAthleteCount: 3,
      newCompetitions: 1,
    };
    yield put(actions.receiveDashboard({ data }));
  } catch (e) {
    console.error('Error in getDashboardData');
  }
}

function* setDashboardData() {}

export default function*() {
  yield all([
    takeLatest(matchesType(actions.refreshDashboard), getDashboardData),
    takeLatest(matchesType(actions.receiveDashboard), setDashboardData),
  ]);
}
