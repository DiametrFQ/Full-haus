import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IMsgs from '../../Interfaces/IMsgs';
import store from '..';

const msgSlice = createSlice({
  name: 'msg',
  initialState: {
    msgs: [] as IMsgs[]
  },
  reducers: {
    addMsg: (store, action)=>{
      store.msgs.push(action.payload as IMsgs)
    },
    setStore:(
      store, 
      action: PayloadAction<IMsgs[]>
    ) => {
      store.msgs = action.payload
    },
  },
  
});

export type RootState = ReturnType<typeof store.getState>;
export const { addMsg, setStore } = msgSlice.actions;
export default msgSlice.reducer;