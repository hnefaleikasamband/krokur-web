import React from 'react';
import { Formik } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  formControl: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    width: '100%',
  },
  switch: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
    width: '100%',
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
});


const UserSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(5, 'Password has to be longer than 6 characters!')
    .required('Password is required!')
    .strict(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords are not the same!')
    .required('Password confirmation is required!')
    .strict(),
  role: Yup.string().required(),
  club: Yup.string().when(('role', { is: 'COACH', then: Yup.string().min(2).required() })),
  disabled: Yup.bool().default(false),
});

const clubsSelect = (clubs) =>
  clubs.map((club) => (
    <MenuItem key={club.id} value={club.id}>
      {club.name}
    </MenuItem>
  ));

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
              <MenuItem value={'REFEREE'}>Referee</MenuItem>
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
                {clubsSelect(clubs.data)}
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
  )
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
