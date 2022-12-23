import nightLeagueApi from '@/api/nightLeague';

export default {
  namespaced: true,

  state: () => ({}),

  actions: {
    getNightLeagueInformation(context, data) {
      return nightLeagueApi.getNightLeagueInformation(data);
    },
    saveNightLeagueInformation(context, data) {
      return nightLeagueApi.saveNightLeagueInformation(data);
    },
    getNightLeagueMembersInformation(context, data) {
      return nightLeagueApi.getNightLeagueMembersInformation(data);
    }
  }
}
