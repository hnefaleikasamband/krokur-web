import React from "react";
import Summary from "./summary";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { AthleteForm } from "../../components";

const ManageAthletes = ({ isFetching, athletes, club }) => {
  return (
    <div>
      <Grid container spacing={16} direction="row-reverse">
        <Grid item xs={12} md={4}>
          <Paper>
            <AthleteForm />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Summary isfetching={isFetching} athletes={athletes} club={club} />
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
