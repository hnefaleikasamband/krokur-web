import { takeLatest, all, put, select, call } from 'redux-saga/effects';
import { matchesType } from '../helpers';
import api from './api';
import { athletes as actions } from '../../../actions';

function* fetchAthletes() {
  try {
    const { token } = yield select((state) => state.user);
    const { athletes } = yield call(api.getAllAthletes, token);
    yield put(actions.receiveAllAthletes(athletes));
  } catch (e) {
    console.error('Error fetching athletes:', e);
    // yield put(actions.receiveUserData({}));
  }
}

function* fetchManagedAthletes() {
  try {
    const { token } = yield select((state) => state.user);
    const { athletes } = yield call(api.getManagedAthletes, token);
    yield put(actions.receiveManagedAthletes(athletes));
  } catch (e) {
    console.error('Error fetching managed athletes:', e);
    // yield put(actions.receiveUserData({}));
  }
}

function* addAthlete({ payload }) {
  try {
    const { token } = yield select((state) => state.user);
    const { athlete } = payload;

    const newAthlete = {
      name: athlete.name,
      ssn: athlete.personalIdentificationNumber,
      club: athlete.club,
    };
    const res = yield call(api.addAthlete, newAthlete, token);

    if (res.status === 200) {
      yield put(actions.getManagedAthletes());
    }
  } catch (e) {
    console.error('Error in sagas when adding athlete:', e);
  }
}

export default function*() {
  yield all([
    takeLatest(matchesType(actions.getAllAthletes), fetchAthletes),
    takeLatest(matchesType(actions.getManagedAthletes), fetchManagedAthletes),
    takeLatest(matchesType(actions.addAthlete), addAthlete),
  ]);
}
