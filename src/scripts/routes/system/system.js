import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UsersSummary from './usersSummary';
import ClubsSummary from './clubsSummary';
import SpeedDial from './speedDial';

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  exampleWrapper: {
    position: 'relative',
    height: 380,
  },
});

const System = ({ usersData, clubsData, classes }) => {
  console.log('classes:', classes);
  return (
    <Fragment>
      <Grid container spacing={16} direction="row">
        <Grid item xs={12} md={7}>
          <UsersSummary isFetching={usersData.isFetching} users={usersData.data} />
        </Grid>
        <Grid item xs={12} md={5}>
          <ClubsSummary isFetching={clubsData.isFetching} clubs={clubsData.data} />
        </Grid>
      </Grid>
      <SpeedDial />
    </Fragment>
  );
};

System.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles)(System);
