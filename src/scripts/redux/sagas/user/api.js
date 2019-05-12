import axios from 'axios';
import config from '../../../appConfiguration';

const host = config.krokurApi;

const signIn = ({ email, password }) =>
  axios
    .post(`${host}/api/v1/auth/login`, {
      email,
      password,
    })
    .then((response) => response.data);

const getUserByToken = (token) =>
  axios
    .get(`${host}/api/v1/auth/user`, {
      headers: { Authorization: `JWT ${token}` },
    })
    .then((response) => response.data);

export default { signIn, getUserByToken };
