//@react-native-async-storage/async-storage
import { Pressable, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-native";
// import { useFonts } from 'expo-font';
import styles from './style';
import { setUserName } from '../store/reducers/accSetings';

export default function Login() {
    const [name, setName] = useState('');
    // const [loaded] = useFonts({
    //     Montserrat: require('./assets/fonts/YatraOne.ttf'),
    //   });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = () => {

        if(!name.trim()){
            return;
        };

        dispatch(setUserName(name));
        navigate('/origin');
    };

  return (
    
    <View style={styles.container} >

        <Text style={styles.namePage} >
            Identify yourself
        </Text>

        <TextInput 
            placeholder="Name"
            placeholderTextColor="#b3b3b3a2" 
            style={styles.inputText}
            value={name}
            onChangeText={setName}
        />

        <Pressable onPress={login}>
            <Text style={styles.buttonToServer}>
                Log in
            </Text>
        </Pressable>

    </View>
  )
}