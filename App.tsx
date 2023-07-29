//@react-native-async-storage/async-storage
import { Appearance, Text, View } from 'react-native';
import { io } from 'socket.io-client';
import store from './src/store'; // Import the store you created
import Chat from './src/chat';
import { setStore } from './src/store/reducers/msgSlice';
import IMsgs from './src/Interfaces/IMsgs';
import {Provider, useSelector, useDispatch } from 'react-redux';
import styles from './App.style';
import { NativeRouter, Routes,Route } from "react-router-native";
import Login from './src/Login';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AppWrapper() {
  // const [theme, setTheme] = useState(Appearance.getColorScheme());
  // Appearance.addChangeListener((scheme)=>{
  //   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  //   // setTheme
  //   scheme.colorScheme = 'dark'
  //   console.log(scheme.colorScheme)

  //   // setTheme()
  // })
  // console.log(Appearance.getColorScheme())
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

  socket.on(`take store msgs ${socket.id}`, (msgs: IMsgs[])=>{

    dispatch(setStore(msgs)); 
  })

  socket.on('store msgs', (msgs: IMsgs[])=>{
    dispatch(setStore(msgs)); 
  })

  socket.on('new message', (msg: IMsgs) => {
    if(name === msg.user){
      return
    }
    dispatch(setStore([...msgs,  msg])); 
  })


  useEffect(()=>{
    socket.emit('get store msgs', socket.id), console.log('asf')
  },[name])

  // console.log(socket.id)

  return (
    <SafeAreaView style={styles.flex}>
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
    </SafeAreaView>
  );
};