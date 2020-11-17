import { takeLatest, all, put, call, select } from "redux-saga/effects";
import {
  matchesType,
  SnackErrorMessage,
  SnackSuccessMessage,
} from "../helpers";
import { user as actions, snackbar } from "../../../actions";
import api from "./api";
import {
  updateLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../../../helpers/localStorage";

function* login({ payload }) {
  try {
    const authedUser = yield call(api.signIn, payload);
    authedUser.isLoggedIn = true;
    yield put(actions.receiveUserData(authedUser));
    yield call(updateLocalStorage, "token", authedUser.token);
  } catch (e) {
    yield put(actions.receiveUserData({}));
    yield put(
      snackbar.addSnack(SnackErrorMessage("Error logging in, please try again"))
    );
  }
}

function* getUserIfTokenPresent() {
  try {
    const tokenStorage = yield call(getFromLocalStorage, "token");
    const tokenState = yield select((state) => state.user.token);
    const token = tokenState || tokenStorage;
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
      yield call(removeFromLocalStorage, "token");
      yield put(actions.receiveUserData({}));
    }
  }
}

function* logout() {
  try {
    yield call(removeFromLocalStorage, "token");
    yield put(actions.receiveUserData({}));
    yield put(snackbar.addSnack(SnackSuccessMessage("Logged out")));
  } catch (e) {
    console.error("Error logging out.");
  }
}

function* SaveTokenToLocaleStorage(data) {
  let token;
  if (data && data.payload) {
    token = data.payload.token;
  } else {
    token = data;
  }
  try {
    yield call(updateLocalStorage, "token", token);
  } catch (e) {
    yield put(
      snackbar.addSnack(
        SnackErrorMessage("Error saving token to local storage")
      )
    );
  }
}

export default function*() {
  yield all([
    takeLatest(matchesType(actions.login), login),
    takeLatest(matchesType(actions.getUserByToken), getUserIfTokenPresent),
    takeLatest(matchesType(actions.logout), logout),
    takeLatest(matchesType(actions.setToken), SaveTokenToLocaleStorage),
  ]);
}
