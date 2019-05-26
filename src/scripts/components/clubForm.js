import React, { Fragment } from 'react';
import { Formik } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
    width: '100%',
  },
});

const ClubSchema = Yup.object().shape({
  name: Yup.string().required(),
  shorthand: Yup.string().min(2).max(5).required(),
});

const ClubForm = ({ initialValues, onSubmit, classes, submitText }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={ClubSchema}
    onSubmit={onSubmit}
  >
    {({ values, errors, touched, handleSubmit, handleChange }) => (
      console.log(values),
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
        {submitText && <Button variant="contained" className={classes.button} color="primary">
          {submitText}
        </Button>}
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
}

ClubForm.defaultProps = {
  initialValues: {
    id: null,
    name: '',
    shorthand: ''
  }
}

export default withStyles(styles)(ClubForm);
