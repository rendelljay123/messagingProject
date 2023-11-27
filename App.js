import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  BackHandler,
  Image,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native";
import Status from "./components/Status";
import MessageList from "./components/MessageList";
import Toolbar from "./components/Toolbar";
import {
  createImageMessage,
  createTextMessage,
  createLocationMessage,
} from "./utils/MessageUtils";

const App = () => {
  const [messages, setMessages] = useState([
    createImageMessage("https://unsplash.it/600/300"),
    createTextMessage("World"),
    createTextMessage("Hello"),
    createLocationMessage({ latitude: 37.78825, longitude: -122.4324 }),
  ]);

  const [fullscreenImage, setFullscreenImage] = useState(null);

  const [isInputFocused, setIsInputFocused] = useState(false); // Track focus state

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (fullscreenImage) {
          closeFullscreenImage();
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [fullscreenImage]);

  const handleDeleteMessage = (message) => {
    const updatedMessages = messages.filter((m) => m !== message);
    setMessages(updatedMessages);
    closeFullscreenImage();
  };

  const handlePressMessage = (message) => {
    if (message.type === "text") {
      Alert.alert(
        "Delete Message",
        "Do you want to delete this message?",
        [
          { text: "Delete", onPress: () => handleDeleteMessage(message) },
          { text: "Cancel", style: "cancel" },
        ],
        { cancelable: false }
      );
    } else if (message.type === "image") {
      setFullscreenImage(message.uri);
    }
  };

  const closeFullscreenImage = () => {
    setFullscreenImage(null);
  };

  const renderFullscreenImage = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={fullscreenImage !== null}
        onRequestClose={closeFullscreenImage}
      >
        <View style={styles.fullscreenContainer}>
          <Image
            style={styles.fullscreenImage}
            source={{ uri: fullscreenImage }}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeFullscreenImage}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() =>
              handleDeleteMessage(
                messages.find((m) => m.uri === fullscreenImage)
              )
            }
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  // Callbacks for Toolbar component
  const handlePressToolbarCamera = () => {
    // Handle camera press
  };

  const handlePressToolbarLocation = () => {
    // Handle location press
  };

  const handleChangeFocus = (isFocused) => {
    setIsInputFocused(isFocused);
  };

  const handleSubmit = (text) => {
    const updatedMessages = [createTextMessage(text), ...messages];
    setMessages(updatedMessages);
  };

  return (
    <View style={styles.container}>
      <Status />
      <MessageList
        messages={messages}
        onPressMessage={handlePressMessage}
        onDeleteMessage={handleDeleteMessage}
      />
      {renderFullscreenImage()}
      {renderToolbar()}
    </View>
  );

  function renderToolbar() {
    return (
      <Toolbar
        isFocused={isInputFocused}
        onSubmit={handleSubmit}
        onChangeFocus={handleChangeFocus}
        onPressCamera={handlePressToolbarCamera}
        onPressLocation={handlePressToolbarLocation}
      />
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  fullscreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  fullscreenImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  deleteButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 10,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default App;
