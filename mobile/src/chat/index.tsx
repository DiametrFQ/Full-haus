import {useState} from 'react';
import {TextInput, Pressable, View, Text, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {io} from 'socket.io-client';
import IMsgs from '../Interfaces/IMsgs';
import {RootState, addMsg} from '../store/reducers/msgSlice';
import style from './style';
import ChatScroll from './ChatScroll';

const socket = io('https://test-whmf.onrender.com/', {
  autoConnect: true,
});

export default function Chat() {
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  // const msgs = useSelector((state:RootState) => state.msg.msgs);
  const name = useSelector((state: RootState) => state.acc.name);
  const connect = useSelector((state: RootState) => state.app.connect);

  // socket.connect()

  const sayMsg = () => {
    if (!msg.trim()) {
      return;
    }

    const newMsg: IMsgs = {
      user: name,
      msg: msg,
    };

    dispatch(addMsg(newMsg));

    socket.emit('new message', newMsg);

    setMsg('');
  };

  return (
    <SafeAreaView style={style.flex}>
      <View style={style.otherArea}>
        <Text
          style={{
            backgroundColor: connect ? 'green' : 'red',

            color: 'black',
            textAlign: 'center',
          }}>
          {connect ? 'Connect' : 'Disconnect'}
        </Text>

        <ChatScroll />

        <View
          style={{
            height: 50,
            position: 'relative',
          }}>
          <TextInput
            onChangeText={setMsg}
            value={msg}
            placeholder=" Send Message"
            style={style.inputText}
          />

          <Pressable style={style.pressable} onPress={sayMsg}></Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
