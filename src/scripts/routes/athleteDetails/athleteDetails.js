import React from 'react';
import { Redirect } from 'react-router-dom';
import { Header } from '../../components';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import BoutSummary from './boutSummary';
import AthleteBoutDialog from './athleteBoutDialog';
import PageNotFound from '../../components/pageNotFound';

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
  userClub,
  ...props
}) => {
  if (!isAdmin && userClub && athlete && userClub.shorthand !== athlete.clubShorthand) {
    return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
  }
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
        <PageNotFound />
      );
};

export default AthleteDetails;
