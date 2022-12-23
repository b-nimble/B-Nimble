import axios from './axios';

const getCalendarUnavailableDates = (data = {}) => axios
  .get('/Calendar/GetCalendarUnavailableDates', {
    params: data.params || {},
  });

const getCalendarProductsVUE2 = (data = {}) => axios
  .get('/Calendar/GetCalendarProductsVUE2', {
    params: data.params || {},
  });

const getCalendarProductsVUE = (data = {}) => axios
  .get('/Calendar/GetCalendarProductsVUE', {
    params: data.params || {},
  });

const getCalendarProductsVUE3 = (data = {}) => axios
  .get('/Calendar/GetCalendarProductsVUE3', {
    params: data.params || {},
  });

const getCalendarProductsVUEByCalendarCategory = (data = {}) => axios
.get('/Calendar/GetCalendarProductsVUEByCalendarCategory', {
  params: data.params || {},
});

export default {
  getCalendarUnavailableDates,
  getCalendarProductsVUE2,
  getCalendarProductsVUEByCalendarCategory,
  getCalendarProductsVUE,
  getCalendarProductsVUE3,
};
