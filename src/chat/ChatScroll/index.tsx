import style from './style';
import { Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import IMsgs from '../../Interfaces/IMsgs';
import Message from './Message';

export default function ChatScroll() {
  const {msgs}:{msgs: IMsgs[]} = useSelector((state:any) => state).msg
  return (
    <ScrollView 
      style={{
        backgroundColor: '#3b55d9',
        position: 'relative',
        width: '100%'
      }} 
    >
      {msgs.map(( user: IMsgs, index ) => 
        <Message
          /// Подумать о ключах
          // может время отпрвки сообщения отправлять на серв
          // и от туда брать уже брать

          key={user.user + index}
          user={user} 
        />
      )}
    </ScrollView>
  );
};