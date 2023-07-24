import style from './Chat.style';
import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { TextInput, Text, ScrollView, Pressable } from 'react-native';
import { Socket, io } from 'socket.io-client';

import { useSelector, useDispatch } from 'react-redux';
import { addMsg, setStore } from '../store/reducers/socketSlice';

interface User{
  user: string,
  msg: string
};

const myName = "Joe";
const id = "y8apriDnAsE3HP02AAAB";

export default function Chat() {
  const server = useSelector((state:any) => state)
  const {socket, msgs} = server.socket

  const dispatch = useDispatch();

  // socket.on('new message', (data:User)=>{
  //   msgs.push(data);
  // })
  socket.on('store msgs', (data: User)=>{
    console.log('asd')
    console.log(data)

    dispatch(setStore(data)); 
  })

  socket.on('new message', (data: User)=>{
    console.log('asd')
    console.log(data)

    dispatch(addMsg(data)); 
  })
  socket.on('connect', () => {
    console.log('1' + socket.connected)
    console.log('2' + socket.connected)
  })

  const [msg, setMsg] = useState('');
  const [users, onChangeUsers] = useState<User[]>([
    {
      user: "alf",
      msg: "Hi"
    },
    {
      user: "fghk",
      msg: "Heeeellloooo!!"
    },
  ]);

  const sayMsg = () => {

    if(!msg.trim()){
      return
    };

    const newMsg: User = {
      user: myName,
      msg: msg
    };

    //socket.emit("newMessage", newMsg);

    onChangeUsers( [
      ...users, 
      newMsg
    ]);
    
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
        <Text key={user.user + index + '1'}>
          {user.user} 
          {"\n"} {user.msg}
          {"\n"} -----------------------
          {/* 
          {socket.on("connect", () => {
            socket.on("data", () => { });
          })};  
          */
          }
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