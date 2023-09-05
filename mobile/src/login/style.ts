import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  namePage: {
    fontSize: 30,
    marginBottom: 30,
  },

  inputText: {
    width: '30%',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'blue',
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
  },

  buttonToServer: {
    width: '20%',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'green',
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
  },
});

export default styles;
