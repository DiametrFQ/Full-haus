import style from './style';
import { useState } from 'react';
import { TextInput, Pressable, View } from 'react-native';
import { Socket, io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import IMsgs from '../Interfaces/IMsgs';
import { setStore } from '../store/reducers/msgSlice';
import ChatScroll from './ChatScroll';


const socket = io("https://test-whmf.onrender.com/")

export default function Chat() {

  const [msg, setMsg] = useState('');
  const dispatch = useDispatch()
  const server = useSelector((state:any) => state)
  const { msgs } : { msgs: IMsgs[] } = server.msg
  const { name } : { name: string } = server.acc


  const sayMsg = () => {

    if(!msg.trim()){
      return
    };

    const newMsg: IMsgs = {
      user: name,
      msg: msg
    };

    dispatch(setStore([...msgs, newMsg])); 
    socket.emit('new message', newMsg)

    setMsg('')
  }

  return (
    <>
      <ChatScroll />
      
      <View style={{
        height: 50,
        position: 'relative'
      }}>
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
      </View>
    </>
  );
};