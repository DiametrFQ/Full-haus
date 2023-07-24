import { createSlice } from '@reduxjs/toolkit';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import IMsgs from '../../Interfaces/IMsgs';

const counterSlice = createSlice({
  name: 'socket',
  initialState: {
    socket: io("https://test-whmf.onrender.com/"),
    msgs: [] as IMsgs[]
  },
  reducers: {
    addMsg: (store, action)=>{
      store.msgs.push(action.payload)
    },
    setStore:(store, action) => {
      store.msgs = action.payload
    },
    connect:(store) => {
      store.socket.connect()
    },
  },
  
});

export const { addMsg, setStore, connect } = counterSlice.actions;
export default counterSlice.reducer;