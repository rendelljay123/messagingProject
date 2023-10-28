import React, { Component, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Animated,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

class Status extends Component {
  state = {
    isConnected: true,
  };

  componentDidMount() {
    NetInfo.addEventListener((state) => {
      console.log("Connection status:", state.isConnected);
      this.setState({ isConnected: state.isConnected });
    });
  }

  render() {
    const { isConnected } = this.state;
    const backgroundColor = isConnected ? "red" : "white";

    // Create the StatusBar component
    const statusBar = (
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isConnected ? "light-content" : "dark-content"}
        animated={false}
      />
    );

    const messageContainer = (
      <View style={styles.messageContainer} pointerEvents={"none"}>
        {statusBar}
        {!isConnected && (
          <FadeInView style={styles.Animation}>
            {/* // <View style={styles.bubble}> */}
            <Text style={styles.text}>No Network connection</Text>
            {/* // </View> */}
          </FadeInView>
        )}

        {isConnected && (
          <FadeInView style={styles.Animation}>
            {/* <View style={styles.bubble}> */}
            <Text style={styles.text}>There is Network connection</Text>
            {/* </View> */}
          </FadeInView>
        )}
      </View>
    );

    if (Platform.OS === "ios") {
      return (
        <View style={[styles.status, { backgroundColor }]}>
          {messageContainer}
        </View>
      );
    }
    return messageContainer;
  }
}

const statusHeight = Platform.OS === "ios" ? 50 : StatusBar.currentHeight || 0;

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
    padding: 10,
  },
  messageContainer: {
    zIndex: 1,
    position: "absolute",
    top: 70,
    right: 0,
    left: 0,
    height: 80,
    alignItems: "center",
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "red",
  },
  text: {
    color: "white",
  },
  Animation: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "red",
  },
  AnimationConnected: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "red",
  },
});

export default Status;
