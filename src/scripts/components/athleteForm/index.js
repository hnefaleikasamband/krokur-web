import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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

const AthleteForm = ({ providedClub, classes }) => {
  return (
    <Fragment>
      <form className={classes.container} noValidate autoComplete="off">
        <Typography variant="h5">Add Athlete</Typography>
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          onChange={() => {}}
          margin="normal"
          required
        />
        <TextField
          id="ssn"
          label="Social Security Number"
          className={classes.textField}
          onChange={() => {}}
          margin="normal"
          required
        />
        <TextField
          id="club"
          label="Club"
          className={classes.textField}
          onChange={() => {}}
          margin="normal"
          value={providedClub}
          required
          disabled={!!providedClub}
        />
        <Button variant="contained" className={classes.button} color="primary">
          Add Athlete
        </Button>
      </form>
    </Fragment>
  );
};

export default withStyles(styles)(AthleteForm);
