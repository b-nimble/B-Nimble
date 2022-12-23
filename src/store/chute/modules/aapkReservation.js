import aapkReservationApi from '@/api/aapkReservation';

export default {
  namespaced: true,

  state: () => ({}),

  actions: {
    getCalendarAvailableDates(context, data) {
      return aapkReservationApi.getCalendarAvailableDates(data);
    },
    getAllProductInformation(context, data) {
      return aapkReservationApi.getAllProductInformation(data);
    },
    getAllSkillLevel(context, data) {
      return aapkReservationApi.getAllSkillLevel(data);
    },
  }
}
