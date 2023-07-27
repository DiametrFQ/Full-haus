import { createSlice } from '@reduxjs/toolkit';
import IMsgs from '../../Interfaces/IMsgs';

const msgSlice = createSlice({
  name: 'msg',
  initialState: {
    msgs: [] as IMsgs[]
  },
  reducers: {
    addMsg: (store, action)=>{
      store.msgs.push(action.payload)
    },
    setStore:(store, action) => {
      store.msgs = action.payload
    },
  },
  
});

export const { addMsg, setStore } = msgSlice.actions;
export default msgSlice.reducer;