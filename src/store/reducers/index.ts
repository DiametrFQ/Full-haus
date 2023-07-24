import { combineReducers } from 'redux';
import socketReducer from './socketSlice';

const rootReducer = combineReducers({
  socket: socketReducer,
  // Add more reducers here if needed
});

export default rootReducer;