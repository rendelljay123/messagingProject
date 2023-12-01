import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  StyleSheet,
  Animated,
  Easing,
  Text,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default function Status() {
  const [isConnected, setIsConnected] = useState(true);
  const [animation] = useState(new Animated.Value(0));
  const backgroundColor = isConnected ? "red" : "yellow";

  const statusBar = (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={isConnected ? "dark-content" : "light-content"}
      animated={false}
    />
  );

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      animateStatusBubble();
    });

    return () => unsubscribe();
  }, []);

  const animateStatusBubble = () => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
        delay: 1000, // Wait for 1 second before disappearing
      }),
    ]).start();
  };

  const statusBackgroundColor = isConnected ? "red" : "yellow";
  const bubbleStyle = {
    backgroundColor: statusBackgroundColor,
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {statusBar}
      <Animated.View style={[styles.statusBubble, bubbleStyle]}>
        <Text style={styles.statusText}>
          {isConnected ? "Connected to the Internet" : "Network Disconnected"}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  statusBubble: {
    backgroundColor: "red", // Default color
    padding: 10,
    borderRadius: 20,
    alignSelf: "center",
    position: "absolute",
    top: 15,
  },
  statusText: {
    color: "white",
  },
});