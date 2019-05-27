import React, { Fragment } from 'react';
import StarIcon from '@material-ui/icons/Star';
import SchoolIcon from '@material-ui/icons/School';
import { withStyles } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import blueGrey from '@material-ui/core/colors/blueGrey';
import orage from '@material-ui/core/colors/deepOrange';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';

const styles = (theme) => ({
  badge: {
    margin: theme.spacing(1),
  },
  iconBronz: {
    color: orage.A400,
  },
  iconSilver: {
    color: blueGrey['400'],
  },
  iconGold: {
    color: yellow.A400,
  },
  iconDisabled: {
    color: 'rgba(0, 0, 0, 0.16)',
  },
});

const AchievementDisplay = ({ tooltipTitle, badge, classes, icon }) => {
  return (
    <Tooltip title={tooltipTitle} placement="top">
      <Badge className={classes.badge} badgeContent={badge ? badge : null} color="primary">
        {icon}
      </Badge>
    </Tooltip>
  );
};

const getDateStrings = (locale) => (dates) =>
  Object.keys(dates).map((key) =>
    dates[key]
      ? `- ${new Date(dates[key]).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}`
      : '- not achieved'
  );

// eslint-disable-next-line
const StarHighlighter = ({ achievements, boutsLeftToAchievement = {}, classes, ...props }) => {
  const { diploma, bronz, silver, gold } = achievements;
  const dates = getDateStrings('en-GB')(achievements);
  const [diplomaDate, bronzDate, silverDate, goldDate] = dates;
  const { diplomaLeft, bronzLeft, silverLeft, goldLeft } = boutsLeftToAchievement;
  return (
    <Fragment>
      <AchievementDisplay
        tooltipTitle={`Diploma ${diplomaDate}`}
        badge={diploma ? null : diplomaLeft + 1}
        classes={classes}
        icon={<SchoolIcon color={diploma ? 'inherit' : 'disabled'} />}
      />
      <AchievementDisplay
        tooltipTitle={`Bronz ${bronzDate}`}
        badge={bronz ? null : bronzLeft + 1}
        classes={classes}
        icon={<StarIcon className={bronz ? classes.iconBronz : classes.iconDisabled} />}
      />
      <AchievementDisplay
        tooltipTitle={`Silver ${silverDate}`}
        badge={silver ? null : silverLeft + 1}
        classes={classes}
        icon={<StarIcon className={silver ? classes.iconSilver : classes.iconDisabled} />}
      />
      <AchievementDisplay
        tooltipTitle={`Gold ${goldDate}`}
        badge={gold ? null : goldLeft + 1}
        classes={classes}
        icon={<StarIcon className={gold ? classes.iconGold : classes.iconDisabled} />}
      />
    </Fragment>
  );
};

export default withStyles(styles)(StarHighlighter);
