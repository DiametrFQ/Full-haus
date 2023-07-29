import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IMsgs from '../../Interfaces/IMsgs';

const accSlice = createSlice({
  name: 'acc',
  
  initialState: {
    name: '' as string
  },

  reducers: {
    setUserName: (
      store, 
      action: PayloadAction<string>
    ) => {
      store.name = action.payload
    },
  },
  
});

export const { setUserName } = accSlice.actions;
export default accSlice.reducer;