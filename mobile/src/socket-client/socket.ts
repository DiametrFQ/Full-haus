import {Socket} from 'socket.io-client';
import {RootState, addMsg, setStore} from '../store/reducers/msgSlice';
import {useDispatch, useSelector} from 'react-redux';
import IMsgs from '../Interfaces/IMsgs';
import PushNotification from 'react-native-push-notification';
import {setConnect} from '../store/reducers/appSlice';

const SocketConnect = (socket: Socket) => {
  const name = useSelector((state: RootState) => state.acc.name);
  const appStatus = useSelector((state: RootState) => state.app.status);
  // const connect = useSelector((state:RootState) => state.app.connect)

  const dispatch = useDispatch();

  socket.off(`connect`);
  socket.on('connect', async () => {
    dispatch(setConnect(socket.connected));
  });

  socket.off(`take store msgs ${socket.id}`);
  socket.on(`take store msgs ${socket.id}`, async (msgs: IMsgs[]) => {
    dispatch(setStore(msgs));
  });

  socket.off('store msgs');
  socket.on('store msgs', async (msgs: IMsgs[]) => {
    dispatch(setStore(msgs));
  });

  socket.off('new message');
  socket.on('new message', async (msg: IMsgs) => {
    if (name === msg.user) {
      return;
    }

    if (appStatus === 'background') {
      PushNotification.createChannel(
        {
          channelId: 'newMessage',
          channelName: 'NewMessage',
          channelDescription: 'Notification for special message',
          importance: 4,
          vibrate: true,
        },
        created => () => {}, //console.log('createChannel returned', `${created}`),
      );

      PushNotification.localNotification({
        channelId: 'newMessage',
        vibrate: true,
        allowWhileIdle: true,
        title: msg.user,
        message: msg.msg,
      });
    }

    dispatch(addMsg(msg));

    socket.on('disconnect', () => {
      //console.log('disconnect');
      dispatch(setConnect(socket.connected));
    });
  });
  while (!socket.connected) {
    socket.connect();
  }
};

export default SocketConnect;
