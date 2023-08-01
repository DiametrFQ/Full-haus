import { StyleSheet } from 'react-native';

const dowm = (side: string) => {
    return {
        width: side === 'right' ? `80%` : `20%`,
        height: '100%',

        position: 'absolute',
        bottom: 0,
        [side]: 0,
    }
}

const ChatStyles = StyleSheet.create({

    pressable:{
        width: '20%',
        backgroundColor: '#4d8dd6',
        // borderRadius: 10,
        __proto__: dowm('right'),
    },

    inputText:{
        width: '80%',
        backgroundColor: "#2c517a",
        // color: '#426287',
        __proto__: dowm('left'),
    },
    flex:{
        flex:1,
        // backgroundColor: 'black',
    },
    otherArea:{
        height: '100%'//Dimensions.get('window').height,
    },
});

export default ChatStyles