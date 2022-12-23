import axios from './axios';

const getAllWTPByGuest = (data = {}) => axios.get('/WTPGuests/getAllWTPByGuest', {
  params: data.params || {},
});

export default {
  getAllWTPByGuest,
};
