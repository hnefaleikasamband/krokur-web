import React from "react";
import { Formik, Field } from "formik";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import styles from "./athleteBoutStyles";
import BoutSingleSchema from "./athleteBoutSchema";
import {
  DatePickerField,
  ClubsSelect,
  OpponentSelect,
  SelectWrapper
} from "../helpers";

const BoutSingleForm = ({
  initialValues,
  onSubmit,
  classes,
  submitText,
  onCancel,
  athlete,
  opponents,
  clubs
}) => {
  if (athlete) {
    initialValues.athleteId = athlete.id;
    initialValues.athleteName = athlete.name;
    initialValues.athleteClubShortHand = athlete.clubShorthand;
  }

  const filteredOpponents = opponents.reduce((acc, curr) => {
    if (curr.id === athlete.id) {
      return acc;
    }
    acc[curr.id] = curr;
    return acc;
  }, {});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={BoutSingleSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleSubmit, handleChange }) => {
        return (
          <form
            onSubmit={handleSubmit}
            className={classes.container}
            noValidate
            autoComplete="off"
          >
            <Field
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
                  <Input
                    error={errors.class && touched.class}
                    name="class"
                    id="class-helper"
                  />
                }
              >
                {SelectWrapper([
                  { id: "A", name: "A" },
                  { id: "B", name: "B" },
                  { id: "C", name: "C" }
                ])}
              </Select>
            </FormControl>
            <TextField
              name="points"
              label="Points"
              className={classes.textField}
              margin="normal"
              type="number"
              value={values.points}
              onChange={handleChange}
              error={errors.points && touched.points}
              required
              inputProps={{ min: 9, max: 45, step: 0.5 }}
            />
            <Field
              name="opponentId"
              opponents={filteredOpponents}
              component={OpponentSelect}
              classes={classes}
              value={values.opponentId}
              error={errors.opponentId && touched.opponentId}
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
              <Button
                type="submit"
                variant="contained"
                className={classes.button}
                color="primary"
              >
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
    id: PropTypes.string,
    athleteId: PropTypes.string,
    athleteName: PropTypes.string,
    athleteClubShorthand: PropTypes.string,
    opponentId: PropTypes.string,
    opponentName: PropTypes.string,
    opponentClubShortHand: PropTypes.string,
    class: PropTypes.string,
    boutDate: PropTypes.instanceOf(Date),
    points: PropTypes.string,
    organizer: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired,
  athlete: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    clubShortHand: PropTypes.string
  }).isRequired,
  opponents: PropTypes.array.isRequired
};

BoutSingleForm.defaultProps = {
  initialValues: {
    id: null,
    athleteId: "",
    athleteName: "",
    athleteClubShorthand: "",
    opponentId: "",
    opponentName: "",
    opponentClubShortHand: "",
    class: "",
    boutDate: new Date(),
    points: "",
    organizer: ""
  }
};

export default withStyles(styles)(BoutSingleForm);
