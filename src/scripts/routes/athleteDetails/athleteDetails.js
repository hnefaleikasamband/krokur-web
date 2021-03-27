import React from "react";
import { Redirect } from "react-router-dom";
import { Header, NumberHighlighter } from "../../components";
import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import BoutSummary from "./boutSummary";
import AthleteBoutDialog from "./athleteBoutDialog";
import PageNotFound from "../../components/pageNotFound";

const useStyles = makeStyles({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "24px",
  },
});

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
  const classes = useStyles();
  console.log(athlete);
  if (
    !isAdmin &&
    userClub &&
    athlete &&
    userClub.shorthand !== athlete.clubShorthand
  ) {
    return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
  }
  return isFetchingAthlete ? (
    <CircularProgress />
  ) : athlete ? (
    <>
      <div className={classes.headerContainer}>
        <Header
          title={athlete.name}
          subtitle={`KT: ${athlete.ssn} - ${athlete.club}`}
          buttonsRight={
            isAdmin &&
            tempDisplayButtons(athlete, athletes, clubs, addBoutForAthlete)
          }
        />
        <NumberHighlighter value={bouts.length} text="Bout Count" />
      </div>
      <BoutSummary
        isFetching={isFetchingBouts}
        athlete={athlete}
        bouts={bouts}
        history={history}
      />
    </>
  ) : (
    <PageNotFound />
  );
};

export default AthleteDetails;
