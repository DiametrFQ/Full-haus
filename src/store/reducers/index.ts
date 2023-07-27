import { combineReducers } from 'redux';
import msgSlice from './msgSlice';
import accSetings from './accSetings';

const rootReducer = combineReducers({
  msg: msgSlice,
  acc: accSetings,
  // Add more reducers here if needed
});

export default rootReducer;