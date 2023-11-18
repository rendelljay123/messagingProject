import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Constants from "expo-constants";

export default class Status extends React.Component {
  state = {
    info: 'none',
  };

  render() {
    const { info } = this.state;
    const isConnected = info !== 'none';
    const backgroundColor = isConnected ? "red" : "white";

    const statusBar = (
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isConnected ? 'light-content' : 'dark-content'}
        animated={false}
        />
      );
      
    const messageContainer = (
      <View style={styles.messageContainer} pointerEvents={"none"}>
        {statusBar}
        {!isConnected && (
          <View style={styles.bubble}>
            <Text style={styles.text}>No Network Connection</Text>
          </View>
        )}
      </View>
    );

    if (Platform.OS == "ios") {
      return (
      <View style={[styles.status, { backgroundColor }]}>
        {messageContainer}
      </View>
      );
    } 
    else {
      return (
        <View style={[styles.status, { backgroundColor }]}>
          {messageContainer}
        </View>
      );
    }
  }
}

const statusHeight = (Platform.OS == "ios" ? Constants.statusHeight : 0);

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
    padding: 10,
  },
  messageContainer: {
    zIndex: 1,
    position: "absolute",
    top: 40,
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
});