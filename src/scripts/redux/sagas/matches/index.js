import { takeLatest, all, put, select, call } from 'redux-saga/effects';
import { matchesType, SnackErrorMessage, SnackSuccessMessage } from '../helpers';
import api from './api';
import { matches as actions, athletes as athletesAction, snackbar } from '../../../actions';

function* addFullMatch({ payload }) {
  try {
    const { token } = yield select((state) => state.user);
    const { match } = payload;

    console.log('match in saga:', match);

    yield call(api.addFullMatch, match, token);
    yield put(athletesAction.getAllAthletes());
    yield put(snackbar.addSnack(SnackSuccessMessage('Successfully added a new match')));
  } catch (e) {
    yield put(snackbar.addSnack(SnackErrorMessage(e.response.data.error)));
  }
}

export default function* () {
  yield all([
    takeLatest(matchesType(actions.addMatch), addFullMatch),
  ]);
}
