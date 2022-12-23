import axios from './axios';

const getNightLeagueInformation = (data = {}) => axios
  .get('/NightLeague/GetNightLeagueInformation', {
    params: data.params || {},
  });

const getNightLeagueMembersInformation = (data = {}) => axios
  .get('/NightLeague/GetNightLeagueMembersInformation', {
    params: data.params || {},
  });

const saveNightLeagueInformation = (data = {}) => axios
  .post('/NightLeague/SaveNightLeagueInformation', data.data || {}, {
    params: data.params || {},
  });

export default {
  getNightLeagueInformation,
  saveNightLeagueInformation,
  getNightLeagueMembersInformation
};
