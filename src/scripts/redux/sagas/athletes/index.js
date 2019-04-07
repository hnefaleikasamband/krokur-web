import { takeLatest, all, put, select, call } from "redux-saga/effects";
import { matchesType } from "../helpers";
import api from "./api";
import { athletes as actions } from "../../../actions";

const takeTimeFunction = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 1000);
  });
};

function* fetchAthletes({ payload }) {
  try {
    const { token } = yield select(state => state.user);
    const data = yield call(api.getAllAthletes, token);
    yield put(actions.receiveAllAthletes({ data: data.athletes }));
  } catch (e) {
    console.error("Error fetching athletes:", e);
    // yield put(actions.receiveUserData({}));
  }
}

function* fetchManagedAthletes({ payload }) {
  try {
    const { token } = yield select(state => state.user);
    const data = yield call(api.getManagedAthletes, token);
    yield put(actions.receiveManagedAthletes({ data: data.athletes }));
  } catch (e) {
    console.error("Error fetching managed athletes:", e);
    // yield put(actions.receiveUserData({}));
  }
}

export default function*() {
  yield all([
    takeLatest(matchesType(actions.getAllAthletes), fetchAthletes),
    takeLatest(matchesType(actions.getManagedAthletes), fetchManagedAthletes)
  ]);
}
