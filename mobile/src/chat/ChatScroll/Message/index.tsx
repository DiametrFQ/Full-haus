// import MessageStyles from './style';
import {Text} from 'react-native';
import IMsgs from '../../../Interfaces/IMsgs';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducers/accSetings';

export default function Message({user}: {user: IMsgs}) {
  const name = useSelector((state: RootState) => state.acc.name);

  let marginSide = '';
  let backgroundColor = '';
  let borderSideRadius = '';

  if (name === user.user) {
    marginSide = 'marginLeft';
    backgroundColor = '#7689e8';
    borderSideRadius = 'borderBottomRightRadius';
  } else {
    marginSide = 'marginRight';
    backgroundColor = '#5868b8';
    borderSideRadius = 'borderBottomLeftRadius';
  }

  return (
    <Text
      style={{
        backgroundColor,
        borderRadius: 20,
        [borderSideRadius]: 0,
        margin: 10,
        [marginSide]: '30%',
        padding: 20,
        // paddingBottom: 20,
        paddingTop: 10,
      }}>
      <Text style={{display: 'flex'}}>
        {name === user.user ? 'Я' : user.user}
        {'\n'}
      </Text>
      <Text>{user.msg}</Text>
    </Text>
  );
}
