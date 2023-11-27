import React from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MessageShape } from "../utils/MessageUtils";

const keyExtractor = (item) => item.id.toString();

const MessageList = ({ messages, onPressMessage }) => {
  const renderMessageContent = (item) => {
    switch (item.type) {
      case "text":
        return (
          <View style={styles.messageRow}>
            <TouchableOpacity onPress={() => onPressMessage(item)}>
              <View style={styles.messageBubble}>
                <Text style={styles.text}>{item.text}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );

      case "image":
        return (
          <View style={styles.messageRow}>
            <TouchableOpacity onPress={() => onPressMessage(item)}>
              <Image style={styles.image} source={{ uri: item.uri }} />
            </TouchableOpacity>
          </View>
        );

      case "location":
        return (
          <View style={styles.messageRow}>
            <TouchableOpacity onPress={() => onPressMessage(item)}>
              {item.coordinate ? (
                <View style={styles.mapContainer}>
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      ...item.coordinate,
                      latitudeDelta: 0.08,
                      longitudeDelta: 0.04,
                    }}
                  >
                    <Marker coordinate={item.coordinate} />
                  </MapView>
                </View>
              ) : (
                <Text style={styles.locationText}>
                  Location data is missing
                </Text>
              )}
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <FlatList
      style={styles.container}
      inverted
      data={messages}
      renderItem={({ item }) => renderMessageContent(item)}
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.contentContainer}
    />
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(MessageShape).isRequired,
  onPressMessage: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "visible",
    backgroundColor: "#FFF",
    marginTop: 10,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 16,
  },
  messageRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 30,
    marginBottom: 5,
  },
  messageBubble: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 20,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 8,
  },
  mapContainer: {
    height: 200,
    width: 200,
    borderRadius: 8,
    overflow: "hidden",
  },
  map: {
    flex: 1,
    borderRadius: 8,
  },
  locationText: {
    color: "red",
    fontStyle: "italic",
  },
});

export default MessageList;