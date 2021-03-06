import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { UsersSummary, UserFormDialog } from './users';
import { ClubsSummary, ClubFormDialog } from './clubs';
import { Header } from '../../components';

const styles = (theme) => ({
  buttonContainer: {
    margin: '0 0 24px',
  },
  button: {
    marginLeft: theme.spacing(1),
  },
});

const System = ({
  isFetchingUsers,
  isFetchingClubs,
  users,
  clubs,
  addClubAction,
  editClubAction,
  addUserAction,
  updateUserAction,
  toggleUserDisabledValue,
  updateUserPassword,
}) => {
  return (
    <Fragment>
      <Header
        title="Application"
        subtitle="Manage system wide settings"
        buttonsRight={
          <>
            <UserFormDialog submitAction={addUserAction} buttonText="Add a User" clubs={clubs} />
            <ClubFormDialog submitAction={addClubAction} buttonText="Add a Club" />
          </>
        }
      />
      <Grid container spacing={4} direction="row">
        <Grid item xs={12} xl={7}>
          <UsersSummary
            isFetching={isFetchingUsers}
            users={users}
            editAction={updateUserAction}
            setDisabledValue={toggleUserDisabledValue}
            clubs={clubs}
            changePassword={updateUserPassword}
          />
        </Grid>
        <Grid item xs={12} xl={5}>
          <ClubsSummary isFetching={isFetchingClubs} clubs={clubs} editAction={editClubAction} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

System.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles)(System);
