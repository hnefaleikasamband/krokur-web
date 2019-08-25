import { takeLatest, all, put, select, call } from 'redux-saga/effects';
import { matchesType, SnackErrorMessage, SnackSuccessMessage } from '../helpers';
import api from './api';
import { athletes as actions, snackbar } from '../../../actions';

function* fetchAthletes() {
  try {
    const { token } = yield select((state) => state.user);
    const { athletes } = yield call(api.getAllAthletes, token);
    yield put(actions.receiveAllAthletes(athletes));
  } catch (e) {
    yield put(snackbar.addSnack(SnackErrorMessage()));
  }
}

function* fetchManagedAthletes() {
  try {
    const { token } = yield select((state) => state.user);
    const { athletes } = yield call(api.getManagedAthletes, token);
    yield put(actions.receiveManagedAthletes(athletes));
  } catch (e) {
    yield put(snackbar.addSnack(SnackErrorMessage()));
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
    yield put(snackbar.addSnack(SnackSuccessMessage('Successfully added athlete')));
  } catch (e) {
    yield put(snackbar.addSnack(SnackErrorMessage(e.response.data.error)));
  }
}

function* fetchAthlete({ payload }) {
  try {
    const { token } = yield select((state) => state.user);
    const { athlete } = yield call(api.getAthlete, payload.athleteDetailsId, token);
    yield put(actions.receiveAthlete(athlete));
  } catch (e) {
    yield put(snackbar.addSnack(SnackErrorMessage()));
    yield put(actions.receiveAthlete(null));
  }
}

function* fetchBouts({ payload }) {
  try {
    const { token } = yield select((state) => state.user);
    const { bouts } = yield call(api.getAthleteBouts, payload.athleteBoutFetchingId, token);
    yield put(actions.receiveAthleteBouts(bouts));
  } catch (e) {
    yield put(snackbar.addSnack(SnackErrorMessage()));
  }
}

function* addBoutForAthlete({ payload }) {
  try {
    const { token } = yield select((state) => state.user);
    const { bout } = payload;

    yield call(api.addBoutForAthlete, bout, token);
    yield put(actions.getAthleteBouts(bout.athleteId));
    yield put(snackbar.addSnack(SnackSuccessMessage('Successfully added a new match')));
  } catch (e) {
    yield put(snackbar.addSnack(SnackErrorMessage(e.response.data.error)));
  }
}

export default function*() {
  yield all([
    takeLatest(matchesType(actions.getAllAthletes), fetchAthletes),
    takeLatest(matchesType(actions.getManagedAthletes), fetchManagedAthletes),
    takeLatest(matchesType(actions.addAthlete), addAthlete),
    takeLatest(matchesType(actions.getAthlete), fetchAthlete),
    takeLatest(matchesType(actions.getAthleteBouts), fetchBouts),
    takeLatest(matchesType(actions.addBoutForAthlete), addBoutForAthlete),
  ]);
}
