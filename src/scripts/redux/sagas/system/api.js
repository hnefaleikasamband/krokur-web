import axios from "axios";
import config from "../../../appConfiguration";

const host = config.krokurApi;

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
