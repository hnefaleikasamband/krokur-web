import { takeLatest, all, put, select } from 'redux-saga/effects';
import { matchesType } from '../helpers';
import { dashboard as actions } from '../../../actions';

function* getDashboardData() {
  try {
    const { isFetching } = yield select((state) => state.dashboard);
    console.log('state of is fetching:', isFetching);
    const data = {
      newAthleteCount: 3,
      newCompetitions: 1,
    };
    yield put(actions.receiveDashboard({ data }));
  } catch (e) {
    console.error('Error in getDashboardData');
  }
}

export default function*() {
  yield all([takeLatest(matchesType(actions.refreshDashboard), getDashboardData)]);
}
