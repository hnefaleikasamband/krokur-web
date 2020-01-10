import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import GLogo from '../../../assets/Google_G_Logo.svg';


const styles = (theme) => ({
  'link': {
    width: '100%',
    marginTop: '24px'
  },
  'googleBtn': {
    width: '100%',
    height: '42px',
    backgroundColor: '#4285f4',
    borderRadius: '2px',
    boxShadow: '0 3px 4px 0 rgba(0,0,0,.25)',
    '& .google-icon-wrapper': {
      position: 'absolute',
      marginTop: '1px',
      marginLeft: '1px',
      width: '40px',
      height: '40px',
      borderRadius: '2px',
      backgroundColor: 'white',
    },
    '& .google-icon': {
      position: 'absolute',
      marginTop: '11px',
      marginLeft: '11px',
      width: '18px',
      height: '18px',
    },
    '& .btn-text': {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      margin: '11px 11px 0 0',
      color: 'white',
      fontSize: '15px',
      letterSpacing: '0.2px',
      fontWeight: 'bold',
    },
    '& :hover': {
      boxShadow: '0 0 6px #4285f4',
    },
    '&:active': {
      background: '#1669F2',
    }
  }
})

const GoogleLoginButton = ({ href, classes }) => (
  <a href={href} className={classes.link}>
    <div className={classes.googleBtn}>
      <div className="google-icon-wrapper">
        <img src={GLogo} alt="Google Logo" className="google-icon" />
      </div>
      <p className="btn-text">Sign in with google</p>
    </div>
  </a>
);

GoogleLoginButton.propTypes = {
  href: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles)(GoogleLoginButton);