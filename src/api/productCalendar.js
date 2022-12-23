import axios from './axios';

const getCalendarDays = (data = {}) => axios.get('/ProductCalendar/GetCalendarDays', {
  params: data.params || {},
});

export default {
  getCalendarDays,
};
