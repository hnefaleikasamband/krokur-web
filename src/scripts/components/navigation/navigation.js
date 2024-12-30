import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  MenuList,
  MenuItem,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
//import SettingsIcon from '@material-ui/icons/Settings';
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import MemoryIcon from "@material-ui/icons/Memory";
//import ViewList from '@material-ui/icons/ViewList';
//import SchoolIcon from '@material-ui/icons/School';
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import styles from "./navStyles";
import AppBar from "./appBar";

const NavItem = ({ path, navText, show = true, icon }) => {
  return (
    show && (
      <MenuItem component={Link} to={path}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={navText} />
      </MenuItem>
    )
  );
};

const showNavItem = (roles = [], role) => roles.includes(role);

const drawer = (classes, user) => (
  <div className={classes.drawerContainer}>
    <div>
      <Hidden xsDown>
        <div className={classes.toolbar} />
      </Hidden>
      <Hidden smUp>
        <ListItem>
          <ListItemText primary={"Krókur"} />
        </ListItem>
      </Hidden>
      <Divider />
      <MenuList>
        <NavItem path="/" navText="Dashboard" icon={<DashboardIcon />} />
        <NavItem
          path="/all-athletes"
          navText="All Athletes"
          icon={<SupervisorAccountIcon />}
        />
        <NavItem
          path="/my-athletes"
          navText="My Athletes"
          show={showNavItem(["COACH"], user.userInfo.role)}
          icon={<SupervisedUserCircle />}
        />
        <NavItem
          path="/manage-athletes"
          navText="Manage Athletes"
          show={showNavItem(["ADMIN"], user.userInfo.role)}
          icon={<SupervisedUserCircle />}
        />
      </MenuList>
      <Divider />
      <MenuList>
        {/*<NavItem
        path="/bout-logs"
        navText="Bout logs"
        show={showNavItem(['ADMIN'], user.userInfo.role)}
        icon={<ViewList />}
      />*/}
        {/*<NavItem path="/guide" navText="Diploma guide" icon={<SchoolIcon />} />*/}
        <NavItem
          path="/system"
          navText="System"
          show={showNavItem(["ADMIN"], user.userInfo.role)}
          icon={<MemoryIcon />}
        />
        {/*<NavItem path="/account" navText="My Account" icon={<SettingsIcon />} />*/}
      </MenuList>
    </div>
  </div>
);

const ResponsiveDrawer = ({ children, classes, user, logout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        openDrawer={() => setMobileOpen(!mobileOpen)}
        userInfo={user.userInfo}
        logout={logout}
      />
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(!mobileOpen)}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer(classes, user)}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer(classes, user)}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
