import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import store from '..';

const accSlice = createSlice({
  name: 'acc',

  initialState: {
    name: '' as string,
  },

  reducers: {
    setUserName: (store, action: PayloadAction<string>) => {
      store.name = action.payload;
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const {setUserName} = accSlice.actions;
export default accSlice.reducer;
