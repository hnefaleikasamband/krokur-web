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

const SnackErrorMessage = (message) => ({
  duration: '4000',
  variant: 'error',
  message: message || 'Oops, somethign went wrong.. try again later',
});

const SnackSuccessMessage = (message) => ({
  duration: '3000',
  variant: 'success',
  message,
});

export { matchesType, removeDuplicates, combineSagas, SnackErrorMessage, SnackSuccessMessage };
