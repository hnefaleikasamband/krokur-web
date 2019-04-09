import axios from "axios";
// import configuration from '../../../appConfiguration';

// const host = configuration["TrustpilotApi.Host"];
const host = "https://krokur-api-staging.test.mikligardur.com";

const getUsers = token =>
  axios
    .get(`${host}/api/v1/users`, {
      headers: { Authorization: `JWT ${token}` }
    })
    .then(response => response.data);

const getClubs = token =>
  axios
    .get(`${host}/api/v1/clubs`, {
      headers: { Authorization: `JWT ${token}` }
    })
    .then(response => response.data);

export default { getUsers, getClubs };
