import axios from 'axios';
import config from '../../../appConfiguration';

const host = config.krokurApi;

const addFullMatch = (matchData, token) =>
  axios.post(`${host}/v1/match/`, matchData, {
    headers: { Authorization: `JWT ${token}` },
  });

export default {
  addFullMatch,
};
