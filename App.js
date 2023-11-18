import { StyleSheet, Text, View } from 'react-native';
import MessageList from './Components/MessageList';
import { createImageMessage, createLocationMessage, createTextMessage } from './utils/MessageUtils';
import { Alert } from 'react-native';
import { BackHandler } from 'react-native';
import React, { Component } from 'react';

class Messenger extends Component {
  state = {
    messages: [
      createImageMessage('https://unsplash.it/300/300'),
      createTextMessage('World'),
      createTextMessage('Hello'),
      createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324,
      }),
    ],
    fullscreenImage: null
  };

  handlePressMessage = (message) => {
    Alert.alert(
      'Delete message?',
      'Are you sure you want to delete this message?',
      [
        {text: 'Delete', onPress: () => this.deleteMessage(message)}, 
        {text: 'Cancel', style: 'cancel'},
      ],
      { cancelable: true }
    );
  }
  
  deleteMessage = (message) => {
    // Filter out the message and update state 
  }
  renderMessageList() {
    const { messages } = this.state;
  
    return (
      <View style={styles.content}>
        <MessageList messages={messages}setFullscreenImage={(uri) => this.setState({fullscreenImage: uri})} />
      </View>
    );
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  
  handleBackButton = () => {
    if (this.state.fullscreenImage) {
      this.setState({fullscreenImage: null});
      return true;
    }
    
    return false;
  }
  render() {
    const { messages } = this.state;
    return (
      <View>
        {this.state.fullscreenImage && 
        <Modal 
          transparent={true}
          visible={true}
          onRequestClose={() => this.setState({fullscreenImage: null})}
        >
          <Image 
            source={{uri: this.state.fullscreenImage}}
            style={styles.fullscreenImage} 
          />
        </Modal>
      }

      {this.renderMessageList()}
        <MessageList  /> 

      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

export default Messenger;