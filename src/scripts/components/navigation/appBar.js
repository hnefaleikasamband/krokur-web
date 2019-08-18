import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar as ApplicationBar,
  IconButton,
  Toolbar,
  Typography,
  Badge,
  Menu,
  MenuItem,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1,
  },
  displayName: {
    paddingLeft: '5px',
  },
});

class AppBar extends React.Component {
  state = {
    mobileOpen: false,
    profileMenuEl: null,
  };

  handleProfileMenuOpen = (event) => {
    this.setState({ profileMenuEl: event.currentTarget });
  };

  handleMenuClose = () => {
    const state = this.state;
    this.setState({ ...state, profileMenuEl: null });
  };

  logoutUser = () => {
    this.props.logout();
    this.handleMenuClose();
  };

  render() {
    const { classes, openDrawer, userInfo } = this.props;
    const { profileMenuEl } = this.state;
    const isMenuOpen = Boolean(profileMenuEl);

    const renderMenu = (
      <Menu
        anchorEl={profileMenuEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={this.logoutUser}>Log out</MenuItem>
      </Menu>
    );

    return (
      <Fragment>
        <ApplicationBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => openDrawer()}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Krókur
            </Typography>
            <div className={classes.grow} />
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Typography className={classes.displayName} variant="subtitle1" color="inherit" noWrap>
              {userInfo.name}
            </Typography>
            <IconButton
              aria-owns={isMenuOpen ? 'material-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </ApplicationBar>
        {renderMenu}
      </Fragment>
    );
  }
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles, { withTheme: true })(AppBar);
