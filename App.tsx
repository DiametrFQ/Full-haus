//@react-native-async-storage/async-storage
import { Text, View } from 'react-native';
import { Socket, io } from 'socket.io-client';
import store from './src/store'; // Import the store you created
import Chat from './src/Chat';
import { setStore } from './src/store/reducers/msgSlice';
import IMsgs from './src/Interfaces/IMsgs';
import {Provider, useSelector, useDispatch } from 'react-redux';
import styles from './App.style';
import { NativeRouter, Routes,Route } from "react-router-native";
import Login from './src/Login';

// const myName = "Joe";
const id = "y8apriDnAsE3HP02AAAB";

export default function AppWrapper() {
  return (
    <Provider store={store}>
        <NativeRouter>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/origin' element={<App/>}/>
          </Routes>
        </NativeRouter>
    </Provider>
  );
};

const socket = io("https://test-whmf.onrender.com/");

const App = () => {

  const server = useSelector((state:any) => state);
  const {msgs}:{ msgs: IMsgs[]} = server.msg;
  const {name}:{ name: string} = server.acc;

  const dispatch = useDispatch();

  socket.on(`get store ${socket.id}`, (msgs: IMsgs[])=>{
    dispatch(setStore(msgs)); 
  })

  socket.on('store msgs', (msgs: IMsgs[])=>{
    dispatch(setStore(msgs)); 
  })

  socket.on('new message', (msg: IMsgs) => {
    if(name === msg.user){
      return
    }
    dispatch(setStore([...msgs, msg])); 
  })
  socket.connect()

  console.log(socket.id)

  return (
    <>
      <View style={ styles.safeArea } />
      <View style={ styles.otherArea }>

        <Text 
          style={{
            backgroundColor: socket.connected
            ? "green" : "red",

            color: "black",
            textAlign: "center"
          }}
        > 
          {socket.connected? "Connect" : "Disconnect"}
        </Text>

        <Chat />
      </View>
    </>
  );
};