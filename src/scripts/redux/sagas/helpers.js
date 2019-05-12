import { all } from 'redux-saga/effects';

const matchesType = (actionCreator) => (currentAction) => {
  return actionCreator().type === currentAction.type;
};

const removeDuplicates = (arr, prop) =>
  arr.filter((obj, pos, arr) => arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos);

const combineSagas = (sagas) =>
  function*() {
    yield all([...sagas].map((saga) => saga()));
  };

export { matchesType, removeDuplicates, combineSagas };
