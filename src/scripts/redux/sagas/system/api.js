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

export default { getUsers, getClubs, addClub, updateClub };
