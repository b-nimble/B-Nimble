import accountAuthenticationJwtApi from '@/api/accountAuthenticationJwt';
import { getAuthToken, getTempToken } from '@/shared/utils/token';

export default {
  namespaced: true,

  state: () => ({
    authToken: getAuthToken(),
    tempToken: getTempToken(),
  }),

  getters: {
    authToken(state) {
      return state.authToken;
    },

    tempToken(state) {
      return state.tempToken;
    },

    isLoggedIn(state) {
      return !!state.authToken;
    }
  },

  actions: {
    login(context, data) {
      return accountAuthenticationJwtApi.accountLogin(data);
    },
    loginSuccess(context, data) {
      context.commit('loginSuccess', data);
    },
    register(context, data) {
      return accountAuthenticationJwtApi.accountCreate(data);
    },
    updateAuthToken(context, data) {
      context.commit('updateAuthToken', data);
    },
    accountResetPasswordByEmail(context, data) {
      return accountAuthenticationJwtApi.accountResetPasswordByEmail(data);
    },
    accountUpdatePasswordWithStamp(context, data) {
      return accountAuthenticationJwtApi.accountUpdatePasswordWithStamp(data);
    },
  },

  mutations: {
    loginSuccess(state, data) {
      localStorage.setItem('authToken', data.token);
      state.authToken = data.token;
    },
    updateAuthToken(state, data) {
      localStorage.setItem('authToken', data.token);
      state.authToken = data.token;
    }
  },
}
