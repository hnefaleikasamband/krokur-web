import React from 'react';
import { Header } from '../../components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import BoutSummary from './boutSummary';
import AthleteBoutDialog from './athleteBoutDialog';

const tempDisplayButtons = (athlete, athletes, clubs, addBoutForAthlete) => (
  <>
    <AthleteBoutDialog
      athlete={athlete}
      opponents={athletes}
      clubs={clubs}
      buttonText="Add a match"
      submitAction={addBoutForAthlete}
    />
    <Button variant="contained" color="primary" disabled key="transfer-button">
      Transfer Athlete
    </Button>
  </>
);

const AthleteDetails = ({
  isFetchingAthlete,
  isFetchingBouts,
  athlete,
  athletes,
  bouts,
  isAdmin,
  clubs,
  history,
  addBoutForAthlete,
}) => {
  console.log('Athlete in athleteDetails: ', athlete);
  return isFetchingAthlete ? (
    <CircularProgress />
  ) : athlete ? (
    <>
      <Header
        title={athlete.name}
        subtitle={`KT: ${athlete.ssn} - ${athlete.club}`}
        buttonsRight={isAdmin && tempDisplayButtons(athlete, athletes, clubs, addBoutForAthlete)}
      />
      <BoutSummary isFetching={isFetchingBouts} athlete={athlete} bouts={bouts} history={history} />
    </>
  ) : (
    <>
      <Typography variant="h1"> 404 missing athlete...</Typography>
      <Typography variant="h4"> Maybe a fancy 404 page should be here</Typography>
    </>
  );
};

export default AthleteDetails;
