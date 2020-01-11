import { createActions } from 'redux-actions';

export const {
  matches: {
    addMatch,
  },
} = createActions({
  MATCHES: {
    ADD_MATCH: (match) => ({ match }),
  },
});
