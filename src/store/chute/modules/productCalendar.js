import productCalendarApi from '@/api/ProductCalendar';

export default {
  namespaced: true,

  state: () => ({}),

  actions: {
    getCalendarDays(context, data) {
      return productCalendarApi.getCalendarDays(data);
    }
  }
}
