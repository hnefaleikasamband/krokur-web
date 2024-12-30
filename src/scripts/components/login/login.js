import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import HniLogo from "../../../assets/hni-logo.png";
import styles from "./styles";
import GoogleLoginButton from "./googleLoginButton";

import config from "../../appConfiguration";

const SignIn = ({ classes, location, isLoading, isLoggedIn, attemptLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    attemptLogin({ email, password });
  };

  if (isLoggedIn) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;
  }

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <img src={HniLogo} alt="HNÍ logo" className={classes.logo} />
        {isLoading ? (
          <CircularProgress className={classes.progress} />
        ) : (
          <form className={classes.form} onSubmit={handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                variant="outlined"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {/*
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />*/}
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="default"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        )}
        <GoogleLoginButton href={`${config.krokurApi}/v1/auth/google`} />
      </Paper>
    </main>
  );
};

SignIn.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  isLoading: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  attemptLogin: PropTypes.func.isRequired,
};

export default withStyles(styles)(SignIn);
