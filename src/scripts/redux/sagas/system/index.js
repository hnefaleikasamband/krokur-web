import { takeLatest, all, put, select, call } from 'redux-saga/effects';
import { matchesType } from '../helpers';
import api from './api';
import { system as actions } from '../../../actions';

function* fetchUsers() {
  try {
    const { token } = yield select((state) => state.user);
    const {
      clubs: { data },
    } = yield select((state) => state.system);

    const usersList = yield call(api.getUsers, token);
    // TODO: Remove unnecessary club shorthand addition as this should be returned from the api
    const clubs = data.length <= 0 ? (yield call(api.getClubs, token)).clubs : data;
    const users = usersList.users.map((user) => {
      const name = clubs.find((c) => c.id === user.club);
      return {
        ...user,
        clubDisplayName: !name ? null : name.shorthand,
      };
    });
    yield put(actions.receiveUsers({ data: users }));
  } catch (e) {
    console.error('Error fetching Users:', e);
    // yield put(actions.receiveUserData({}));
  }
}

function* fetchClubs() {
  try {
    const { token } = yield select((state) => state.user);
    const data = yield call(api.getClubs, token);
    yield put(actions.receiveClubs({ data: data.clubs }));
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

    const data = yield call(api.addClub, payload, token);
    yield put(actions.fetchClubs());
  } catch (e) {
    console.log('addClub error:', e);
  }
}

export default function* () {
  yield all([
    takeLatest(matchesType(actions.fetchAllUsers), fetchUsers),
    takeLatest(matchesType(actions.fetchClubs), fetchClubs),
    takeLatest(matchesType(actions.addClub), addClub)
  ]);
}
