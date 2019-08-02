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
    yield call(api.addAthlete, newAthlete, token);
    yield put(actions.getManagedAthletes());
  } catch (e) {
    console.error('Error in sagas when adding athlete:', e);
  }
}

function* fetchAthlete({ payload }) {
  try {
    const { token } = yield select((state) => state.user);
    const { athlete } = yield call(api.getAthlete, payload.athleteDetailsId, token);
    yield put(actions.receiveAthlete(athlete));
  } catch (e) {
    console.error(`Error in sagas when getting athlete id ${payload.athleteDetailsId}.. :`, e);
    yield put(actions.receiveAthlete(null));
  }
}

function* fetchBouts({ payload }) {
  try {
    const { token } = yield select((state) => state.user);
    const { bouts } = yield call(api.getAthleteBouts, payload.athleteBoutFetchingId, token);
    yield put(actions.receiveAthleteBouts(bouts));
  } catch (e) {
    console.error(
      `Error in sagas when getting bouts for id ${payload.athleteBoutFetchingId}..:`,
      e
    );
  }
}

export default function*() {
  yield all([
    takeLatest(matchesType(actions.getAllAthletes), fetchAthletes),
    takeLatest(matchesType(actions.getManagedAthletes), fetchManagedAthletes),
    takeLatest(matchesType(actions.addAthlete), addAthlete),
    takeLatest(matchesType(actions.getAthlete), fetchAthlete),
    takeLatest(matchesType(actions.getAthleteBouts), fetchBouts),
  ]);
}
