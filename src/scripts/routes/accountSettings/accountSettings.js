import React from 'react';
import { Header } from '../../components';
import Button from '@material-ui/core/Button';
import config from '../../appConfiguration';

const AccountSettings = ({ user }) => {
  return (
    <>
      <Header
        title={'Account Settings'}
        subtitle={``}
        buttonsRight={
          <Button
            variant="contained"
            color="primary"
            href={`${config.krokurApi}/v1/auth/google?id=${user.userInfo.id}`}
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
