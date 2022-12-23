import calendarApi from '@/api/calendar';

export default {
  namespaced: true,

  state: () => ({}),

  actions: {
    getCalendarUnavailableDates(context, data) {
      return calendarApi.getCalendarUnavailableDates(data);
    },
    getCalendarProductsVUE3(context, data) {
      return calendarApi.getCalendarProductsVUE3(data);
    },
    getCalendarProductsVUE2(context, data) {
      return calendarApi.getCalendarProductsVUE2(data);
    },
    getCalendarProductsVUE(context, data) {
      return calendarApi.getCalendarProductsVUE(data);
    },
    getCalendarProductsVUEByCalendarCategory(context, data) {
      return calendarApi.getCalendarProductsVUEByCalendarCategory(data);
    },
  }
}
