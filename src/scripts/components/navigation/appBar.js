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

const AppBar = ({ classes, openDrawer, userInfo, logout }) => {
  const [profileMenuEl, setProfileMenuEl] = React.useState(false);
  const isProfileMenuOpen = Boolean(profileMenuEl);

  const logoutUser = () => {
    logout();
    setProfileMenuEl(null);
  };

  const profileMenu = (
    <Menu
      anchorEl={profileMenuEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isProfileMenuOpen}
      onClose={() => setProfileMenuEl(null)}
    >
      <MenuItem onClick={() => setProfileMenuEl(null)}>My account</MenuItem>
      <MenuItem onClick={logoutUser}>Log out</MenuItem>
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
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Typography className={classes.displayName} variant="subtitle1" color="inherit" noWrap>
            {userInfo.name}
          </Typography>
          <IconButton
            aria-owns={isProfileMenuOpen ? 'material-appbar' : null}
            aria-haspopup="true"
            onClick={(e) => setProfileMenuEl(e.currentTarget)}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </ApplicationBar>
      {profileMenu}
    </Fragment>
  );
};

AppBar.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles, { withTheme: true })(AppBar);
