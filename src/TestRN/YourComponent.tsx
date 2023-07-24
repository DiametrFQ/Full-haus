// YourComponent.js
import { View, Text, Button, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, newstate } from '../store/reducers/counterSlice';
import { useState } from 'react';

const YourComponent = () => {
  const [newNum, setNewNum] = useState<string>('0')
  const counter = useSelector((state:any) => state.counter);
  const dispatch = useDispatch();

  return (
    <View>
      <Text> Counter: {counter}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <Button title="Decrement" onPress={() => dispatch(newstate(+newNum))} />
      <TextInput
        // value={String(newNum)}
        keyboardType='numeric'
        onChangeText={setNewNum}
      
        // value='sdf'
      >

      </TextInput>

    </View>
  );
};

export default YourComponent;