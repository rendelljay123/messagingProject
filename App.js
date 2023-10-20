import React from 'react';
import { View, StyleSheet } from 'react-native';


// Components
import Status from './Components/Status';
import MessageList from './Components/MessageList';
import Toolbar from './Components/Toolbar';
import InputMethodEditor from './Components/InputMethodEditor';


export default function App() {
  return (
    <View style={styles.container}>
      <Status />
      {/* <MessageList />
      <Toolbar />
      <InputMethodEditor /> */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.04)',
    backgroundColor: 'white',
  },
});