import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { UsersSummary } from './users';
import { ClubsSummary } from './clubs';
import SpeedDial from './speedDial';
import { ClubFormDialog } from './clubs';

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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
      <ClubFormDialog />
      <Grid container spacing={4} direction="row">
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
