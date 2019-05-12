import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';

const actions = [{ icon: <PersonIcon />, name: 'User' }, { icon: <HomeIcon />, name: 'Club' }];

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  controls: {
    margin: theme.spacing.unit * 3,
  },
  exampleWrapper: {
    position: 'relative',
    height: 380,
  },
  speedDial: {
    position: 'absolute',
    '&$directionUp, &$directionLeft': {
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 3,
    },
  },
});

class SpeedDials extends React.Component {
  state = {
    open: false,
    hidden: false,
  };

  handleClick = () => {
    this.setState((state) => ({
      open: !state.open,
    }));
  };

  handleHiddenChange = (event, hidden) => {
    this.setState((state) => ({
      hidden,
      // hidden implies !open
      open: hidden ? false : state.open,
    }));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;
    const { hidden, open } = this.state;

    const speedDialClassName = classNames(classes.speedDial, classes.directionUp);

    return (
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="Add to system"
          className={speedDialClassName}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onBlur={this.handleClose}
          onClick={this.handleClick}
          onClose={this.handleClose}
          onFocus={this.handleOpen}
          onMouseEnter={this.handleOpen}
          onMouseLeave={this.handleClose}
          open={open}
          direction="up"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={this.handleClick}
            />
          ))}
        </SpeedDial>
      </div>
    );
  }
}

SpeedDials.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles)(SpeedDials);
