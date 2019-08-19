import { createActions } from 'redux-actions';

export const {
  snackbar: { addSnack, removeSnack },
} = createActions({
  SNACKBAR: {
    ADD_SNACK: (notification) => {
      const key = notification.options && notification.options.key;
      return {
        ...notification,
        key: key || new Date().getTime() + Math.random(),
      };
    },
    REMOVE_SNACK: (key) => ({
      dismissAll: !key, // dismiss all if no key has been defined
      key,
    }),
  },
});
