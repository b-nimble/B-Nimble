import axios from 'axios';
import { getAuthToken, getTempToken } from '@/shared/utils/token';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000 * 100,
});

instance.interceptors.request.use((config) => {
  const newConfig = { ...config };
  const tempToken = getTempToken();
  const authToken = getAuthToken();

  if (tempToken || authToken) {
    newConfig.params = newConfig.params || {};
    newConfig.params.token = authToken || tempToken;

    return newConfig;
  }

  return new Promise(
    (resolve) => {
      axios.post(`${import.meta.env.VITE_API_URL}/AccountAuthenticationJWT/AccountCreateTempCustomer`)
        .then((response) => {
          window.localStorage.setItem('tempToken', response.data.token);
          resolve(newConfig);
        })
        .catch(() => resolve(newConfig))
    }
  );
}, (error) => Promise.reject(error));

export default instance;
