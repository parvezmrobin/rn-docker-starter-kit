/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Date: Nov 18, 2019
 */

import deepCopy from 'lodash/cloneDeep';
import actions from '../actions/authActions';
import {navigate} from '../screens';

export const initialState = {
  token: null,
  users: [
    {
      username: 'A',
      password: 'A',
    },
  ],
  error: {
    username: '',
  },
};

export const authReducer = function(state = initialState, action) {
  const nextState = deepCopy(state);
  let existIndex;

  switch (action.type) {
    case actions.CAPTURE:
      nextState.imageUri = action.imageUri;
      break;

    case actions.REGISTER:
      existIndex = action.username
        ? state.users.findIndex(user => user.username === action.username)
        : Number.NaN;
      if (Number.isNaN(existIndex)) {
        nextState.error.username = 'Username cannot be empty';
        break;
      }
      if (existIndex !== -1) {
        nextState.error.username = `Username ${action.username} already exists`;
        break;
      }
      nextState.users.push({
        username: action.username,
        password: action.password,
      });
      nextState.error.username = '';
      nextState.isLoggedIn = true;

      navigate.to.login().catch(console.warn);
      break;

    case actions.LOGIN:
      existIndex = state.users.findIndex(
        user =>
          user.username === action.username &&
          user.password === action.password,
      );

      if (existIndex === -1) {
        nextState.error.username = 'Invalid username and/or password';
        break;
      }
      nextState.error.username = '';
      nextState.token = Math.floor(Math.random() * 1e7).toString();
      navigate.to.home().catch(console.warn);
      break;

    case actions.CLEAR_AUTH_ERROR:
      nextState.error.username = '';
      break;

    case actions.LOGOUT:
      return deepCopy(initialState);
  }

  return nextState;
};
