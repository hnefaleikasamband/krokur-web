import axios from 'axios';
import config from '../../../appConfiguration';

const host = config.krokurApi;

const getUsers = (token) =>
  axios
    .get(`${host}/api/v1/users`, {
      headers: { Authorization: `JWT ${token}` },
    })
    .then((response) => response.data);

const getClubs = (token) =>
  axios
    .get(`${host}/api/v1/clubs`, {
      headers: { Authorization: `JWT ${token}` },
    })
    .then((response) => response.data);

const addClub = (club, token) =>
  axios
    .post(`${host}/api/v1/clubs`, club, {
      headers: { Authorization: `JWT ${token}` },
    })
    .then((response) => response.data);

const updateClub = (club, token) =>
  axios.put(`${host}/api/v1/clubs/${club.id}`, club, {
    headers: { Authorization: `JWT ${token}` },
  });

const addUser = (user, token) =>
  axios.post(`${host}/api/v1/auth/register`, user, {
    headers: { Authorization: `JWT ${token}` },
  });

const updateUser = (user, token) =>
  Promise((resolve, reject) => {
    reject('user update path does not exists yet');
  });

export default { getUsers, getClubs, addClub, updateClub, addUser, updateUser };
