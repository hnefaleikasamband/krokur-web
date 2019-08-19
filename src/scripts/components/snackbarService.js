import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { snackbar as snackbarActions } from '../actions';

import { amber, green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import withStyles from '@material-ui/core/styles/withStyles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = (theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const SnackbarContentWrapper = ({ className, snack, onClose, key, classes, ...other }) => {
  const Icon = variantIcon[snack.variant];
  return (
    <SnackbarContent
      className={classes[snack.variant]}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classes.iconVariant} />
          {snack.message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={() => onClose(snack.key)}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
};

const SnackbarWrapper = ({ onClose, options, snack, children }) => {
  const [showToast, setShowToast] = useState(true);

  const hideThis = () => {
    setShowToast(false);
    setTimeout(() => onClose(snack.key), 300);
  };

  return (
    <Snackbar
      anchorOrigin={options}
      open={showToast}
      autoHideDuration={snack.duration && Number(snack.duration)}
      onClose={hideThis}
    >
      {children}
    </Snackbar>
  );
};

const SnackbarService = ({ snacks, removeSnack, classes }) => {
  return (
    <>
      {snacks &&
        snacks.map((snack) => (
          <SnackbarWrapper
            key={snack.key}
            options={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={removeSnack}
            snack={snack}
          >
            <SnackbarContentWrapper onClose={removeSnack} snack={snack} classes={classes} />
          </SnackbarWrapper>
        ))}
    </>
  );
};

const mapDispatchToProps = {
  addSnack: snackbarActions.addSnack,
  removeSnack: snackbarActions.removeSnack,
};

const mapStateToProps = (state, ownProps) => ({
  snacks: state.snackbar.notifications,
  ownProps,
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(withStyles(styles)(SnackbarService));
