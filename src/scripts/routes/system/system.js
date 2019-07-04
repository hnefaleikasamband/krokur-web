import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { UsersSummary, UserFormDialog } from './users';
import { ClubsSummary, ClubFormDialog } from './clubs';

const styles = (theme) => ({
  buttonContainer: {
    margin: '0 0 24px',
  },
});

const System = ({
  usersData,
  clubsData,
  addClubAction,
  editClubAction,
  addUserAction,
  updateUserAction,
  classes,
}) => {
  return (
    <Fragment>
      <Grid container spacing={1} direction="row" className={classes.buttonContainer}>
        <Grid item>
          <UserFormDialog
            submitAction={addUserAction}
            buttonText="Add a User"
            clubs={clubsData.data}
          />
        </Grid>
        <Grid item>
          <ClubFormDialog submitAction={addClubAction} buttonText="Add a Club" />
        </Grid>
      </Grid>
      <Grid container spacing={4} direction="row">
        <Grid item xs={12} lg={7}>
          <UsersSummary isFetching={usersData.isFetching} users={usersData.data} />
        </Grid>
        <Grid item xs={12} lg={5}>
          <ClubsSummary
            isFetching={clubsData.isFetching}
            clubs={clubsData.data}
            editAction={editClubAction}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

System.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles)(System);
