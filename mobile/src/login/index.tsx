//@react-native-async-storage/async-storage
import {Animated, Pressable, Text, TextInput, View} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-native';
// import { useFonts } from 'expo-font';
import styles from './style';
import {setUserName} from '../store/reducers/accSetings';

export default function Login() {
  const [name, setName] = useState('');
  // const [loaded] = useFonts({
  //     Montserrat: require('./assets/fonts/YatraOne.ttf'),
  //   });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AnimPaddingValue = useRef(new Animated.Value(0)).current;
  const AnimMarginTopValue = useRef(new Animated.Value(0)).current;

  const login = () => {
    if (!name.trim()) {
      return;
    }

    dispatch(setUserName(name));
    navigate('/origin');
  };

  useEffect(() => {
    Animated.timing(AnimPaddingValue, {
      toValue: 13,
      duration: 400,
      useNativeDriver: false,
    }).start();

    Animated.timing(AnimMarginTopValue, {
      toValue: 20,
      duration: 400,
      useNativeDriver: false,
    }).start();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.namePage}>Identify yourself</Text>

      <TextInput
        placeholder="Name"
        placeholderTextColor="#b3b3b3a2"
        style={styles.inputText}
        value={name}
        onChangeText={setName}
      />
      <Pressable onPress={login}>
        <Animated.Text
          style={[
            styles.buttonToServer,
            {
              padding: AnimPaddingValue,
              marginTop: AnimMarginTopValue,
            },
          ]}>
          Log in
        </Animated.Text>
      </Pressable>
    </View>
  );
}
