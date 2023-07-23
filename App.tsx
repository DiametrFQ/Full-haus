import style from './App.style'
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Text, View, Button, Pressable } from 'react-native';
import { io } from 'socket.io-client';
import Chat from './src/chat/Chat';

interface User{
  name: string,
  msg: string
};

const socket = io("https://test-whmf.onrender.com/")

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
    <>
      <View style={style.container}>

        <Text 
          style={{
            color: socket.connected
            ? "green" 
            : "red"
          }}> 
          {socket.connected? "Connect" : "Disconnect"}
        </Text>

      </View>

      <Chat/>
    </>
  );
};