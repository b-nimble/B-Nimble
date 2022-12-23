import jwt_decode from "jwt-decode";
import moment from 'moment';

const getToken = (token) => {
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwt_decode(token);
    const utcTimestamp = moment.utc().valueOf() / 1000;

    if (decodedToken.exp <= utcTimestamp) {
      return null;
    }

    return token;
  } catch (e) {
    console.log(e);
  }

  return null;
};

export function getTempToken() {
  const tempToken = window.localStorage.getItem('tempToken');

  return getToken(tempToken);
}

export function getAuthToken() {
  const authToken = window.localStorage.getItem('authToken');

  return getToken(authToken);
}

export function clearTokens() {
  window.localStorage.removeItem('tempToken');
  window.localStorage.removeItem('authToken');
}
