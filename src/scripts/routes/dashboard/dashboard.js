import React from "react";

const Dashboard = ({ refreshDashboard, myText, match }) => {
  return (
    <div>
      <p>
        {myText} ...or {match.params.myText}{" "}
      </p>
    </div>
  );
};

export default Dashboard;
