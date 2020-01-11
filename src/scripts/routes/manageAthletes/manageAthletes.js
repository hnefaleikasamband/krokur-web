import React from 'react';
import Summary from './summary';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { AthleteForm, Header } from '../../components';

import MatchDialog from './matchDialog';

const ManageAthletes = ({ isFetchingAthletes, athletes, clubsData, addAthlete, addMatch, history }) => {
  return (
    <div>
      <Header
        title="Manage Athletes"
        subtitle="Manage all athletes information & bouts"
        buttonsRight={
          <MatchDialog
            athletes={athletes}
            clubs={clubsData}
            buttonText="Add a match"
            submitAction={addMatch}
          >
            Add Match
          </MatchDialog>
        }
      />
      <Grid container spacing={4} direction="row-reverse">
        <Grid item xs={12} md={4}>
          <Paper>
            <AthleteForm clubs={clubsData} submitText="Add new Athlete" onSubmit={addAthlete} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Summary isfetching={isFetchingAthletes} athletes={athletes} history={history} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ManageAthletes;
