import axios from "axios";
// import configuration from '../../../appConfiguration';

// const host = configuration["TrustpilotApi.Host"];
const host = "https://krokur-api-staging.test.mikligardur.com";

const getAllAthletes = token =>
  axios
    .get(`${host}/api/v1/athletes`, {
      headers: { Authorization: `JWT ${token}` }
    })
    .then(response => response.data);

const getManagedAthletes = token =>
  axios
    .get(`${host}/api/v1/athletes/manage-view`, {
      headers: { Authorization: `JWT ${token}` }
    })
    .then(response => response.data);

export default { getAllAthletes, getManagedAthletes };
