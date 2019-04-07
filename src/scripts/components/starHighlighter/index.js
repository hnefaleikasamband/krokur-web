import React, { Fragment } from "react";
import StarIcon from "@material-ui/icons/Star";
import SchoolIcon from "@material-ui/icons/School";
import { withStyles } from "@material-ui/core/styles";
import yellow from "@material-ui/core/colors/yellow";
import blueGrey from "@material-ui/core/colors/blueGrey";
import orage from "@material-ui/core/colors/deepOrange";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  iconBronz: {
    color: orage["A400"]
  },
  iconSilver: {
    color: blueGrey["400"]
  },
  iconGold: {
    color: yellow["A400"]
  },
  iconDisabled: {
    color: "rgba(0, 0, 0, 0.16)"
  }
});

const getDateString = locale => date =>
  date
    ? `- ${new Date(date).toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric"
      })}`
    : "- not achieved";

const StarHighlighter = ({
  diploma = null,
  bronz = null,
  silver = null,
  gold = null,
  classes,
  ...props
}) => {
  const diplomaDate = getDateString("en-GB")(diploma);
  const bronzDate = getDateString("en-GB")(bronz);
  const silverDate = getDateString("en-GB")(silver);
  const goldDate = getDateString("en-GB")(gold);
  return (
    <Fragment>
      <Tooltip title={`Diploma ${diplomaDate}`} placement="top">
        <SchoolIcon color={diploma ? "inherit" : "disabled"} />
      </Tooltip>
      <Tooltip title={`Bronz ${bronzDate}`} placement="top">
        <StarIcon
          className={bronz ? classes.iconBronz : classes.iconDisabled}
        />
      </Tooltip>
      <Tooltip title={`Silver ${silverDate}`} placement="top">
        <StarIcon
          className={silver ? classes.iconSilver : classes.iconDisabled}
        />
      </Tooltip>
      <Tooltip title={`Gold ${goldDate}`} placement="top">
        <StarIcon className={gold ? classes.iconGold : classes.iconDisabled} />
      </Tooltip>
    </Fragment>
  );
};

export default withStyles(styles)(StarHighlighter);
