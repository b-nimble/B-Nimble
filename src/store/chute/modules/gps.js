import gpsApi from '@/api/gps';

export default {
  namespaced: true,

  state: () => ({}),

  actions: {
    getGPSMembersInformation(context, data) {
      return gpsApi.getGPSMembersInformation(data);
    },
    startGPSGroup(context, data) {
      return gpsApi.startGPSGroup(data);
    },
  }
}
