import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './styles';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      email: '',
      password: '',
      showPassword: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ ...this.state, [name]: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.attemptLogin({ email, password });
  };

  handleClickShowPassword = () => {
    this.setState({ ...this.state, showPassword: !this.state.showPassword });
  };

  render() {
    const { classes, isLoading, isLoggedIn } = this.props;
    const { showPassword, email } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {isLoading ? (
            <CircularProgress className={classes.progress} />
          ) : (
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={this.handleChange('email')}
                  value={email}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={this.handleChange('password')}
                  autoComplete="current-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign in
              </Button>
            </form>
          )}
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  isLoading: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default withStyles(styles)(SignIn);
