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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const AlignItemsList = ({ classes, unread }) => {
  return (
    <ListItem alignItems="flex-start" className={unread ? classes.unread : ''}>
      <ListItemAvatar>
        <Avatar alt="Notification bell">
          <NotificationsIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Test notification"
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              System
            </Typography>
            {' — This is a test notification, you can safely ignore this message…'}
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

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
  root: {
    width: '100%',
    maxWidth: 360,
    maxHeight: 520,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  unread: {
    backgroundColor: 'lightgray',
  },
});

const NotificationMenu = ({ classes, notificationMenuEl, setNotificationMenuEl }) => (
  <Menu
    id="notification-menu"
    anchorEl={notificationMenuEl}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    getContentAnchorEl={null}
    open={Boolean(notificationMenuEl)}
    onClose={() => setNotificationMenuEl(null)}
  >
    <List className={classes.root}>
      <AlignItemsList classes={classes} />
      <Divider variant="inset" component="li" />
    </List>
  </Menu>
);

const AppBar = ({ classes, openDrawer, userInfo, logout }) => {
  const [profileMenuEl, setProfileMenuEl] = React.useState(null);
  const [notificationMenuEl, setNotificationMenuEl] = React.useState(null);

  const logoutUser = () => {
    logout();
    setProfileMenuEl(null);
  };

  const profileMenu = (
    <Menu
      id="profile-menu"
      anchorEl={profileMenuEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      getContentAnchorEl={null}
      open={Boolean(profileMenuEl)}
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
          <IconButton
            color="inherit"
            aria-controls="notification-menu"
            aria-haspopup="listbox"
            onClick={(e) => setNotificationMenuEl(e.currentTarget)}
          >
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Typography className={classes.displayName} variant="subtitle1" color="inherit" noWrap>
            {userInfo.name}
          </Typography>
          <IconButton
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={(e) => setProfileMenuEl(e.currentTarget)}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </ApplicationBar>
      {profileMenu}
      <NotificationMenu
        classes={classes}
        notificationMenuEl={notificationMenuEl}
        setNotificationMenuEl={setNotificationMenuEl}
      />
    </Fragment>
  );
};

AppBar.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles, { withTheme: true })(AppBar);
