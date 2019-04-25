import axios from "axios";
import config from "../../../appConfiguration";

const host = config.krokurApi;

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
