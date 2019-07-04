import React from 'react';
import { Formik } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { ClubsSelect } from '../helpers';
import styles from './athleteFormStyles';
import AthleteSchema from './athleteSchema';

const AthleteForm = ({ initialValues, onSubmit, classes, submitText, onCancel, clubs }) => (
  <Formik initialValues={initialValues} validationSchema={AthleteSchema} onSubmit={onSubmit}>
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
          id="personalIdentificationNumber"
          label="Personal Identification Number"
          className={classes.textField}
          margin="normal"
          value={values.personalIdentificationNumber}
          onChange={handleChange}
          error={errors.personalIdentificationNumber && touched.personalIdentificationNumber}
          required
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="club-helper">Club</InputLabel>
          <Select
            value={values.club}
            onChange={handleChange}
            input={<Input name="club" id="club-helper" />}
          >
            {ClubsSelect(clubs.data)}
          </Select>
        </FormControl>
        <div className={classes.buttonContainer}>
          {onCancel && (
            <Button
              variant="contained"
              className={classes.button}
              color="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" variant="contained" className={classes.button} color="primary">
            {submitText}
          </Button>
        </div>
      </form>
    )}
  </Formik>
);

AthleteForm.propTypes = {
  initialValues: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    personalIdentificationNumber: PropTypes.string,
    club: PropTypes.string,
  }),
  clubs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

AthleteForm.defaultProps = {
  initialValues: {
    id: null,
    name: '',
    shorthand: '',
  },
  clubs: [],
};

export default withStyles(styles)(AthleteForm);
