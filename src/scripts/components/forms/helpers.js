import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Typography } from "@material-ui/core";

export const ClubsSelect = clubs =>
  clubs.map(club => (
    <MenuItem key={club.id} value={club.shorthand}>
      {club.name}
    </MenuItem>
  ));

export const SelectWrapper = data =>
  data.map(d => (
    <MenuItem key={d.id} value={d.id}>
      {d.name}
    </MenuItem>
  ));

const OpponentSelectHelper = opponents =>
  Object.keys(opponents).map(key => (
    <MenuItem key={key} value={key}>
      {opponents[key].name} - {opponents[key].club}
    </MenuItem>
  ));

export const OpponentSelect = ({ form, opponents, error, classes, value }) => (
  <FormControl className={classes.formControl}>
    <InputLabel htmlFor="opponent-helper">Opponent</InputLabel>
    <Select
      value={value}
      onChange={e => {
        const id = e.target.value;
        form.setFieldValue("opponentId", id);
        form.setFieldValue("opponentName", opponents[id].name);
        form.setFieldValue("opponentClubShortHand", opponents[id].club);
      }}
      input={<Input error={error} id="opponent-helper" name="opponent" />}
    >
      {OpponentSelectHelper(opponents)}
    </Select>
  </FormControl>
);

export const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        disableFuture
        variant="inline"
        name={field.name}
        value={field.value}
        format="DD-MM-YYYY"
        helperText={currentError}
        error={Boolean(currentError)}
        onError={error => form.setFieldError(field.name, error)}
        onChange={date => date && form.setFieldValue(field.name, date, true)}
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};
