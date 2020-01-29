/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Date: Nov 11, 2019
 */

import {combineReducers} from 'redux';
import {authReducer, initialState as authState} from './authReducers';
import {cameraReducer, initialState as cameraState} from './cameraReduer';

export const initialState = {
  auth: authState,
  camera: cameraState,
};
export const reducer = combineReducers({
  auth: authReducer,
  camera: cameraReducer,
});
