import {Text, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import style from './style';
import Message from './Message';
import IMsgs from '../../Interfaces/IMsgs';
import {RootState} from '../../store/reducers/msgSlice';

export default function ChatScroll() {
  const msgs = useSelector((state: RootState) => state.msg.msgs);

  return (
    <ScrollView
      style={{
        backgroundColor: '#3b55d9',
        position: 'relative',
        width: '100%',
      }}>
      {msgs.map((user: IMsgs, index) => (
        <Message
          /// Подумать о ключах
          // может время отпрвки сообщения отправлять на серв
          // и от туда уже брать

          key={user.user + index}
          user={user}
        />
      ))}
    </ScrollView>
  );
}
