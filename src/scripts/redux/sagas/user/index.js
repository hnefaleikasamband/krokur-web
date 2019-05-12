import { takeLatest, all, put, select, call } from 'redux-saga/effects';
import { matchesType } from '../helpers';
import { user as actions } from '../../../actions';
import api from './api';
import {
  updateLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from '../../../helpers/localStorage';
import { receiveUserData } from '../../../actions/user';

const takeTimeFunction = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 1000);
  });
};

function* login({ payload }) {
  try {
    const authedUser = yield call(api.signIn, payload);
    authedUser.isLoggedIn = true;
    console.log(authedUser);
    yield put(actions.receiveUserData(authedUser));
    yield call(updateLocalStorage, 'token', authedUser.token);
  } catch (e) {
    console.error('Error Logging in:', e);
    yield put(actions.receiveUserData({}));
  }
}

function* getUserIfTokenPresent() {
  try {
    const token = yield call(getFromLocalStorage, 'token');
    if (!token) {
      yield put(actions.receiveUserData({}));
      return;
    }
    const authedUser = yield call(api.getUserByToken, token);
    const user = {
      isLoggedIn: true,
      token,
      userInfo: authedUser,
    };
    yield put(actions.receiveUserData(user));
  } catch (e) {
    if (e && e.response && e.response.status === 401) {
      yield call(removeFromLocalStorage, 'token');
      yield put(actions.receiveUserData({}));
    }
  }
}

function* logout() {
  try {
    yield call(removeFromLocalStorage, 'token');
    yield put(receiveUserData({}));
  } catch (e) {}
}

export default function*() {
  yield all([
    takeLatest(matchesType(actions.login), login),
    takeLatest(matchesType(actions.getUserByToken), getUserIfTokenPresent),
    takeLatest(matchesType(actions.logout), logout),
  ]);
}
