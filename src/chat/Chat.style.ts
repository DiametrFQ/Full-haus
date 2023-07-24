import { StyleSheet } from 'react-native';

const dowm2 = (side: string) => {
    return {
        width: side === 'right' ? `80%` : `20%`,
        height: 50,

        position: 'absolute',
        bottom: 0,
        [side]: 0,
    }
}

const ChatStyles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'red',
        // // alignItems: 'center',
        // // justifyContent: 'center',
        // position: 'absolute',
        bottom: 50,
        // width: '100%'
    },

    pressable:{
        width: '20%',
        backgroundColor: '#4d8dd6',
        borderRadius: 10,
        __proto__: dowm2('right'),
    },

    inputText:{
        width: '80%',
        backgroundColor: "#2c517a",

        // color: '#426287',
        __proto__: dowm2('left'),
    }
});

export default ChatStyles