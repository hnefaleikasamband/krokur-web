import React from 'react';
import { Formik, Field } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import styles from './matchFormStyles';
import matchSchema from './matchFormStyles';
import { DatePickerField, ClubsSelect, AthleteSelect, SelectWrapper } from '../helpers';

const BoutSingleForm = ({
  initialValues,
  onSubmit,
  classes,
  submitText,
  onCancel,
  athletes,
  clubs,
}) => {

  const athletesList = athletes.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});

  const filterAthletes = (athletesObject, filterId) => {
    const list = { ...athletesObject };
    delete list[filterId];
    return list
  }

  return (
    <Formik initialValues={initialValues} validationSchema={matchSchema} onSubmit={onSubmit}>
      {({ values, errors, touched, handleSubmit, handleChange }) => {

        return (
          <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
            <Field
              classes={classes}
              name="boutDate"
              component={DatePickerField}
              label="Match date"
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="organizer-helper">Organizer</InputLabel>
              <Select
                value={values.organizer}
                onChange={handleChange}
                input={
                  <Input
                    error={errors.organizer && touched.organizer}
                    name="organizer"
                    id="organizer-helper"
                  />
                }
              >
                {ClubsSelect(clubs)}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="class-helper">Class</InputLabel>
              <Select
                value={values.class}
                onChange={handleChange}
                input={
                  <Input error={errors.class && touched.class} name="class" id="class-helper" />
                }
              >
                {SelectWrapper([
                  { id: 'A', name: 'A' },
                  { id: 'B', name: 'B' },
                  { id: 'C', name: 'C' },
                ])}
              </Select>
            </FormControl>

            <Field
              name="athleteAId"
              athletes={filterAthletes(athletesList, values.athleteBId)}
              component={AthleteSelect}
              classes={classes}
              value={values.athleteAId}
              error={errors.athleteAId && touched.athleteAId}
              inputId="athleteA"
              label="Athlete A"
              keyId="athleteAId"
              keyName="athleteAName"
              keyClub="athleteAClubShortHand"
            />
            <TextField
              name="athleteAPoints"
              label="Athlete A Points"
              className={classes.textField}
              margin="normal"
              type="number"
              value={values.athleteAPoints}
              onChange={handleChange}
              error={errors.athleteAPoints && touched.athleteAPoints}
              required
              inputProps={{ min: 9, max: 45, step: 0.5 }}
            />
            <Field
              name="athleteBId"
              athletes={filterAthletes(athletesList, values.athleteAId)}
              component={AthleteSelect}
              classes={classes}
              value={values.athleteBId}
              error={errors.athleteBId && touched.athleteBId}
              inputId="athleteB"
              label="Athlete B"
              keyId="athleteBId"
              keyName="athleteBName"
              keyClub="athleteBClubShortHand"
            />
            <TextField
              name="athleteBPoints"
              label="Athlete B Points"
              className={classes.textField}
              margin="normal"
              type="number"
              value={values.athleteBPoints}
              onChange={handleChange}
              error={errors.athleteBPoints && touched.athleteBPoints}
              required
              inputProps={{ min: 9, max: 45, step: 0.5 }}
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
        );
      }}
    </Formik>
  );
};

BoutSingleForm.propTypes = {
  initialValues: PropTypes.shape({
    athleteAId: PropTypes.string,
    athleteAName: PropTypes.string,
    athleteAClubShortHand: PropTypes.string,
    athleteAPoints: PropTypes.string,
    athleteBId: PropTypes.string,
    athleteBName: PropTypes.string,
    athleteBClubShortHand: PropTypes.string,
    athleteBPoints: PropTypes.string,
    class: PropTypes.string,
    boutDate: PropTypes.instanceOf(Date),
    organizer: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  athletes: PropTypes.arrayOf(Object).isRequired,
};

BoutSingleForm.defaultProps = {
  initialValues: {
    athleteAId: '',
    athleteAName: '',
    athleteAClubShortHand: '',
    athleteAPoints: '',
    athleteBId: '',
    athleteBName: '',
    athleteBClubShortHand: '',
    athleteBPoints: '',
    class: '',
    boutDate: new Date(),
    organizer: '',
  },
};

export default withStyles(styles)(BoutSingleForm);
