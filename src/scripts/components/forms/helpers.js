import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';

export const ClubsSelect = (clubs) =>
  clubs.map((club) => (
    <MenuItem key={club.id} value={club.shorthand}>
      {club.name}
    </MenuItem>
  ));

export const SelectWrapper = (data) =>
  data.map((d) => (
    <MenuItem key={d.id} value={d.id}>
      {d.name}
    </MenuItem>
  ));

const OpponentSelectHelper = (opponents) =>
  Object.keys(opponents).map((key) =>
    <MenuItem key={key} value={key}>
      {opponents[key].name} - {opponents[key].club}
    </MenuItem>
  );

export const OpponentSelect = ({ form, opponents, error, classes, value }) => (
  <FormControl className={classes.formControl}>
    <InputLabel htmlFor="opponent-helper">Opponent</InputLabel>
    <Select
      value={value}
      onChange={(e) => {
        const id = e.target.value;
        form.setFieldValue('opponentId', id);
        form.setFieldValue('opponentName', opponents[id].name);
        form.setFieldValue('opponentClubShortHand', opponents[id].club);
      }}
      input={<Input error={error} id="opponent-helper" name="opponent" />}
    >
      {OpponentSelectHelper(opponents)}
    </Select>
  </FormControl>
);

export const AthleteSelect = ({ form, athletes, inputId, label, keyId, keyName, keyClub, error, classes, value }) => (
  <FormControl className={classes.formControl}>
    <InputLabel htmlFor={inputId}>{label}</InputLabel>
    <Select
      value={value}
      onChange={(e) => {
        const id = e.target.value;
        form.setFieldValue(keyId, id);
        form.setFieldValue(keyName, athletes[id].name);
        form.setFieldValue(keyClub, athletes[id].club);
      }}
      input={<Input error={error} id={inputId} name={inputId} />}
    >
      {OpponentSelectHelper(athletes)}
    </Select>
  </FormControl>
);

export const DatePickerField = ({ field, form, classes, ...other }) => {
  const currentError = form.errors[field.name];
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        className={classes.textField}
        disableFuture
        autoOk
        variant="inline"
        name={field.name}
        value={field.value}
        format="DD-MM-YYYY"
        helperText={currentError}
        error={Boolean(currentError)}
        onError={(error) => {
          if (error !== currentError) {
            form.setFieldError(field.name, error);
          }
        }}
        onChange={(date) => date && form.setFieldValue(field.name, date.format('YYYY-MM-DDT00:00:00.000') + 'Z', true)}
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};

export const DisabledSwitch = ({ onChange, id, initValue = false, className }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          className={className}
          name="disabled"
          checked={initValue}
          onChange={() => {
            const newValue = !initValue;
            const user = { id, disabled: newValue };
            onChange(user);
          }}
          value={initValue}
          color="secondary"
        />
      }
    />
  );
};
