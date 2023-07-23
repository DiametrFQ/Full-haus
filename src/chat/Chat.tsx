import style from './Chat.style';
import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { TextInput, Text, ScrollView, Pressable } from 'react-native';
import { io } from 'socket.io-client';

interface User{
  name: string,
  msg: string
};

const socket = io("https://test-whmf.onrender.com/")

const myName = "Joe";
const id = "y8apriDnAsE3HP02AAAB";

export default function Chat() {
  const [msg, setMsg] = useState('');
  const [users, onChangeUsers] = useState<User[]>([
    {
      name: "alf",
      msg: "Hi"
    },
    {
      name: "fghk",
      msg: "Heeeellloooo!!"
    },
  ]);

  const sayMsg = () => {

    if(!msg.trim()){
      return
    };

    const newMsg: User = {
      name: myName,
      msg: msg
    };

    socket.emit("newMessage", newMsg);

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
    return users.map(( user, index ) => {
      return (
        <Text key={user.name + index + '1'}>
          {user.name} 
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