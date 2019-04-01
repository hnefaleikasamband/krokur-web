import React from "react";
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
  ListItemText
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import MemoryIcon from "@material-ui/icons/Memory";
import ViewList from "@material-ui/icons/ViewList";
import AssignmentIcon from "@material-ui/icons/Assignment"
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import styles from "./navStyles";
import AppBar from "./appBar";

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { children, classes, user, logout } = this.props;

    const drawer = (
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
          <MenuItem component={Link} to="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </MenuItem>
          <MenuItem component={Link} to="/athletes">
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary={"All Athletes"} />
          </MenuItem>
          <MenuItem component={Link} to="/team-athletes">
            <ListItemIcon>
              <SupervisedUserCircle />
            </ListItemIcon>
            <ListItemText primary={"My Athletes"} />
          </MenuItem>
        </MenuList>
        <Divider />
        <MenuList>
          <MenuItem component={Link} to="/users/some-text">
            <ListItemIcon>
              <ViewList />
            </ListItemIcon>
            <ListItemText primary={"Bout logs"} />
          </MenuItem>
          <MenuItem component={Link} to="/guide">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={"Diploma guide"} />
          </MenuItem>
          <MenuItem component={Link} to="/users/some-text">
            <ListItemIcon>
              <MemoryIcon />
            </ListItemIcon>
            <ListItemText primary={"System"} />
          </MenuItem>
          <MenuItem component={Link} to="/users/some-text">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={"My Account"} />
          </MenuItem>
        </MenuList>
      </div>
    );
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          openDrawer={this.handleDrawerToggle}
          userInfo={user.userInfo}
          logout={logout}
        />
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
