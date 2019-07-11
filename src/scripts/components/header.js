import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  container: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& button': {
      margin: theme.spacing(1),
    },
  },
  item: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  button: {
    margin: `0 ${theme.spacing(1)}px`,
  },
});

const Header = ({ title, subtitle, buttonsRight, classes }) => (
  <Paper className={classes.root}>
    <div className={classes.container}>
      <div>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="subtitle1">{subtitle}</Typography>
      </div>
      <div className={classes.item}>{buttonsRight}</div>
    </div>
  </Paper>
);

export default withStyles(styles)(Header);
