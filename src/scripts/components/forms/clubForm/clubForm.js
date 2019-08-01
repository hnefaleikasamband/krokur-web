import React from 'react';
import { Formik } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './clubFormStyles';
import ClubSchema from './clubSchema';

const ClubForm = ({ initialValues, onSubmit, classes, submitText, onCancel }) => (
  <Formik initialValues={initialValues} validationSchema={ClubSchema} onSubmit={onSubmit}>
    {({ values, errors, touched, handleSubmit, handleChange }) => (
      <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          margin="normal"
          value={values.name}
          onChange={handleChange}
          error={errors.name && touched.name}
          required
        />
        <TextField
          id="shorthand"
          label="Shorthand"
          className={classes.textField}
          margin="normal"
          value={values.shorthand}
          onChange={handleChange}
          error={errors.shorthand && touched.shorthand}
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

ClubForm.propTypes = {
  initialValues: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    shorthand: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

ClubForm.defaultProps = {
  initialValues: {
    id: null,
    name: '',
    shorthand: '',
  },
};

export default withStyles(styles)(ClubForm);
