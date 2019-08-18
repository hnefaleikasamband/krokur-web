import React from 'react';
import { Formik } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { ClubsSelect } from '../helpers';
import styles from './userFormStyles';
import UserSchema from './userSchema';

const UserForm = ({ initialValues, onSubmit, classes, submitText, onCancel, clubs }) => {
  const [disabledSwitch, setdisabledSwitch] = React.useState(initialValues.disabled || false);
  return (
    <Formik initialValues={initialValues} validationSchema={UserSchema} onSubmit={onSubmit}>
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
            id="email"
            label="Email"
            className={classes.textField}
            margin="normal"
            value={values.email}
            onChange={handleChange}
            error={errors.email && touched.email}
            required
          />
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
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="role-helper">Role</InputLabel>
            <Select
              value={values.role}
              onChange={handleChange}
              input={<Input name="role" id="role-helper" />}
            >
              <MenuItem value={'COACH'}>Coach</MenuItem>
              <MenuItem value={'JUDGE'}>Judge</MenuItem>
              <MenuItem value={'ADMIN'}>Admin</MenuItem>
            </Select>
          </FormControl>
          {values.role === 'COACH' && (
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="club-helper">Club</InputLabel>
              <Select
                value={values.club}
                onChange={handleChange}
                input={<Input name="club" id="club-helper" />}
              >
                {ClubsSelect(clubs)}
              </Select>
            </FormControl>
          )}
          <FormControlLabel
            control={
              <Switch
                className={classes.switch}
                checked={disabledSwitch}
                onChange={() => setdisabledSwitch(!disabledSwitch)}
                value="disabled"
                color="secondary"
              />
            }
            label="Disable user"
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
  initialValues: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    name: PropTypes.string,
    club: PropTypes.string,
    role: PropTypes.string,
    disabled: PropTypes.bool,
  }),
  onSubmit: PropTypes.func.isRequired,
};

UserForm.defaultProps = {
  initialValues: {
    id: null,
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    club: '',
    role: '',
    disabled: false,
  },
};

export default withStyles(styles)(UserForm);
