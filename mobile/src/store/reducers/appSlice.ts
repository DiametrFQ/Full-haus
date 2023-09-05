import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import store from '..';

const msgSlice = createSlice({
  name: 'app',
  initialState: {
    status: 'active',
    connect: false,
  },
  reducers: {
    setStatus: (store, action: PayloadAction<string>) => {
      store.status = action.payload;
    },

    setConnect: (store, action: PayloadAction<boolean>) => {
      store.connect = action.payload;
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const {setStatus, setConnect} = msgSlice.actions;
export default msgSlice.reducer;
