import { Socket } from "socket.io-client";
import { RootState, addMsg, setStore } from "../store/reducers/msgSlice";
import { useDispatch, useSelector } from "react-redux";
import IMsgs from "../Interfaces/IMsgs";
import PushNotification from "react-native-push-notification";
import { setConnect } from "../store/reducers/appSlice";

const SocketConnect = (socket: Socket) => {
  const name = useSelector((state:RootState) => state.acc.name);
  const appStatus = useSelector((state:RootState) => state.app.status);
  // const connect = useSelector((state:RootState) => state.app.connect)

  const dispatch = useDispatch();

  socket.off(`connect`);
  socket.on('connect', async () => {
    dispatch(setConnect(socket.connected));
  })

  socket.off(`take store msgs ${socket.id}`);
  socket.on(`take store msgs ${socket.id}`, async(msgs: IMsgs[])=>{
    dispatch(setStore(msgs)); 
  });

  socket.off('store msgs');
  socket.on('store msgs', async (msgs: IMsgs[])=>{
    dispatch(setStore(msgs)); 
  });

  socket.off('new message');
  socket.on('new message', async (msg: IMsgs) => {

    if(name === msg.user){
      return;
    }
    console.log('its work?')
    console.log('status', appStatus)

    if(appStatus === "background"){
        console.log('its work!');

        // PushNotification.createChannel(
        //   {
        //     channelId: '1', //?
        //     channelName: 'name'
        //   },
        //   (created) => console.log(`createChannel returned '${created}'`)  
        // )

        // PushNotification.localNotification({
        //   title: msg.user,
        //   message: msg.msg,
        //   channelId: '1',
        // })
        // await newMessagePN(
        //     msg.user,
        //     msg.msg,
        // );
    }

    dispatch(addMsg(msg));

    socket.on("disconnect", () => {
      console.log("disconnect");
      dispatch(setConnect(socket.connected));
    });
  })
//   while(!socket.connected){
//     socket.connect();
//   }
};

// async function newMessagePN(
//     name: string,
//     massage: string,
// ) {
//     await Notifications.scheduleNotificationAsync({
//         content: {
//             title: name,
//             body: massage,
//             data: { data: 'goes here' },
//         },
//         trigger: { seconds: 1 },
        
//     });
// }

// Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: false,
//         shouldSetBadge: false,
//     }),
// });

export default SocketConnect
