import axios from './axios';

const getCalendarAvailableDates = (data = {}) => axios.get('/AAPKReservation/GetCalendarAvailableDates', {
  params: data.params || {},
});

const getAllProductInformation = (data = {}) => axios.get('/AAPKReservation/GetAllProductInformation', {
  params: data.params || {},
});

const getAllSkillLevel = (data = {}) => axios.get('/AAPKReservation/GetAllSkillLevel', {
  params: data.params || {},
});

export default {
  getCalendarAvailableDates,
  getAllProductInformation,
  getAllSkillLevel,
};
