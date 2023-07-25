import style from './Chat.style';
import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { TextInput, Text, ScrollView, Pressable } from 'react-native';
import { Socket } from 'socket.io-client';

import { useSelector, useDispatch } from 'react-redux';
import { addMsg, setStore, connect } from '../store/reducers/socketSlice';
import IMsgs from '../Interfaces/IMsgs';

const myName = "Joe";

export default function Chat() {
  const server = useSelector((state:any) => state)
  const {socket, msgs}:{socket: Socket, msgs: IMsgs[]} = server.socket

  const dispatch = useDispatch();

  // socket.on('new message', (data:User)=>{
  //   msgs.push(data);
  // })
  socket.on('store msgs', (msgs: IMsgs[])=>{
    dispatch(setStore(msgs)); 
  })

  socket.on('new message', (msg: IMsgs)=>{
    dispatch(setStore([...msgs, msg])); 
  })
  socket.on('connect', () => {
    console.log('1' + socket.connected)
    console.log('2' + socket.connected)
  })

  const [msg, setMsg] = useState('');

  const sayMsg = () => {

    if(!msg.trim()){
      return
    };

    const newMsg: IMsgs = {
      user: myName,
      msg: msg
    };

    //socket.emit("newMessage", newMsg);
    socket.emit('new message', newMsg)

    setMsg('')
  }

  // socket.on('connect', () => {
  //   setConnect(true)
  //   console.log('1' + socket.connected)
  //   console.log('2' + socket.connected)

  // })
  // // socket.connect()

//   const scrollRef = useRef();
  
//   const onPressTouch = () => {
//     scrollRef.current?.scrollTo({
//       y: 0,
//       animated: true,
//     });
//   }
  const msgRender = () => {
    return msgs.map(( user, index ) => {
      return (
        <Text key={user.user + myName + index}>
          {user.user} 
          {"\n"} {user.msg}
          {"\n"} -----------------------
        </Text>
      );
    });
  }

  return (
    <>
      <ScrollView style={ style.container } >
        {msgRender()}
      </ScrollView>
      
      <TextInput 
        onChangeText={setMsg}
        value={msg}
        placeholder=" Send Message"
        style={style.inputText}
      />

      <Pressable 
        style={style.pressable}
        onPress={sayMsg}>
      </Pressable>
    </>
  );
};