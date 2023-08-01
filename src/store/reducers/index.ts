import { combineReducers } from 'redux';
import msgSlice from './msgSlice';
import accSetings from './accSetings';
import appSlice from './appSlice';

const rootReducer = combineReducers({
  msg: msgSlice,
  acc: accSetings,
  app: appSlice
  // Add more reducers here if needed
});

export default rootReducer;