import axios from './axios';

const accountLogin = (data = {}) => axios
  .post('/AccountAuthenticationJWT/AccountLogin', data.data || {}, {
    params: data.params || {},
  });

const accountCreate = (data = {}) => axios
  .post('/AccountAuthenticationJWT/AccountCreate', data.data || {}, {
    params: data.params || {},
  });

const accountResetPasswordByEmail = (data = {}) => axios
  .post('/AccountAuthenticationJWT/AccountResetPasswordByEmail', data.data || {}, {
    params: data.params || {},
  });

const accountUpdatePasswordWithStamp = (data = {}) => axios
  .post('/AccountAuthenticationJWT/AccountUpdatePasswordWithStamp', data.data || {}, {
    params: data.params || {},
  });

export default {
  accountLogin,
  accountCreate,
  accountResetPasswordByEmail,
  accountUpdatePasswordWithStamp
};
