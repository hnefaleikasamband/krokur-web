import axios from 'axios';
import config from '../../../appConfiguration';

const host = config.krokurApi;

const getUsers = (token) =>
  axios
    .get(`${host}/v1/users`, {
      headers: { Authorization: `JWT ${token}` },
    })
    .then((response) => response.data);

const getClubs = (token) =>
  axios
    .get(`${host}/v1/clubs`, {
      headers: { Authorization: `JWT ${token}` },
    })
    .then((response) => response.data);

const addClub = (club, token) =>
  axios
    .post(`${host}/v1/clubs`, club, {
      headers: { Authorization: `JWT ${token}` },
    })
    .then((response) => response.data);

const updateClub = (club, token) =>
  axios.put(`${host}/v1/clubs/${club.id}`, club, {
    headers: { Authorization: `JWT ${token}` },
  });

const addUser = (user, token) =>
  axios.post(`${host}/v1/users`, user, {
    headers: { Authorization: `JWT ${token}` },
  });

const updateUser = (user, token) =>
  axios.put(`${host}/v1/users/${user.id}`, user, {
    headers: { Authorization: `JWT ${token}` },
  });

const toggleUserDisabledValue = (id, disabled, token) =>
  axios.put(
    `${host}/v1/users/${id}/disable`,
    { disabled },
    {
      headers: { Authorization: `JWT ${token}` },
    }
  );

const updateUserPassword = (userData, token) =>
  axios.put(`${host}/v1/users/${userData.id}/password`, userData, {
    headers: { Authorization: `JWT ${token}` },
  });

export default {
  getUsers,
  getClubs,
  addClub,
  updateClub,
  addUser,
  updateUser,
  toggleUserDisabledValue,
  updateUserPassword,
};
