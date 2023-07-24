import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { io } from 'socket.io-client';
import store from './src/store'; // Import the store you created
import Chat from './src/Chat';
import style from './App.style'

// const socket = io("https://test-whmf.onrender.com/")
// socket.on('get user id', ()=>{

// })
// socket.on('new message', ()=>{
  
// })
// socket.on('store msgs', ()=>{
  
// })
const myName = "Joe";
const id = "y8apriDnAsE3HP02AAAB";

export default function App() {
  const socket = io("https://test-whmf.onrender.com/")
  // const [connect, setConnect] = useState(false);

  useEffect(()=> {
    socket.on('connect', () => {
      // setConnect(true)
      // console.log('1' + socket.connected)
      // console.log('2' + socket.connected)
      // console.log('--------------------')
    })
  })

  return (
    <Provider store={store}>
      <View style={style.container}>

        <Text 
          style={{
            backgroundColor: socket.connected
            ? "green" 
            : "red",
            color: "black"
          }}> 
          {socket.connected? "Connect" : "Disconnect"}
        </Text>

      </View>
      <Chat/>
    </Provider>
  );
};