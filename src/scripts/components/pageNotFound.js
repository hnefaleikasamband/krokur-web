import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import { ReactComponent as PageNotFoundSVG } from '../../assets/page_not_found.svg';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';

function NotFoundImage({ className }) {
  return (
    <SvgIcon component={PageNotFoundSVG} className={className} viewBox="0 0 1074.392 584.231" />
  );
}

const styles = (theme) => ({
  paper: {
    width: '100%',
    padding: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '50vw',
    height: 'auto',
    marginBottom: theme.spacing(1),
  },
});


const PageNotFound = ({ title, subtitle, classes }) => {

  return (
    <Paper className={classes.paper} >
      <NotFoundImage className={classes.image} />
      <Typography variant="h4">The page you are looking for doesn't seem to exist</Typography>
    </Paper>
  )
}

export default withStyles(styles)(PageNotFound);