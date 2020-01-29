/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Date: Nov 18, 2019
 */

import deepCopy from 'lodash/cloneDeep';
import actions from '../actions/cameraActions';

export const initialState = {
  imageUri: null,
};

export const cameraReducer = function(state = initialState, action) {
  const nextState = deepCopy(state);

  switch (action.type) {
    case actions.CAPTURE:
      nextState.imageUri = action.imageUri;
      break;
  }

  return nextState;
};
