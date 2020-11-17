import axios from 'axios';
import config from '../../../appConfiguration';

const host = config.krokurApi;

const getAllAthletes = (token) =>
  axios
    .get(`${host}/v1/athletes`, {
      headers: { Authorization: `JWT ${token}` },
    })
    .then((response) => response.data);

const getManagedAthletes = (token) =>
  axios
    .get(`${host}/v1/athletes/manage-view`, {
      headers: { Authorization: `JWT ${token}` },
    })
    .then((response) => response.data);

const getAthlete = (athleteId, token) =>
  axios
    .get(`${host}/v1/athletes/${athleteId}`, {
      headers: { Authorization: `JWT ${token}` },
    })
    .then((response) => response.data);

const addAthlete = (athlete, token) =>
  axios.post(`${host}/v1/athletes`, athlete, {
    headers: { Authorization: `JWT ${token}` },
  });

const getAthleteBouts = (athleteId, token) =>
  axios
    .get(`${host}/v1/athletes/${athleteId}/bouts`, {
      headers: { Authorization: `JWT ${token}` },
    })
    .then((response) => response.data);

const addBoutForAthlete = (boutData, token) =>
  axios.post(`${host}/v1/athletes/${boutData.athleteId}/bouts`, boutData, {
    headers: { Authorization: `JWT ${token}` },
  });

export default {
  getAllAthletes,
  getManagedAthletes,
  getAthlete,
  addAthlete,
  getAthleteBouts,
  addBoutForAthlete,
};
