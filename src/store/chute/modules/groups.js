import groupsApi from '@/api/groups';

export default {
  namespaced: true,

  state: () => ({}),

  actions: {
    getSchoolGroupInformation(context, data) {
      return groupsApi.getSchoolGroupInformation(data);
    },
    saveSchoolGroupInformation(context, data) {
      return groupsApi.setCalendarProductsVUE2(data);
    },
    getSchoolGroupMembersInformation(context, data) {
      return groupsApi.getSchoolGroupMembersInformation(data);
    },
    setSchoolGroupLimit(context, data) {
      return groupsApi.setSchoolGroupLimit(data);
    }
  }
}
