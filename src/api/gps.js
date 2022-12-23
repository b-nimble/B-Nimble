import axios from './axios';

const getGPSMembersInformation = (data = {}) => axios.get('/GPS/GetGPSMembersInformation', {
  params: data.params || {},
});

const startGPSGroup = (data = {}) => axios.get('/GPS/StartGPSGroup', {
  params: data.params || {},
});

export default {
  getGPSMembersInformation,
  startGPSGroup,
};
