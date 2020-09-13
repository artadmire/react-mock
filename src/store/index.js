import { createStore, combineReducers } from 'redux';
import { initialState, ActionMap } from './action';
import reducer from './reducer';

const store = createStore(combineReducers(reducer), initialState);

export default store;

export {
  ActionMap,
};
