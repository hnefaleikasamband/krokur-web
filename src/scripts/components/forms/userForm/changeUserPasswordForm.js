import React from 'react';
import { Formik } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './userFormStyles';
import { passwordSchema } from './userSchema';

const UserForm = ({ userId, onSubmit, classes, submitText, onCancel }) => {
  const formValues = {
    id: userId,
    password: '',
    confirmPassword: '',
  };
  return (
    <Formik initialValues={formValues} validationSchema={passwordSchema} onSubmit={onSubmit}>
      {({ values, errors, touched, handleSubmit, handleChange }) => (
        <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
          <TextField value={values.id} id="id" type="hidden" />
          <TextField
            id="password"
            label="Password"
            className={classes.textField}
            margin="normal"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password && touched.password}
            required
          />
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            className={classes.textField}
            margin="normal"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword && touched.confirmPassword}
            required
          />
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              className={classes.button}
              color="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" className={classes.button} color="primary">
              {submitText}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

UserForm.propTypes = {
  userId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default withStyles(styles)(UserForm);
