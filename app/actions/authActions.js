/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Date: Nov 11, 2019
 */

const REGISTER = 'REGISTER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR';

export const register = (username, password) => ({
  type: REGISTER,
  username,
  password,
});

export const login = (username, password) => ({
  type: LOGIN,
  username,
  password,
});

export const clearAuthError = () => ({
  type: CLEAR_AUTH_ERROR,
});

export const logout = () => ({
  type: LOGOUT,
});

export default {REGISTER, LOGIN, LOGOUT, CLEAR_AUTH_ERROR};
