import { createSlice } from '@reduxjs/toolkit';
import IMsgs from '../../Interfaces/IMsgs';

const accSlice = createSlice({
  name: 'acc',
  
  initialState: {
    name: '' as string
  },

  reducers: {
    setUserName: (store, action) => {
      store.name = action.payload
    },
  },
  
});

export const { setUserName } = accSlice.actions;
export default accSlice.reducer;