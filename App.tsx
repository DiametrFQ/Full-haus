//@react-native-async-storage/async-storage
import { io } from 'socket.io-client';
import store from './src/store'; // Import the store you created
import Chat from './src/chat';
import Login from './src/Login';
import registerForPushNotificationsAsync from './src/PushNotification/registerForPushNotificationsAsync';
import { useState, useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppState, Text } from 'react-native';
import { NativeRouter, Routes,Route } from "react-router-native";
import SocketConnect from './src/socket-client/socket';
import { useDispatch } from 'react-redux';
import { setStatus } from './src/store/reducers/appSlice';


const socket = io("https://test-whmf.onrender.com/",
  {
    autoConnect: true,
  }
);

export default function AppWrapper() {
  const [expoPushToken, setExpoPushToken] = useState('');
  // const [theme, setTheme] = useState(Appearance.getColorScheme());
  // Appearance.addChangeListener((scheme)=>{
  //   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  //   // setTheme
  //   scheme.colorScheme = 'dark'
  //   console.log(scheme.colorScheme)

  //   // setTheme()
  // })
  // console.log(Appearance.getColorScheme())
  async () => {
    while(socket.disconnected){
      await socket.connect()
    }
  }

  registerForPushNotificationsAsync().then(token => setExpoPushToken(token!));
    
  return (
    <Provider store={store}>
      <Socket/>
      <NativeRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/origin' element={<Chat/>}/>
        </Routes>
      </NativeRouter>
    </Provider>
  );
};

const Socket = () => {
  SocketConnect(socket);

  const appState = useRef(AppState.currentState);
  const dispatch = useDispatch()
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      // console.log('status2',appState.current)
      dispatch(setStatus(appState.current));
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (<Text style={{width:0, height:0}}> </Text>);
};