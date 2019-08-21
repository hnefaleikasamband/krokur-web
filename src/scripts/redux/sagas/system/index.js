import { takeLatest, all, put, select, call } from 'redux-saga/effects';
import { matchesType } from '../helpers';
import api from './api';
import { system as actions, snackbar } from '../../../actions';

const somethingWentWrong = {
  duration: '4000',
  message: 'Oops, somethign went wrong.. try again later',
  variant: 'error',
};

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
    yield put(snackbar.addSnack(somethingWentWrong));
  }
}

function* fetchClubs() {
  try {
    const { token } = yield select((state) => state.user);
    const { clubs } = yield call(api.getClubs, token);
    yield put(actions.receiveClubs(clubs));
  } catch (e) {
    yield put(snackbar.addSnack(somethingWentWrong));
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
  } catch (e) {
    yield put(snackbar.addSnack(somethingWentWrong));
  }
}

function* updateClub({ payload }) {
  try {
    const { token } = yield select((state) => state.user);

    yield call(api.updateClub, payload, token);
    yield put(actions.fetchClubs());
  } catch (e) {
    yield put(snackbar.addSnack(somethingWentWrong));
  }
}

function* addUser({ payload }) {
  try {
    const { token } = yield select((state) => state.user);
    Object.keys(payload).forEach((key) => payload[key] === '' && delete payload[key]);

    yield call(api.addUser, payload, token);
    yield put(actions.fetchAllUsers());
  } catch (e) {
    yield put(snackbar.addSnack(somethingWentWrong));
  }
}

function* updateUser({ payload: user }) {
  try {
    const { token } = yield select((state) => state.user);
    yield call(api.updateUser, user, token);

    yield put(actions.receiveUser(user));
    yield put(
      snackbar.addSnack({ duration: '3000', message: 'User has been updated', variant: 'success' })
    );
  } catch (e) {
    yield put(snackbar.addSnack(somethingWentWrong));
  }
}

function* setDisabledStatus({ payload }) {
  try {
    const { token } = yield select((state) => state.user);
    const { id, disabled } = payload;
    yield call(api.toggleUserDisabledValue, id, disabled, token);
  } catch (error) {
    yield put(snackbar.addSnack(somethingWentWrong));
  }
}

function* updateUserPassword({ payload: user }) {
  try {
    const { token } = yield select((state) => state.user);
    yield call(api.updateUserPassword, user, token);
    const snack = {
      message: 'Updated password',
      duration: 3000,
      variation: 'success',
    };
    yield put(snackbar.addSnack(snack));
  } catch (error) {
    yield put(snackbar.addSnack(somethingWentWrong));
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
