import { takeLatest, all, put, select, call } from 'redux-saga/effects';
import { matchesType, SnackErrorMessage, SnackSuccessMessage } from '../helpers';
import api from './api';
import { system as actions, snackbar } from '../../../actions';

function* fetchUsers() {
  try {
    const { token } = yield select((state) => state.user);
    const { clubs: currentClubs } = yield select((state) => state.system);

    const usersList = yield call(api.getUsers, token);
    // TODO: Remove unnecessary club shorthand addition as this should be returned from the api
    const clubs = currentClubs.length <= 0 ? (yield call(api.getClubs, token)).clubs : currentClubs;
    const users = usersList.users.map((user) => {
      const name = clubs.find((c) => c.id === user.club);
      return {
        ...user,
        clubDisplayName: !name ? null : name.shorthand,
      };
    });
    yield put(actions.receiveUsers(users));
  } catch (e) {
    yield put(snackbar.addSnack(SnackErrorMessage()));
  }
}

function* fetchClubs() {
  try {
    const { token } = yield select((state) => state.user);
    const { clubs } = yield call(api.getClubs, token);
    yield put(actions.receiveClubs(clubs));
  } catch (e) {
    yield put(snackbar.addSnack(SnackErrorMessage()));
  }
}

function* addClub({ payload }) {
  try {
    const { token } = yield select((state) => state.user);
    if (payload.id === null) {
      delete payload.id;
    }

    yield call(api.addClub, payload, token);
    yield put(actions.fetchClubs());
    yield put(
      snackbar.addSnack(SnackSuccessMessage(`Successfully added club ${payload.shorthand}`))
    );
  } catch (e) {
    yield put(snackbar.addSnack(SnackErrorMessage(e.response.data.error)));
  }
}

function* updateClub({ payload }) {
  try {
    const { token } = yield select((state) => state.user);

    yield call(api.updateClub, payload, token);
    yield put(actions.fetchClubs());
    yield put(
      snackbar.addSnack(SnackSuccessMessage(`Successfully updated club ${payload.shorthand}`))
    );
  } catch (e) {
    yield put(snackbar.addSnack(SnackErrorMessage(e.response.data.error)));
  }
}

function* addUser({ payload }) {
  try {
    const { token } = yield select((state) => state.user);
    Object.keys(payload).forEach((key) => payload[key] === '' && delete payload[key]);

    yield call(api.addUser, payload, token);
    yield put(actions.fetchAllUsers());
    yield put(snackbar.addSnack(SnackSuccessMessage(`Successfully added user ${payload.name}`)));
  } catch (e) {
    yield put(snackbar.addSnack(SnackErrorMessage(e.response.data.error)));
  }
}

function* updateUser({ payload: user }) {
  try {
    const { token } = yield select((state) => state.user);
    yield call(api.updateUser, user, token);

    yield put(actions.receiveUser(user));
    yield put(snackbar.addSnack(SnackSuccessMessage(`Successfully updated user ${user.name}`)));
  } catch (e) {
    yield put(snackbar.addSnack(SnackErrorMessage(e.response.data.error)));
  }
}

function* setDisabledStatus({ payload }) {
  try {
    const { token } = yield select((state) => state.user);
    const { id, disabled } = payload;
    yield call(api.toggleUserDisabledValue, id, disabled, token);
  } catch (e) {
    yield put(snackbar.addSnack(SnackErrorMessage()));
  }
}

function* updateUserPassword({ payload: user }) {
  try {
    const { token } = yield select((state) => state.user);
    yield call(api.updateUserPassword, user, token);
    yield put(snackbar.addSnack(SnackSuccessMessage(`Successfully updated password`)));
  } catch (e) {
    yield put(snackbar.addSnack(SnackErrorMessage(e.response.data.error)));
  }
}

export default function*() {
  yield all([
    takeLatest(matchesType(actions.fetchAllUsers), fetchUsers),
    takeLatest(matchesType(actions.fetchClubs), fetchClubs),
    takeLatest(matchesType(actions.addClub), addClub),
    takeLatest(matchesType(actions.updateClub), updateClub),
    takeLatest(matchesType(actions.addUser), addUser),
    takeLatest(matchesType(actions.updateUser), updateUser),
    takeLatest(matchesType(actions.toggleUserDisabledValue), setDisabledStatus),
    takeLatest(matchesType(actions.updateUserPassword), updateUserPassword),
  ]);
}
