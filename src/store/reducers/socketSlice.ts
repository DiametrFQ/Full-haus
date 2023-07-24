import { createSlice } from '@reduxjs/toolkit';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
// interface Store {
//   socket: Socket
// }

interface Msg{
  name: string,
  msg: string
};

const counterSlice = createSlice({
  name: 'socket',

  initialState: {

    socket:(()=>{
      const socket = io("https://test-whmf.onrender.com/");
      return socket
    })(),// null as Socket<DefaultEventsMap, DefaultEventsMap> | null ,
    msgs: [] as Msg[]

  },
  reducers: {
    addMsg: (store, action)=>{
      store.msgs.push(action.payload)
    },

    // increment: (state) => state + 1,
    // decrement: (state) => state - 1,
    // newstate: (state, action ) => {
    //   return state = +action.payload;
    // },
    setStore:(store, action) => {
      store.msgs = action.payload
    }
  },
  
});

export const { addMsg, setStore } = counterSlice.actions;
export default counterSlice.reducer;