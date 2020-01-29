/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Date: Nov 11, 2019
 */

import {reducer, initialState} from './reducers';
import {createStore} from 'redux';

const store = createStore(reducer, initialState);

export default store;
