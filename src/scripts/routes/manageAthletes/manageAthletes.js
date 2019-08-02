import React from 'react';
import Summary from './summary';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { AthleteForm, Header } from '../../components';
import Button from '@material-ui/core/Button';

const tempDisplayButtons = (
  <>
    <Button variant="contained" color="primary" disabled key="add-button">
      Add Bout
    </Button>
    <Button variant="contained" color="primary" disabled key="transfer-button">
      Transfer Athlete
    </Button>
  </>
);

const ManageAthletes = ({ isFetchingAthletes, athletes, clubsData, addAthlete, history }) => {
  return (
    <div>
      <Header
        title="Manage Athletes"
        subtitle="Manage all athletes information & bouts"
        buttonsRight={tempDisplayButtons}
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
        <Grid item xs={12} md={4}>
          <Paper>
            <h2>Transfer Athlete</h2>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ManageAthletes;
