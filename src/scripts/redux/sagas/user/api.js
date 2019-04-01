import axios from "axios";
// import configuration from '../../../appConfiguration';

// const host = configuration["TrustpilotApi.Host"];
const host = "https://krokur-api-staging.test.mikligardur.com";

const signIn = ({ email, password }) =>
  axios
    .post(`${host}/api/v1/auth/login`, {
      email,
      password
    })
    .then(response => response.data);

const getUserByToken = token =>
  axios
    .get(`${host}/api/v1/auth/user`, { headers: { Authorization: token } })
    .then(response => response.data);

export default { signIn, getUserByToken };
