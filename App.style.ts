import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const styles = StyleSheet.create({
    flex:{
        flex:1,
        backgroundColor: 'black',
    },
    container: {
        backgroundColor: '#2c3563',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100 ,
        borderColor: 'red',
    },
    safeArea:{
        height: 40,
        backgroundColor: 'black'
    },
    otherArea:{
        height: '100%'//Dimensions.get('window').height,
    }

});

export default styles