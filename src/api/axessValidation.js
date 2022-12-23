import axios from './axios';

const checkAgeRestriction = (data = {}) => axios.get('/AxessValidation/CheckAgeRestriction', {
  params: data.params || {},
});

const validateAxess = (data = {}) => axios.get('/AxessValidation/ValidateAxess', {
  params: data.params || {},
});

export default {
  checkAgeRestriction,
  validateAxess,
};
