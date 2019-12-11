import React from 'react';
import { Header } from '../../components';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const AccountSettings = ({ isFetchingUser, user, clubs, ...props }) => {
  return (
    <>
      <Header
        title={'Account Settings'}
        subtitle={``}
        buttonsRight={
          <Button
            variant="contained"
            color="primary"
            href={`http://localhost:3000/api/v1/auth/google?id=${user.userInfo.id}`}
          >
            link google
          </Button>
        }
      />
      <Button>Data </Button>
    </>
  );
};

export default AccountSettings;
