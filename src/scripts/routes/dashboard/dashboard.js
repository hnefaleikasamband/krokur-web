import React from 'react';
import Button from '@material-ui/core/Button';

const Dashboard = ({ refreshDashboard, myText, match }) => {
  return (
    <div>
      <p>
        {myText} ...or {match.params.myText}{' '}
      </p>
      <Button color="primary" type="submit" variant="contained" onClick={refreshDashboard}>
        Refhresh
      </Button>
    </div>
  );
};

export default Dashboard;
