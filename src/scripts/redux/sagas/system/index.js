import { takeLatest, all, put, select, call } from 'redux-saga/effects';
import { matchesType } from '../helpers';
import api from './api';
import { system as actions } from '../../../actions';

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
    console.error('Error fetching Users:', e);
    // yield put(actions.receiveUserData({}));
  }
}

function* fetchClubs() {
  try {
    const { token } = yield select((state) => state.user);
    const { clubs } = yield call(api.getClubs, token);
    yield put(actions.receiveClubs(clubs));
  } catch (e) {
    console.error('Error fetching clubs:', e);
    // yield put(actions.receiveUserData({}));
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
    console.error('addClub error:', e);
  }
}

function* updateClub({ payload }) {
  try {
    const { token } = yield select((state) => state.user);

    yield call(api.updateClub, payload, token);
    yield put(actions.fetchClubs());
  } catch (e) {
    console.error('updateClub error:', e);
  }
}

function* addUser({ payload }) {
  try {
    const { token } = yield select((state) => state.user);
    Object.keys(payload).forEach((key) => payload[key] === '' && delete payload[key]);

    yield call(api.addUser, payload, token);
    yield put(actions.fetchAllUsers());
  } catch (e) {
    console.error('addUser error:', e);
  }
}

function* updateUser({ payload }) {
  try {
    const { token } = yield select((state) => state.user);
    yield call(api.updateUser, payload, token);
    yield put(actions.fetchAllUsers);
  } catch (e) {
    console.error('updateUser error:', e);
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
  ]);
}
