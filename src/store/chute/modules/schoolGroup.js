import schoolGroupApi from '@/api/schoolGroup';

export default {
  namespaced: true,

  state: () => ({}),

  actions: {
    getSchoolGroupInformation(context, data) {
      return schoolGroupApi.getSchoolGroupInformation(data);
    },
    saveSchoolGroupInformation(context, data) {
      return schoolGroupApi.saveSchoolGroupInformation(data);
    },
    setSchoolGroupLimit(context, data) {
      return schoolGroupApi.setSchoolGroupLimit(data);
    },
    getSchoolGroupMembersInformation(context, data) {
      return schoolGroupApi.getSchoolGroupMembersInformation(data);
    },
  }
}
